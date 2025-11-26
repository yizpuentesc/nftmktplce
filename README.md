# 🌐 NFT Marketplace -- Smart Contracts (Hardhat)

A base project for a **decentralized NFT Marketplace**, built with
**Solidity**, **Hardhat**, **Ethers.js**, and **OpenZeppelin**.


This project includes configuration for **Goerli deployment**, scripts,
Hardhat tasks, Waffle testing, environment variable support, and
Typechain typings.

------------------------------------------------------------------------

## 🧩 Key Features

-   ✔️ Built with **Solidity 0.8.9**
-   ✔️ Deployment scripts using **Ethers.js**
-   ✔️ Full support for **OpenZeppelin ERC-721**
-   ✔️ Network configuration for **Goerli + Infura**
-   ✔️ Secure environment variables using `.env`
-   ✔️ Typechain types generation
-   ✔️ Organized Hardhat project structure

------------------------------------------------------------------------

## 📁 Project Structure

    /contracts        → Smart contracts  
    /scripts          → Deployment & interaction scripts  
    /test             → Waffle test files  
    /artifacts        → Auto-generated build output  
    /cache            → Compiler cache  
    /typechain        → Ethers typings auto-generated  

`.gitignore` includes: `.env`, node_modules, artifacts, cache, coverage,
typechain, etc.

------------------------------------------------------------------------

## 🔧 Hardhat Configuration

The `hardhat.config.js` file uses dotenv and includes Goerli + Infura
setup:

### 🔐 Create `.env` file

    INFURA_URL=https://goerli.infura.io/v3/YOUR_PROJECT_ID
    WALLET_PRIVATE_KEY=private_key_without_0x

------------------------------------------------------------------------

## 📦 Installation

``` bash
npm install
```

Main dependencies:

-   hardhat\
-   ethers\
-   ethereum-waffle\
-   chai\
-   @openzeppelin/contracts\
-   dotenv

------------------------------------------------------------------------

# ▶️ How to Run the Project

## 📘 Hardhat Help

``` bash
npx hardhat help
```

## 🧱 Compile Contracts

``` bash
npx hardhat compile
```

## 🧪 Run Tests

``` bash
npx hardhat test
```

## ⛽ Gas Report

``` bash
GAS_REPORT=true npx hardhat test
```

## 🌐 Run Local Node

``` bash
npx hardhat node
```

## 🚀 Deploy Smart Contracts

### Local Network

``` bash
npx hardhat run scripts/deploy.js
```

### Goerli Network

``` bash
npx hardhat run scripts/deploy.js --network goerli
```

------------------------------------------------------------------------

## 🔐 Security Best Practices

-   Never expose your private keys\
-   Do not commit `.env` files\
-   Use a secondary wallet for testnets\
-   Avoid storing secrets directly in code

------------------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome!\
Feel free to submit pull requests, improvements, or new features.


## 👤 Author

https://github.com/yizpuentesc

------------------------------------------------------------------------

## 📜 License

This project is licensed under the **ISC License**.

------------------------------------------------------------------------

## ⭐ Support the Project

If this repository helped you, please consider leaving a ⭐ to support
the project!
