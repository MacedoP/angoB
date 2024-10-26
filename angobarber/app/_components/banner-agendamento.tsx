import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import Contactos from "./contatos-footer"

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
  const isConfirmed = isFuture(booking.date)
  const {
    service: { barbershop },
  } = booking
  return (
    <Sheet>
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

      <SheetContent className="w-[80%] border-b border-solid">
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

          <Card className="mt-3 mb-2">
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
              {barbershop.phones.map(phone =>(
                <Contactos key={phone} phones={phone}/>

              ))}
            </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Agendamento
