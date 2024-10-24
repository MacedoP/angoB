"use client"

import Link from "next/link"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Calendar1Icon, HomeIcon, LogInIcon, MenuIcon } from "lucide-react"

const SideBar = () => {
  // const {data} = useSession();
  const handleLoginWithGoogle = () => {}

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
        {/**************************** FAZER LOGIN COM GOOGLE ********************************/}

        <div className="flex items-center justify-between gap-2 border-b border-solid py-5">
          <h2 className="text-md font-bold">Olá, faça seu login</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 text-lg font-bold" size="icon">
                <LogInIcon />
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%] rounded-xl">
              <DialogHeader>
                <DialogTitle>Faça seu login na plataforma</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta do google
                </DialogDescription>
              </DialogHeader>

              <Button
                variant="outline"
                className="gap-2 text-lg font-bold"
                onClick={handleLoginWithGoogle}
              >
                <Image
                  src="/google.svg"
                  width={18}
                  height={18}
                  alt="Google icon "
                />
                Google
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/**************************** SIDE BAR TEXTO INICIO********************************/}
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

         {/**************************** ICON NO SIDE BAR ********************************/}
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
