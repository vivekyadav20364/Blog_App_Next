'use client'
import axios from 'axios';
import Image from 'next/image';
import { Spinner } from './Spinner';
import Link from 'next/link';
import { ContextState } from '@/context/BlogContext';
const ShowAllBlogs = () => {

const {allData,setAllData,loading} = ContextState();

if(loading){
  return(
    <div className='w-full h-64 flex justify-center items-center'>
    <Spinner/>
    </div>
  )
} 

  return (

  
    <>
    <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 place-content-center gap-x-6 ">
    {allData && allData.map((items,ind)=>(
      <div key={ind} className="mx-3.5  my-5  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]   flex-col justify-start items-center">
      <Link href={`http://localhost:3000/blog/${ind}`} >
        <Image className='w-full' width={250} height={250} src={'/blog.jpg'} alt='blogImg' />
        </Link>
         <div className='m-3'>
         <h2 className=' text-base text-center font-sans text-xl text-orange-500'>{items?.title}</h2>
         <p className='pt-1 font-serif'>{(items?.description).substring(0,80)}<span>...</span></p>
         </div>
      </div>
      
         ))       
         }
     
         </div>

         {!allData.length && <div className='w-full flex justify-center items-center h-96 text-3xl font-semibold'>
         <span> No any articles available</span>
         </div>}

        </>
  )
}

export default ShowAllBlogs