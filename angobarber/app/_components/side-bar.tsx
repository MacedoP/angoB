"use client"
import { Calendar1Icon, HomeIcon, MenuIcon } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

import Image from "next/image"
import { quickSearchOptions } from "../_service-icon-filter/search-icon"
import ButtonOut from "./button-logout"

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

        <div  className="flex items-center gap-2 border-b border-solid py-5">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1596362601603-b74f6ef166e4?q=80&w=726&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </Avatar>

            <div>
              <p className="font-bold">Lumi Barber</p>
              <p className="text-xs">lumibarber53@gmail.com</p>
            </div>
        </div>

        {/************************************************************/}
        <div className="flex flex-col gap-2 border-b border-solid py-5">
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
        <div className="mb-4 flex flex-col items-start gap-2 border-b border-solid py-5">
          {quickSearchOptions.map((filter) => (
            <SheetClose key={filter.title} asChild>
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

        <ButtonOut />
      </SheetContent>
    </Sheet>
  )
}

export default SideBar
