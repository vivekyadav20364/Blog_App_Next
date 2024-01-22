import Blogs from "@/db/blogModel";
import dbConnect from "@/db/connection";
import { NextResponse } from "next/server";

export async function GET(req,ctx){
    dbConnect();
  try {

    const id = ctx.params.id ;
    const article = await Blogs.findById({_id:id});
    return NextResponse.json({message:"Blog getted successfully",article},{status:200});

    
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"Something went wrong"},{status:500});
  }
}


