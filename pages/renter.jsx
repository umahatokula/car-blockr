import { Contract } from "ethers";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useSigner } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";


function dashboard() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const { data: signer } = useSigner()
  const { address, isConnected } = useAccount()

  const [loading, setLoading] = useState(false);

  const addRenter = async(renter) => {
      try {
          if(isConnected) {
      
              const contractInstance = new Contract(
                  CONTRACT_ADDRESS,
                  CONTRACT_ABI,
                  signer
              );
              console.log("🚀 ~ file: renter.jsx:19 ~ addRenter ~ contractInstance", contractInstance)
              
              renter.canRent = true;
              renter.active = true;
              renter.balance = 0;
              renter.due = 0;
              renter.start = 0;
              renter.end = 0;
              const {
                firstName,
                lastName,
                canRent,
                active,
                balance,
                due,
                start,
                end,
              } = renter;
              console.log("🚀 ~ file: renter.jsx:44 ~ addRenter ~ renter", renter)

              const tx = await contractInstance.addRenter( address, firstName, lastName, canRent, active, balance, due, start, end);

              setLoading(true)
              await tx.wait()
              setLoading(false)
              
          }
      } catch (error) {
          console.log('Could not add renter', error);
      }
  }

  return (
      <div className='w-screen h-screen mt-24 md:mt-40 bg-white'>

        <div className='container w-8/12 mx-auto'>

          <div className='flex w-full justify-center'>
            <p className='text-3xl font-semibold text-center md:text-4xl'>Welcome, please fill in your details</p>
          </div>

          {/* Four divs */}
          

          {/* Payment */}
          <div className='mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 justify-center items-center w-full'>
            <div className='space-y-12'>
              
              <form onSubmit={handleSubmit(addRenter)}>
                <div className="mb-4">
                  <input {...register("firstName", { required: true })} className='border text-center border-blue-300 rounded-xl w-full p-4' type="text" placeholder="First name" />
                  {errors.firstName && <span className='text-red-600 text-xs'>This field is required</span>}
                </div>
                <div className="mb-4">
                  <input {...register("lastName", { required: true })} className='border text-center border-blue-300 rounded-xl w-full p-4' type="text" placeholder="Last name" />
                  {errors.lastName && <span className='text-red-600 text-xs'>This field is required</span>}
                </div>

                <button type="submit" className='bg-teal-400 py-3 px-8 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'>Submit</button>
              </form>
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
                  <button className='bg-teal-400 py-3 px-8 mt-4 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'>Check In </button>
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