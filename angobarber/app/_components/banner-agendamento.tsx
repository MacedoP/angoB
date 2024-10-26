"use client"
import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import Contactos from "./contatos-footer"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { deleteBooking } from "../_actions/delete-bookings"
import { toast } from "sonner"
import { useState } from "react"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const Agendamento = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleSheetOpenChange = (isOpen: boolean) =>{
    setIsSheetOpen(isOpen)
  }

  const isConfirmed = isFuture(booking.date)
  const {
    service: { barbershop },
  } = booking

  const handleCancelBooking = async () => {
    try {
      // await deleteBooking(!booking.id) usa este codigo caso desejas ver se erro de cancelar sera executado
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancela com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar reserva tenta novamente!")
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full" asChild>
        <Card className="min-w-[90%] gap-3">
          <CardContent className="flex justify-between p-0">
            
            {/*Div a esquerda*/}
            <div className="flex flex-col gap-2 py-5 pl-4">

              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            {/*Div a direita*/}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="tex-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className=" border-b border-solid">
        <SheetHeader>
          <SheetTitle>
            <SheetTitle className="border-b border-solid text-left">
              Informacoes da Reserva
            </SheetTitle>
          </SheetTitle>
        </SheetHeader>

        <div className="relative m-auto mt-6 flex h-[200px] w-full items-end">
          <Image
            src="/map.jpg"
            fill
            className="rounded-xl object-cover"
            alt="barber  location"
          />

          <Card className="z-50 m-auto w-[90%] rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>

              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-sm text-gray-400">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="mb-2 mt-3">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "AOA",
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              {/************************** Data e o dia da Reserva ********************************/}
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm">
                  {format(booking.date, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              {/************************** HORAROIO DA RESERVA ********************************/}
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horario</h2>
                <p className="text-sm">
                  {" "}
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              {/************************** NOME DA BARBEARIA ONDE FOI FEITO A RESERVA ********************************/}
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="text-sm">{booking.service.name}</p>
              </div>
            </CardContent>
          </Card>

          <div>
            {barbershop.phones.map((phone) => (
              <Contactos key={phone} phones={phone} />
            ))}
          </div>
        </div>

        {/****************** button para voltar  *******************/}
        <SheetFooter className="mt-[70px]">
          <div className="flex items-center justify-between gap-3 px-2">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            {/******************************* Pergunta para cancelar ****************8*/}
            {isConfirmed && (
              <Dialog>
                <DialogTrigger>
                  <Button variant="destructive" className="w-full">
                    Cancelar reserva
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-[90%] rounded-xl">
                  <DialogHeader>
                    <DialogTitle>Voce quer cancelar sua reserva?</DialogTitle>
                    <DialogDescription>
                      Tem certeza que queres cancelar sua reserva?, essa accao
                      nao pode ser irrevesivel.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex flex-row items-center gap-3 justify-center w-full">
                    <DialogClose className="flex flex-row items-center gap-3 justify-center w-full ">
                      <Button variant="outline" className="w-full">
                        Cancelar
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleCancelBooking}
                      >
                        Confimar
                      </Button>
                    </DialogClose>
                  </DialogFooter>

                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Agendamento
