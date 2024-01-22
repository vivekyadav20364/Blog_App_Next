import HeroSection from "@/components/HeroSection";
import ShowAllBlogs from "@/components/ShowAllBlogs";

export default function Home() {

  return (
   <div className="">
    <HeroSection/>
    <div className="flex justify-evenly items-start max-w-7xl w-full m-auto my-5 ">
      <div className="left w-full lg:w-[100%] flex justify-content items-center flex-col">
      <ShowAllBlogs/>
      </div>
    </div>
 
   </div>
  );
}
