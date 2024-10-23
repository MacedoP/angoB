import { Card, CardContent } from "./ui/card"
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        {/*Div que contem a  nossa logo*/}
        
        <div className="logo_container flex">
          <Image src="/scissor.svg"  alt="Scisssor picture"  width={18} height={18}/>
          <h1 className="logo">
            <Link href="/">
            <span>Lm Barber</span> Shop
            </Link>
          </h1>
        </div>

        {/*BOTAO DO MENU LATERAL A DIREITA COM ICON DO MENU NO HEADER*/}
      </CardContent>
    </Card>
  )
}

export default Header