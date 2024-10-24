
"use client";
import { Calendar1Icon, HomeIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import Image from "next/image"
import { quickSearchOptions } from "../_service-icon-filter/search-icon";



const SideBar = () => {

  // const {data} = useSession(); 

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
       
       {/*Div que contem o nosso operador ternaria que vai dizer caso nao tenhamos nenhum usuario exibe a mensagem Faça seu login*/}
        <div className="py-5 border-b border-solid flex items-center gap-2">
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                  <AvatarImage src={data?.user?.image ?? ""}/>
              </Avatar>
              <div className="text-sm ">
                  <p className="font-bold">{data.user.name}</p>
                  <p className="text-gray-400">{data.user.email}</p>
              </div>
          </div>

          ): (

            <div className="flex items-center justify-between w-full">
              {/*Se nao tiver nenhum usuario esta mensagem sera exibia*/}
                <h2 className="font-bold text-md">Olá, faça seu login</h2>
                
                {/* <LoginDialog /> */}
            </div>
          )}
         </div> 


        <div className="flex flex-col gap-2 py-5 border-b border-solid">
          <SheetClose asChild>
            <Button className="flex items-center justify-start gap-2" asChild>
                <Link href="/">
                    <HomeIcon size={18} />
                    Ínicio
                </Link>
            </Button>
          </SheetClose>

          <Button
            className="flex items-center justify-start gap-2"
            variant="ghost"
          >
            <Calendar1Icon />
            Agendamento
          </Button>
        </div>

          {/*Div que guarda os nosso itens de busca rapida com os respectivos icon*/}
        <div className="flex flex-col  items-start  gap-2 border-b border-solid  mb-4 py-5">
              {quickSearchOptions.map((filter) => (
                <SheetClose  key={filter.title} asChild>
                  <Button
                    variant="ghost"
                    className="text-md flex w-full justify-start gap-3 text-white"
                    asChild
                  >
                    <Link href={`barbershops?services=${filter.title}`}>
                      <Image
                        src={filter.imageUrl}
                        alt={filter.title}
                        width={18}
                        height={18}
                      />
                      {filter.title}
                    </Link>
                  </Button>
                </SheetClose>
            ))}
        </div>

      </SheetContent>
    </Sheet>
  )
}

export default SideBar
