import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { useCallback, useEffect, useState } from 'react'

import { CHAINS, getAddChainParameters } from '../chains'
import { Select, Button } from '@chakra-ui/react'

import { useRouter } from 'next/router';


function ChainSelect({
  activeChainId,
  switchChain,
  chainIds,
}: {
  activeChainId: number
  switchChain: (chainId: number) => void
  chainIds: number[]
}) {
  return (
    <Select 
      value={activeChainId} 
      disabled={switchChain === undefined} 
      onChange={(event) => {
        switchChain(Number(event.target.value))
      }}
    >
      <option hidden disabled selected={activeChainId === undefined}>
        Select Chain
      </option>
      <option value={-1} selected={activeChainId === -1}>
        Default
      </option>
      {
        chainIds.map((chainId) => (
          <option key={chainId} value={chainId} selected={chainId === activeChainId}>
            {CHAINS[chainId]?.name ?? chainId}
          </option>
        ))
      }
    </Select>
  )
}

export function ConnectWithSelect({
  connector,
  activeChainId,
  chainIds = Object.keys(CHAINS).map(Number),
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[]
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: (error: Error | undefined) => void
}) {
  const router = useRouter();
  
  let initChainId: number;
  if(router.query.chainId) {
    initChainId = parseInt(router.query.chainId as string);
  } else {
    initChainId = -1;
  }
  const [desiredChainId, setDesiredChainId] = useState<number>(initChainId)

  const chainName = CHAINS[initChainId]?.name;

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId)

      try {
        if (
          // If we're already connected to the desired chain, return
          desiredChainId === activeChainId ||
          // If they want to connect to the default chain and we're already connected, return
          (desiredChainId === -1 && activeChainId !== undefined)
        ) {
          setError(undefined)
          return
        }

        if (desiredChainId === -1) {
          await connector.activate()
        } else {
          await connector.activate(getAddChainParameters(desiredChainId))
        }

        setError(undefined)
      } catch (error) {
        setError(error)
      }
    },
    [connector, activeChainId, setError]
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        onClick={() =>
          switchChain(initChainId)
        }
        disabled={isActivating || !desiredChainId}
      >
        {
          activeChainId == initChainId ? (
            `${chainName} Connected`
          ) : (
            error ? 'Try again?' : 'Add To MetaMask' 
          )
        }
      </Button>
    </div>
  )
}
