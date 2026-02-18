const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("NFTMarketplace", function () {
  const LISTING_PRICE = ethers.utils.parseEther("0.001");
  const TOKEN_URI = "https://example.com/metadata/1";
  const SALE_PRICE = ethers.utils.parseEther("0.1");

  async function deployFixture() {
    const [owner, seller, buyer, other] = await ethers.getSigners();
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const market = await NFTMarketplace.deploy();
    return { market, owner, seller, buyer, other };
  }

  describe("Deployment", function () {
    it("Should set the correct listing price", async function () {
      const { market } = await loadFixture(deployFixture);
      expect(await market.getListingPrice()).to.equal(LISTING_PRICE);
    });

    it("Should have correct name and symbol", async function () {
      const { market } = await loadFixture(deployFixture);
      expect(await market.name()).to.equal("Metaverse Tokens");
      expect(await market.symbol()).to.equal("META");
    });
  });

  describe("updateListingPrice", function () {
    it("Should revert if caller is not owner", async function () {
      const { market, seller } = await loadFixture(deployFixture);
      const newPrice = ethers.utils.parseEther("0.002");
      await expect(
        market.connect(seller).updateListingPrice(newPrice)
      ).to.be.revertedWith("Only marketplace owner can update listing price");
    });

    it("Should update listing price if owner", async function () {
      const { market, owner } = await loadFixture(deployFixture);
      const newPrice = ethers.utils.parseEther("0.002");
      await market.connect(owner).updateListingPrice(newPrice);
      expect(await market.getListingPrice()).to.equal(newPrice);
    });
  });

  describe("createToken (mint and list)", function () {
    it("Should revert if price is zero", async function () {
      const { market, seller } = await loadFixture(deployFixture);
      await expect(
        market.connect(seller).createToken(TOKEN_URI, 0, {
          value: LISTING_PRICE,
        })
      ).to.be.revertedWith("Price must be greater than zero");
    });

    it("Should revert if listing fee is not sent", async function () {
      const { market, seller } = await loadFixture(deployFixture);
      await expect(
        market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
          value: 0,
        })
      ).to.be.revertedWith("Price must be equal to listing price");
    });

    it("Should mint, list and emit MarketItemCreated", async function () {
      const { market, seller } = await loadFixture(deployFixture);
      await expect(
        market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
          value: LISTING_PRICE,
        })
      )
        .to.emit(market, "MarketItemCreated")
        .withArgs(1, seller.address, market.address, SALE_PRICE, false);

      expect(await market.ownerOf(1)).to.equal(market.address);
    });

    it("Should store correct market item data", async function () {
      const { market, seller } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });

      const items = await market.fetchMarketItems();
      expect(items.length).to.equal(1);
      expect(items[0].tokenId.toString()).to.equal("1");
      expect(items[0].seller).to.equal(seller.address);
      expect(items[0].owner).to.equal(market.address);
      expect(items[0].price).to.equal(SALE_PRICE);
      expect(items[0].sold).to.equal(false);
    });
  });

  describe("createMarketSale", function () {
    it("Should revert if wrong price is sent", async function () {
      const { market, seller, buyer } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });
      await expect(
        market.connect(buyer).createMarketSale(1, {
          value: ethers.utils.parseEther("0.05"),
        })
      ).to.be.revertedWith(
        "Please submit the asking price in order to complete the purchase"
      );
    });

    it("Should transfer NFT to buyer and pay seller and owner", async function () {
      const { market, owner, seller, buyer } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });

      const sellerBefore = await seller.getBalance();
      const ownerBefore = await owner.getBalance();

      await market.connect(buyer).createMarketSale(1, { value: SALE_PRICE });

      expect(await market.ownerOf(1)).to.equal(buyer.address);
      expect(await seller.getBalance()).to.equal(
        sellerBefore.add(SALE_PRICE)
      );
      expect(await owner.getBalance()).to.equal(
        ownerBefore.add(LISTING_PRICE)
      );
    });

    it("Should remove item from fetchMarketItems after sale", async function () {
      const { market, seller, buyer } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });
      expect((await market.fetchMarketItems()).length).to.equal(1);
      await market.connect(buyer).createMarketSale(1, { value: SALE_PRICE });
      expect((await market.fetchMarketItems()).length).to.equal(0);
    });

    it("Should show item in fetchMyNFTs for buyer", async function () {
      const { market, seller, buyer } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });
      await market.connect(buyer).createMarketSale(1, { value: SALE_PRICE });
      const myNfts = await market.connect(buyer).fetchMyNFTs();
      expect(myNfts.length).to.equal(1);
      expect(myNfts[0].owner).to.equal(buyer.address);
    });
  });

  describe("resellToken", function () {
    it("Should revert if caller is not owner", async function () {
      const { market, seller, buyer, other } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });
      await market.connect(buyer).createMarketSale(1, { value: SALE_PRICE });
      const newPrice = ethers.utils.parseEther("0.2");
      await expect(
        market.connect(other).resellToken(1, newPrice, { value: LISTING_PRICE })
      ).to.be.revertedWith(
        "Only item owner can perform this operation"
      );
    });

    it("Should revert if listing fee not sent", async function () {
      const { market, seller, buyer } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });
      await market.connect(buyer).createMarketSale(1, { value: SALE_PRICE });
      await expect(
        market.connect(buyer).resellToken(1, SALE_PRICE, { value: 0 })
      ).to.be.revertedWith("Price must be equal to listing price");
    });

    it("Should relist NFT and appear in fetchMarketItems", async function () {
      const { market, seller, buyer } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });
      await market.connect(buyer).createMarketSale(1, { value: SALE_PRICE });
      const newPrice = ethers.utils.parseEther("0.2");
      await market.connect(buyer).resellToken(1, newPrice, {
        value: LISTING_PRICE,
      });

      expect(await market.ownerOf(1)).to.equal(market.address);
      const items = await market.fetchMarketItems();
      expect(items.length).to.equal(1);
      expect(items[0].price).to.equal(newPrice);
      expect(items[0].seller).to.equal(buyer.address);
    });
  });

  describe("cancelItemListing", function () {
    it("Should revert if caller is not seller", async function () {
      const { market, seller, other } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });
      await expect(
        market.connect(other).cancelItemListing(1)
      ).to.be.revertedWith(
        "Only item seller can perform this operation"
      );
    });

    it("Should revert if item is already sold", async function () {
      const { market, seller, buyer } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });
      await market.connect(buyer).createMarketSale(1, { value: SALE_PRICE });
      await expect(
        market.connect(seller).cancelItemListing(1)
      ).to.be.revertedWith(
        "Only cancel items which are not sold yet"
      );
    });

    it("Should return NFT to seller and remove from market", async function () {
      const { market, owner, seller } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });
      const ownerBefore = await owner.getBalance();
      await market.connect(seller).cancelItemListing(1);
      expect(await market.ownerOf(1)).to.equal(seller.address);
      expect((await market.fetchMarketItems()).length).to.equal(0);
      expect(await owner.getBalance()).to.equal(ownerBefore.add(LISTING_PRICE));
    });
  });

  describe("fetchItemsListed", function () {
    it("Should return only items listed by given seller", async function () {
      const { market, seller, buyer } = await loadFixture(deployFixture);
      await market.connect(seller).createToken(TOKEN_URI, SALE_PRICE, {
        value: LISTING_PRICE,
      });
      const listed = await market.connect(seller).fetchItemsListed();
      expect(listed.length).to.equal(1);
      expect(listed[0].seller).to.equal(seller.address);
      await market.connect(buyer).createMarketSale(1, { value: SALE_PRICE });
      const listedAfter = await market.connect(seller).fetchItemsListed();
      expect(listedAfter.length).to.equal(0);
    });
  });
});
