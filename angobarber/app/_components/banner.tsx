import Image from "next/image";

const Banner = () => {
    return ( 
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] relative">
            <Image src="/banner04.jpg" 
            fill className="object-cover rounded-xl w-[60%]" 
            alt="banner img" 
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 60vw" 
            />
        </div>
     );
}
 
export default Banner;