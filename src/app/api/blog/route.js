import Blogs from "@/db/blogModel";
import dbConnect from "@/db/connection";
import { NextResponse } from "next/server";

export async function POST(req){
    dbConnect();
  try {
    const reqBody = await req.json();
    const {title,description,author} = reqBody;
    if(!title || !description || !author){
      return NextResponse.json({message:"All fields are required"},{status:400});
    }

    const addBlog = new Blogs({
        title,description,author
    });

    await addBlog.save();
    return NextResponse.json({message:"Blog created successfully"},{status:200});

    
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"Something went wrong"},{status:500});
  }
}


export async function GET(){
    dbConnect()
    try{
     const allBlogData = await Blogs.find({});
      return NextResponse.json({message:"Blogs getting successfully",allBlogData},{status:200})
    }catch(error){
        console.log(error);
        return NextResponse.json({message:"Something went wrong"},{status:500});
    }
}