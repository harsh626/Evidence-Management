// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Evi = await hre.ethers.getContractFactory("EvidenceManagement");
  const evi = await Evi.deploy();

  await evi.assignInvestigatorRole("0xE7aD2c7D31CF2da36c3d05A3756CD8238EF677fe");
  // await evi.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
