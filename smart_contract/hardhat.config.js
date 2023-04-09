require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
    networks: {
    hardhat: {
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/NDePzfp3omRpBZHrv788GKEihw3GIQsc",
      accounts: ['d5cb75177359addc18bf6a3f9bf34a76430edee9418520a6f35c1d75754081c1']
    }
  }
};
