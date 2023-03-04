import type { Web3ReactHooks } from '@web3-react/core'
import { CHAINS } from '../chains'
import {Box, Text, HStack } from '@chakra-ui/react'

export function Chain({ chainId }: { chainId: ReturnType<Web3ReactHooks['useChainId']> }) {
  if (chainId === undefined) return null

  const name = chainId ? CHAINS[chainId]?.name : undefined

  if (name) {
    return (
      <HStack spacing='10px'>
        <Box w='80px' bg=''>
          <Text fontSize='md' align='right'>Chain:</Text>
        </Box>
        <Box w='100%' bg=''>
          <Text fontSize='md' align='left'>{name}({chainId})</Text>
        </Box>
      </HStack>
    )
  }

  return (
    <HStack spacing='10px'>
      <Box w='100px' bg=''>
        <Text fontSize='md' align='right'>Chain Id:</Text>
      </Box>
      <Box w='100%' bg=''>
        <Text fontSize='md' align='left'>{chainId}</Text>
      </Box>
    </HStack>
  )
}
