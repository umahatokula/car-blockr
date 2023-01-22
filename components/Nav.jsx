import React, {useContext} from 'react'
import { BlockchainContext } from '../pages/context/BlockchainContext'
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import MobileMenu from './MobileMenu';



const Nav = () => {
 const {connectWallet, currentAccount} = useContext (BlockchainContext)
  return (
    <nav className='flex justify-between items-center w-full p-6 bg-gray-800'>
      <div className='flex items-center space-x-2'>
          <img className='w-14 rounded-full' src='./images/logo.png' />
          <p className='text-white font-semibold text-3xl'>CarBlock</p>
      </div>
      <div className='flex space-x-2 items-center'>
        <ConnectKitButton />
        <MobileMenu />
      </div>
    </nav>
    )
}

export default Nav