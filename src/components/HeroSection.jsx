import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <section className='w-full bg-black text-white'>
      <div className='max-w-7xl w-full m-auto  '>
        <div className='max-w-3xl w-full m-auto flex justify-center items-center flex-col h-72'>
        <h1 className='font-extrabold text-3xl text-center  md:text-5xl my-6 '>Welcome to our blog</h1>
        <i className='text-center px-2'>Welcome to our tech blog! Discover insightful articles on programming, AI, and more. Stay updated with industry trends and practical tips. Join us in the dynamic world of technology.</i>
        </div>
      </div>
    </section>
  )
}

export default HeroSection