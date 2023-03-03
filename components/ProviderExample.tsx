import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'

import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask'
import { getName } from '../utils'

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
]

function Child() {
  const { connector } = useWeb3React()
  console.log(`Priority Connector is: ${getName(connector)}`)
  return null
}

export default function ProviderExample() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Child />
    </Web3ReactProvider>
  )
}
