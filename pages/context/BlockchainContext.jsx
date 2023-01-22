import React, {useState, useEffect}  from 'react'
import {abi, contractAddress} from '../config.json'
import {ethers} from "ethers"

export const BlockchainContext = React.createContext();

export const BlockchainProvider = ({children}) => {
    useEffect(()=>{
        
    }, []);



    return (
        <BlockchainContext.Provider 
            value={{  }}>
                {children}
        </BlockchainContext.Provider>
    )
}
