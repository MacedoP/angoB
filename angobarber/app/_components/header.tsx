import { Card, CardContent } from "./ui/card"
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import SideBar from "./side-bar";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
       
       {/************************ LOGO *************************/} 
        <div className="logo_container flex">
          <Image src="/scissor.svg"  alt="Scisssor picture"  width={18} height={18}/>
          <h1 className="logo">
            <Link href="/">
            <span>Lm Barber</span> Shop
            </Link>
          </h1>
        </div>

        {/***************** BUTTON  de abrir o MENU ****************/}
        {/* <Button size="icon" variant="outline">
          <MenuIcon/>
        </Button>  */}
        <SideBar/>

      </CardContent>
    </Card>
  )
}

export default Header