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
  DialogTrigger,
} from "./ui/dialog"
import {
  Calendar1Icon,
  HomeIcon,
  LogInIcon,
  MenuIcon,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SignInDialog from "./sign-in-dialog"


const SideBar = () => {
  const { data } = useSession()
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

        {/**************************** FAZER LOGIN COM GOOGLE ********************************/}
        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
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
                <Link href={`/barbershop?service=${filter.title}`}>
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
