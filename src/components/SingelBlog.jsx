'use client'
import axios, { all } from 'axios';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { FaUserAlt } from "react-icons/fa";
import { Spinner } from './Spinner';
import { ContextState } from '@/context/BlogContext';

const SingleBlog = () => {
 const [blogData,setBlogData]  =useState("");
const params = useParams()
const {allData,setAllData} = ContextState();

const DisplayBlogContent = ({ content }) => (
  <div className='text-center mx-1 px-2 sm:w-[450px] md:w-[600px] lg:w-[750px] changeHtml' dangerouslySetInnerHTML={{ __html: content }} />
);


 useEffect(()=>{
  async function getAllProjectsData() {
    try {
      setBlogData(allData[params?.id]);
     
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  }
  getAllProjectsData();
},[])

  return (
    <div className='max-w-7xl w-full m-auto flex-col flex justify-center items-center mt-2 mb-6'>
      {blogData && blogData.pic && (
        <Image height={300} width={400} src={blogData.pic} className={`rounded-md w-full max-w-lg singleImg`} alt='blogImg' />
      )}
        <div className='flex flex-col justify-start items-start mt-6'>
         {blogData?
        <div className='flex flex-col justify-start items-center gap-y-4'>
          <div className='flex flex-row justify-between items-center'>
          <div className='border-2 border-black rounded-full bg-gray-100 h-10 w-10 mr-3 flex justify-center items-center'>
            <FaUserAlt/>
          </div>
          <p><span className='font-medium text-xl'>Auther: </span><b>{blogData.author?blogData.author:"Jhon Due"}</b></p>
          </div>
          <p className='text-2xl font-bold px-2 font-sans'>{blogData.title.replace(/'/g, '&apos;')}</p>

          <p className='text-center px-3 font-serif'><DisplayBlogContent content={blogData.description} /></p>
          </div>
        :
        <div className='w-full justify-center items-start h-36'><Spinner/></div>
         }
        </div>
    </div>
  )
}

export default SingleBlog;

