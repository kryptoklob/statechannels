import NetworkContext from "@statechannels/ganache-deployer/ganache-network-context.json";
import {Contract} from "ethers";
import {AddressZero} from "ethers/constants";
import log from "loglevel";
import {Web3Provider} from "ethers/providers";
import { Interface } from "ethers/utils";

log.setDefaultLevel(log.levels.DEBUG);

export function getContractAddress(contractName: string): string {
  if (NetworkContext[contractName]) {
    return NetworkContext[contractName].address;
  }
  console.error(contractName, NetworkContext);

  throw new Error(
    `Could not find ${contractName} in network map ${JSON.stringify(NetworkContext)}}`
  );
}

export function getContractABI(contractName: string): string {
  if (NetworkContext[contractName]) {
    return NetworkContext[contractName].abi;
  }
  console.error(contractName, NetworkContext);

  throw new Error(
    `Could not find ${contractName} in network map ${JSON.stringify(NetworkContext)}}`
  );
}

export function getProvider(): Web3Provider {
  return new Web3Provider(web3.currentProvider);
}

export async function getAdjudicatorContract(provider: Web3Provider) {
  const contractAddress = getContractAddress("NitroAdjudicator");
  return new Contract(contractAddress, getAdjudicatorInterface(), provider);
}

export async function getETHAssetHolderContract(provider: Web3Provider) {
  const contractAddress = getContractAddress("ETHAssetHolder");
  return new Contract(contractAddress, getETHAssetHolderInterface(), provider);
}

export async function getERC20AssetHolderContract(provider: Web3Provider) {
  const contractAddress = getContractAddress("ERC20AssetHolder");
  return new Contract(contractAddress, getERC20AssetHolderInterface(), provider);
}

export function getAdjudicatorInterface(): Interface {
  return new Interface(getContractABI("NitroAdjudicator"));
}

export function getETHAssetHolderInterface(): Interface {
  return new Interface(getContractABI("ETHAssetHolder"));
}

export function getERC20AssetHolderInterface(): Interface {
  return new Interface(getContractABI("ERC20AssetHolder"));
}

// FIXME: The tests ought to be able to run even without contracts having been built which
// is why this try {} catch {} logic is here, but returning AddressZero is only a way of
// avoiding errors being thrown. The situation is that all tests which actually interact
// with the blockchain are currently skipped, and so the AddressZero value is never used.

export function getTrivialAppAddress(): string {
  try {
    return getContractAddress("TrivialApp");
  } catch (e) {
    return AddressZero;
  }
}

export function getETHAssetHolderAddress(): string {
  try {
    return getContractAddress("ETHAssetHolder");
  } catch (e) {
    return AddressZero;
  }
}

export function getERC20AssetHolderAddress(): string {
  try {
    return getContractAddress("ERC20AssetHolder");
  } catch (e) {
    return AddressZero;
  }
}

export function getAdjudicatorContractAddress(): string {
  try {
    return getContractAddress("NitroAdjudicator");
  } catch (e) {
    return AddressZero;
  }
}

export function getConsensusContractAddress(): string {
  try {
    return getContractAddress("ConsensusApp");
  } catch (e) {
    return AddressZero;
  }
}

export function getNetworkId(): number {
  if (NetworkContext["NetworkID"]) {
    return parseInt(NetworkContext["NetworkID"], 10);
  } else {
    throw new Error("There is no target network ID specified.");
  }
}

export function isDevelopmentNetwork(): boolean {
  const networkId = getNetworkId();

  return (
    networkId > 8 && // various test nets
    networkId !== 42 && // kovan
    networkId !== 60 && // go chain
    networkId !== 77 && // sokol
    networkId !== 99 && // core
    networkId !== 100 && // xDai
    networkId !== 31337 && // go chain test
    networkId !== 401697 && // tobalaba
    networkId !== 7762959 && // musicoin
    networkId !== 61717561 // aquachain
  );
}

export async function getAdjudicatorChannelStorageHash(provider: Web3Provider, channelId: string) {
  const contract = await getAdjudicatorContract(provider);
  return await contract.channelStorageHashes(channelId);
}

export async function getETHAssetHolderHoldings(provider: Web3Provider, channelId: string) {
  const contract = await getETHAssetHolderContract(provider);
  return await contract.functions.holdings(channelId);
}

export async function getERC20AssetHolderHoldings(provider: Web3Provider, channelId: string) {
  const contract = await getERC20AssetHolderContract(provider);
  return await contract.functions.holdings(channelId);
}
