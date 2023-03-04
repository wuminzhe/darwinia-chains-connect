import MetaMaskCard from '../components/connectorCards/MetaMaskCard'
import ProviderExample from '../components/ProviderExample'

import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
      <>
      <ProviderExample />
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
      </div>
      </>
    </ChakraProvider>
  )
}
