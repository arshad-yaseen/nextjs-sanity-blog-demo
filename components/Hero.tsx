import Image from 'next/image'
import React from 'react'
import MediumLetter from "../public/assets/images/mediumletter.png"

function Hero() {
  return (
    <div className="w-full h-[450px] flex items-center bg-yellow-500" >

        <div className='lg:w-[50%] w-full h-full flex flex-col justify-center lg:pl-12 lg:px-0 px-8' >

            <h1 className='md:text-6xl text-6xl font-semibold lg:text-start text-center' ><span className="underline">Medium</span> is a place to write, read and connect</h1>

            <p className='mt-5 lg:text-start text-center' >It's easy and free to post your thinking on any topic and connect with millions of readers</p>
 
        </div>


        <div className='w-[50%] lg:flex hidden h-full  justify-center items-center' >

            <Image src={MediumLetter} alt="medium letter logo" />

        </div>

    </div>
  )
}

export default Hero