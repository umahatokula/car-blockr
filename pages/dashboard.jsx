import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { useAccount, useContract, useSigner } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants'
import { AiOutlineCar, AiOutlineFieldTime, AiOutlineDollarCircle } from "react-icons/ai";


function dashboard() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [creditBal, setCreditBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: signer, isError, isLoading } = useSigner()
  const { address, isConnecting, isDisconnected } = useAccount()
 
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    signerOrProvider: signer,
  })

  const handleDeposit = async() => {
    try {
      const tx = await contract.deposit(address, {value: ethers.utils.parseEther(depositAmount)});
      setLoading(true)
      await tx.wait()
      setLoading(false)

      // get balance
      balanceOfRenter();
    } catch (error) {
      console.log("🚀 ~ file: dashboard.jsx:31 ~ handleDeposit ~ error", error)      
    }    

  }

  const handlePayment = async() => {
    try {
      const tx = await contract.makePayment(address, {value: ethers.utils.parseEther(paymentAmount)});
      setLoading(true)
      await tx.wait()
      setLoading(false)

      // get balance
      balanceOfRenter();
    } catch (error) {
      console.log("🚀 ~ file: dashboard.jsx:31 ~ handleDeposit ~ error", error)      
    }    

  }

  const balanceOfRenter = async () => {
    try {
      const tx = await contract.balanceOfRenter(address);
      setCreditBalance(tx)
    } catch (error) {
      console.log("🚀 ~ file: dashboard.jsx:40 ~ balanceOfRenter ~ error", error)      
    }
  }

  const [due, setDue] = useState()
  const getDue = async () => {
    try {
      const tx = await contract.getDue(address);
      setDue(ethers.utils.formatEther(tx))
    } catch (error) {
      console.log("🚀 ~ file: dashboard.jsx:40 ~ balanceOfRenter ~ error", error)      
    }
  }
  
  const checkOut = async() => {
    try {
      const tx = await contract.checkOut(address);
      setLoading(true)
      await tx.wait()
      setLoading(false)
    } catch (error) {
      console.log("🚀 ~ file: dashboard.jsx:49 ~ checkOut ~ error", error)      
    }
  }
  
  const checkIn = async() => {
    try {
      const tx = await contract.checkIn(address);
      setLoading(true)
      await tx.wait()
      setLoading(false)
    } catch (error) {
      console.log("🚀 ~ file: dashboard.jsx:49 ~ checkOut ~ error", error)      
    }
  }
  
  const [driveDuration, setDriveDuration] = useState();
  const driveMinutes = async() => {
    try {
      const tx = await contract.getTotalDuration(address);
      setDriveDuration(tx.toString())
    } catch (error) {
      console.log("🚀 ~ file: dashboard.jsx:49 ~ checkOut ~ error", error)      
    }
  }
  

  useEffect(() => {
    if(!signer) return;
    balanceOfRenter();
    getDue();
    driveMinutes();
  },[signer])

  return (
      <div className='w-screen h-screen mt-24 md:mt-40 bg-white'>

        <div className='container w-8/12 mx-auto'>
          
          <div className='flex w-full justify-center'>
            <p className='text-3xl font-semibold text-center md:text-4xl'>Welcome, Here are your stats:</p>
          </div>

          {/* Four divs */}
          <div className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-4'>

            <div className='flex bg-green-300 h-28 rounded-xl p-4 shadow-lg'>
              {/* BNB Credit */}
              <div className='w-3/4 flex flex-col justify-center items-center'>
                <p className='text-xl font-semibold'>MATIC Credit</p>
                <p className='text-3xl font-bold'>{ethers.utils.formatEther(creditBal)}</p>
              </div>
              {/* Wallet */}
              <div className='w-1/4 flex justify-center items-center'>
                <AiOutlineDollarCircle className='text-black' size={35} />
              </div>
            </div>

            <div className='flex bg-green-300 h-28 rounded-xl p-4 shadow-lg'>
              {/* BNB Credit */}
              <div className='w-3/4 flex flex-col justify-center items-center'>
                <p className='text-xl font-semibold'>MATIC Due</p>
                <p className='text-3xl font-bold'>{due}</p>
              </div>
              {/* Wallet */}
              <div className='w-1/4 flex justify-center items-center'>
                <AiOutlineDollarCircle className='text-black' size={35} />
              </div>
            </div>

            <div className='flex bg-green-300 h-28 rounded-xl p-4 shadow-lg'>
              {/* BNB Credit */}
              <div className='w-3/4 flex flex-col justify-center items-center'>
                <p className='text-xl font-semibold'>Drive Minutes</p>
                <p className='text-3xl font-bold'>{driveDuration}</p>
              </div>
              {/* Wallet */}
              <div className='w-1/4 flex justify-center items-center'>
                <AiOutlineFieldTime className='text-black' size={35} />
              </div>
            </div>
            
            <div className='flex bg-red-800 h-28 rounded-xl p-4 shadow-lg'>
              {/* BNB Credit */}
              <div className='w-3/4 flex flex-col justify-center items-center'>
                <p className='text-xl text-white font-semibold'>CarBlock</p>
              </div>
              {/* Wallet */}
              <div className='w-1/4 flex justify-center items-center'>
                <AiOutlineCar className='text-white' size={35} />
              </div>
            </div>

          </div>

          {/* Payment */}
          <div className='mt-16 grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div className='flex flex-col justify-center items-center space-y-12'>
              <p className='text-xl font-semibold'>Credit Your Account</p>
              
              <div>
                <input onChange={(e) => setDepositAmount(e.target.value)} className='border text-center border-blue-300 rounded-xl w-full p-4' type="text" placeholder="Credit Balance" />
              </div>

              <button onClick={()=>handleDeposit()} className='bg-teal-400 py-3 px-8 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'>{loading?'Processing...':'Deposit'}</button>
            </div>
            <div className='mt-16 md:mt-0 flex flex-col justify-center items-center space-y-12'>
              <p className='text-xl font-semibold'>Pay Your Due</p>
              
              <div>
                <input onChange={(e) => setPaymentAmount(e.target.value)} className='border text-center border-blue-300 rounded-xl w-full p-4' type="text" placeholder="Payments" />
              </div>

              <button onClick={()=>handlePayment()} className='bg-teal-400 py-3 px-8 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'>{loading?'Processing...':'Make Payment'}</button>
            </div>
          </div>

          {/* Car options */}
          <div className='mt-16 grid grid-cols-1 gap-5 md:grid-cols-3'>
            <div>
              <div className=''>
                <img className='object-cover rounded-t-xl' src="https://images.pexels.com/photos/2684219/pexels-photo-2684219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              </div>
              <div className="border p-4">
                <p>
                A good car should be able to consistently perform well and not break down frequently.

                Fuel efficiency: For some people, a car's fuel efficiency (or how much fuel it consumes per mile driven) is an important factor.

                Safety: A good car should have feat
                </p>
                <div className='space-x-4 md:space-x-3 text-center'>
                  <button onClick={() => {checkOut()}} className='bg-teal-400 py-3 px-8 mt-4 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'>{loading?'Checking Out...':'Check Out'} </button>
                  <button onClick={() => {checkIn()}} className='bg-teal-400 py-3 px-8 mt-4 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'>Check In </button>
                </div>
              </div>
            </div>
            <div>
              <div className=''>
                <img className='object-cover rounded-t-xl' src="https://images.pexels.com/photos/2684219/pexels-photo-2684219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              </div>
              <div className="border p-4">
                <p>
                A good car should be able to consistently perform well and not break down frequently.

                Fuel efficiency: For some people, a car's fuel efficiency (or how much fuel it consumes per mile driven) is an important factor.

                Safety: A good car should have feat
                </p>
                <div className='space-x-4 md:space-x-3 text-center'>
                  <button className='bg-teal-400 py-3 px-8 mt-4 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'> In </button>
                  <button className='bg-teal-400 py-3 px-8 mt-4 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'>Check In </button>
                </div>
              </div>
            </div>
            <div>
              <div className=''>
                <img className='object-cover rounded-t-xl' src="https://images.pexels.com/photos/2684219/pexels-photo-2684219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              </div>
              <div className="border p-4">
                <p>
                A good car should be able to consistently perform well and not break down frequently.

                Fuel efficiency: For some people, a car's fuel efficiency (or how much fuel it consumes per mile driven) is an important factor.

                Safety: A good car should have feat
                </p>
                <div className='space-x-4 md:space-x-3 text-center'>
                  <button className='bg-teal-400 py-3 px-8 mt-4 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'>Check In </button>
                  <button className='bg-teal-400 py-3 px-8 mt-4 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'>Check In </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
  )
}

export default dashboard