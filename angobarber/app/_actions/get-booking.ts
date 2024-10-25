"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"


/********************************* FUNCAO QUE PEGA OS HORARIOS NO NOSSO BANCO DE DADOS ************************/
interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({ date }: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}