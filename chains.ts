import type { AddEthereumChainParameter } from '@web3-react/types'

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

const ORING: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Pangoro',
  symbol: 'PANGORO',
  decimals: 18,
}

const PRING: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Pangolin',
  symbol: 'PANGOLIN',
  decimals: 18,
}

const CRAB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Crab',
  symbol: 'CRAB',
  decimals: 18,
}

const RING: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Darwinia',
  symbol: 'RING',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else {
    return chainId
  }
}

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation }

export const MAINNET_CHAINS: ChainConfig = {
  46: {
    urls: ['https://rpc.darwinia.network'],
    name: 'Darwinia',
    nativeCurrency: RING,
    blockExplorerUrls: ['https://darwinia.subscan.io/'],
  },
  44: {
    urls: ['https://crab-rpc.darwinia.network'],
    name: 'Crab',
    nativeCurrency: CRAB,
    blockExplorerUrls: ['https://crab.subscan.io/'],
  },
}

export const TESTNET_CHAINS: ChainConfig = {
  45: {
    urls: ['https://pangoro-rpc.darwinia.network'],
    name: 'Pangoro Testnet',
    nativeCurrency: ORING,
    blockExplorerUrls: ['https://pangoro.subscan.io/'],
  },
  43: {
    urls: ['https://pangolin-rpc.darwinia.network'],
    name: 'Pangolin Testnet',
    nativeCurrency: PRING,
    blockExplorerUrls: ['https://pangolin.subscan.io/'],
  },
}

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
}

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs
    }

    return accumulator
  },
  {}
)
