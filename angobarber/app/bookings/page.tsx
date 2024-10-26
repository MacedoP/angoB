//Pagina que mostra todos os agendamentos ja feito

import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import { notFound } from "next/navigation"
import Agendamento from "../_components/banner-agendamento"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }
  //******************** Chamando o Banco de Dados ************************/
  //******************** Mostrar os agendaments confirmados ************************/
  const confirmedbookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  //******************** Chamando o Banco de Dados ************************/
  //******************** Mostrar os agendaments nao confirmados ************************/
  const concludebookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  return (
    <>
      {/************************************* HEADER ***************************************/}
      <Header />

      {/************************************* BOOKINGS DETAILS CONFIRMED ***************************************/}
      <div className="space-y-3 p-5">
        {/************************************* BOOKINGS DETAILS CONFIRMED ***************************************/}
        <h1 className="text-xl font-bold">Agendamento</h1>

        {confirmedbookings.length > 0 && (
          <>
            <h2 className="mb-2 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedbookings.map((booking) => (
              <Agendamento key={booking.id} booking={booking} />
            ))}
          </>
        )}

        {/************************************ BOOKINGS DETAILS NOT CONFIRMED*************************************/}
        {confirmedbookings.length > 0 && (
          <>
            <h2 className="mb-2 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concludebookings.map((booking) => (
              <Agendamento key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
