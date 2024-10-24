import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";
import SideBar from "./side-bar";


const MenuArrowBack = () => {
    return (  
        <div>
             {/*Botao com seta para voltar a Home page*/}
             <Button className="absolute left-4 top-4" size="icon" variant="secondary" asChild>
               <Link href="/">
                <ChevronLeftIcon/>
               </Link>
            </Button>

            {/*Botao com o icon de menu para abrir o nosso menu lateral*/}
            <Button className="absolute right-4 top-4" size="icon" variant="secondary">
                <SideBar/>
            </Button>
        </div>
    );
}
 
export default MenuArrowBack;