import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="bg-gray-800">
      <Head>
        <title>CarBlock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}

      {/* Hero section */}
      <div className='container w-11/12 mx-auto justify-between pt-14 md:flex'>

        {/* Caption */}
        <div className='text-white space-y-7 text-center md:pt-10'>
          <p className='p-0 capitalize text-5xl text-center font-extrabold md:text-7xl md:text-left md:pb-4 md:space-y-2'>Rent a car on CarBlock</p>
          <p className='text-white text-2xl md:text-4xl md:text-left md:pb-10'>Rent Your Next Car With Crypto!</p>
          <p className='text-white text-lg md:text-2xl md:text-left md:pb-2'>Connect Your Wallet. Choose Your Car. Enjoy Your Ride.</p>
        </div>

        {/* Car image */}
        <img className='' src="./images/car.png" alt="" />
      </div>
      <div>
      <div className='space-x-4 md:space-x-3 text-center mt-50 py-10'>
        
          <button className='bg-teal-400 py-3 px-8 rounded-xl hover:bg-teal-500 transition ease-linear duration-200'>Choose a car </button>
        </div>
      </div>
    </div>
  )
}

export default Home
