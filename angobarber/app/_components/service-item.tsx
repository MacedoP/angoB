"use client"
import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { format, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-booking"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}
//********************************************************************************/
const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const getTimeList = (bookings: Booking[]) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    // const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
    // if (timeIsOnThePast && isToday(selectedDay)) {
    //   return false
    // }
    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

//********************************************************************************/

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  //********************************************************************************/
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  //*********************************DIAS JA SELECIONADOS*****************************************
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)
  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  //******************************************************************************/
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }
  //******************************************************************************/
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  /*******************************************************************/
  const handleCreateBooking = async () => {
    console.log({ service })
    try {
      if (!selectedDay || !selectedTime) return

      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })

      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      toast.success("Reserva criada com sucesso!")
      handleBookingSheetOpenChange()
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva!")
    }
  }

  return (
    <>
      <Card className="overflow-x-auto border-b border-solid">
        <CardContent className="flex w-full gap-3 overflow-x-auto p-3">
          {/***************************************************************/}
          {/*Div que contem as imagens dos serviços*/}
          <div className="container_img relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="barber_img object-cover"
            />
          </div>

          {/***************************************************************/}
          <div className="w-full space-y-3">
            <h2 className="font-semibold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "AOA",
                }).format(Number(service.price))}
              </p>
              {/***************************************************************/}
              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
              
                  <Button variant="secondary" size="sm" onClick={() => setBookingSheetIsOpen(true)}>
                    Reversar
                  </Button>
                
                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  {/**************************** CALENDARIO ***********************************/}
                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      fromDate={new Date()}
                      onSelect={handleDateSelect}
                      // fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {/**************************** HORARIOS ***********************************/}
                  {selectedDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                      {getTimeList(dayBookings).map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                  {/**************************** RESUMO DA RESERVA ***********************************/}
                  {selectedTime && selectedDay && (
                    <div className="p-5">
                      <Card>
                        <CardContent className="space-y-3 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "AOA",
                              }).format(Number(service.price))}
                            </p>
                          </div>

                          {/************************** Data e o dia da Reserva ********************************/}
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectedDay, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>

                          {/************************** HORAROIO DA RESERVA ********************************/}
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Horario</h2>
                            <p className="text-sm">{selectedTime}</p>
                          </div>

                          {/************************** NOME DA BARBEARIA ONDE FOI FEITO A RESERVA ********************************/}
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  {/*****************************BOTAO CONFIRMAR RESERVA*****************************/}
                  <SheetFooter className="mt-5 px-5">
                    <SheetClose asChild>
                      <Button
                        onClick={handleCreateBooking}
                        disabled={!selectedDay || !selectedTime}
                      >
                        Cofirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          {/***************************************************************/}
        </CardContent>
      </Card>
    </>
  )
}

export default ServiceItem
