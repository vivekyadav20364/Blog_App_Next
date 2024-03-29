'use client'
import { ContextState } from '@/context/BlogContext';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify';
import { Spinner } from '@/components/Spinner';
// import JoditEditor from 'jodit-react';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Createblog = () => {
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [loadingPic,setLoadingPic] = useState(false);
  const {trigger,setTrigger} = ContextState();
  const router = useRouter()
  const editor = useRef(null);
	const [content, setContent] = useState('');

  const handleChange=(e)=>{
  const {name,value} = e.target;
  setFormData((pre)=>({
    ...pre,
    [name]: value,
  }))
  }

  const postDetails=(pics)=>{
    setLoadingPic(true);
    if(pics==undefined){
      toast.error("Please select an Image!");
      setLoadingPic(false)
      return;
    }

    if(pics.type=="image/jpeg" || pics.type=="image/png"){
      console.log("vivek pic",pics);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "daruus6qx");
      fetch("https://api.cloudinary.com/v1_1/daruus6qx/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // setPic(data.url.toString());
          console.log(data.url.toString());
          setFormData((pre)=>({
            ...pre,
            pic: data.url.toString(),
          }))
          setLoadingPic(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingPic(false);
        });
    } else {
      toast.error("Please select an Image!");
      setLoadingPic(false);
      return;
    }
    }  



    const createBlog =async (e)=>{
        e.preventDefault();
        setLoading(true)

        if(!formData.title) {
          toast.error("Title field is required");
          setLoading(false)
          return;
        }

        else if(!formData.author){
          toast.error("Author field is required");
          setLoading(false)
          return;
        }       
        try {
          console.log({...formData,description:content})
        const response = await axios.post(`${process.env.NEXT_PUBLIC_baseUrl}/api/blog`,
            {...formData,description:content},{headers:{'Content-Type':'application/json'}}
        );
        if(response.status==200){
            toast.success("Blog created successfully");
            setTrigger(!trigger)
            setTimeout(()=>{
                router.push('/');
            },1000)
            setLoading(false)

        }

        } catch (error) {
            console.log(error);
            toast.error("Server Error")
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }

  return (
    <>
<div className='flex flex-col-reverse justify-center items-center lg:flex-row lg:justify-evenly lg:items-center mt-9 md:mt-16 lg:gap-y-1 gap-y-8'>
        <form onSubmit={createBlog} className=" mx-3.5 bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-68 md:min-w-96">
            <h1 className='text-center font-semibold text-2xl mb-4'>Create New Blog</h1>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500" htmlFor="title">
        Title
      </label>
      <input className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline mb-2" id="title" name='title' onChange={handleChange}  type="text" placeholder="Title"/>
      
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500 " htmlFor="author">
        Author Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:shadow-outline" name='author' id="author"  type="text" placeholder="Author" onChange={handleChange}/>
      
    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500 " htmlFor="author">
        Blog's Image
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:shadow-outline" name='pic' id="pic"  type="file" placeholder="Choose pic" onChange={(e)=>postDetails(e.target.files[0])}/>
      <span>{loadingPic && <Spinner/>}</span>
    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500 " htmlFor="introductions">
        Introduction
      </label>
      <input maxLength={200} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:shadow-outline" name='introductions' id="introductions"  type="text" placeholder="Short Introduction (Maximum 200 character)" onChange={handleChange}/>
    </div>    
    <div className="mb-6 xl:w-50%">
      <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:text-red-500 " htmlFor="description">
      Description
      </label>
      <JoditEditor
			ref={editor}
			value={content}
      name="description"
			tabIndex={1} 
			onChange={(e)=>setContent(e)}
		/>
    
    </div>
    <div className="flex items-center justify-end">
      <button disabled={loadingPic} type="submit" className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
        {loading?"processing":"Create"}
      </button>
    
    </div>
  </form>
  <div className=''>
    <Image className='' src={'/writing.jpg'} width={400} height={400} alt='blogImg' />
  </div>
 
  </div>
  </>
  )
}

export default Createblog;