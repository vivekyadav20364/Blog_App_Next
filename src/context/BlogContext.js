"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

const BlogContext = ({ children }) => {
  
  const [allData,setAllData] = useState("");
  const [trigger,setTrigger] = useState(false);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    fetchBlogs();
  }, [trigger]);
 

  async function fetchBlogs() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_baseUrl}/api/blog`
      );
      if (response.status === 200) {
        setAllData(response.data.allBlogData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
      setLoading(false);
    }
  }

  return (
     <AppContext.Provider value={{allData,setAllData,trigger,setTrigger,loading}}>{ children }</AppContext.Provider>
  );
};

export const ContextState=()=>{
  return useContext(AppContext);
}

export default BlogContext;
