import '../styles/globals.css'
import { BlockchainProvider } from './context/BlockchainContext'
import { WagmiConfig, createClient } from "wagmi";
import { mainnet, polygon, polygonMumbai, optimism, arbitrum } from "wagmi/chains";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import Nav from '../components/Nav';


// function MyApp({ Component, pageProps }) {
//   return (
  
//     <div className='h-full bg-white'>
//      <BlockchainProvider>
//       <Navigation />
//       <Component {...pageProps} />
//       </BlockchainProvider>
//     </div>
//   )
// } 

// Choose which chains you'd like to show
const chains = [mainnet, polygon, polygonMumbai];

const alchemyId = "fqPim3iU6u59SV5vBuP-nprpdDUWsg_U"

const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
    chains,
  }),
);

const MyApp = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
      <div className='h-full bg-white'>
     <BlockchainProvider>
      <Nav />
      <Component {...pageProps} />
      </BlockchainProvider>

    </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default MyApp
