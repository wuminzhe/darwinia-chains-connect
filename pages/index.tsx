import MetaMaskCard from '../components/connectorCards/MetaMaskCard'
import ProviderExample from '../components/ProviderExample'

export default function Home() {
  return (
    <>
      <ProviderExample />
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
      </div>
    </>
  )
}
