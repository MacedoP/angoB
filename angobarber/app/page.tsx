import Header from "./_components/header"
import Banner from "./_components/banner"
import Agendamento from "./_components/banner-agendamento"
import BarberShopItem from "./_components/barbershop-items"
import Filter from "./_components/filter-service"
import Search from "./_components/search"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { db } from "./_lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularesBarbershop = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const actualbookings = session?.user ? await db.booking.findMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (session?.user as any).id,
      date:{
        gte: new Date(),
      }
    },
    include:{
      service: {
        include: {
          barbershop: true
        },
      },
    },
    orderBy:{
      date: 'asc',
    }
  }) : []

  return (
    <div>
      {/***************** HEADER ********************/}
      <Header />

      {/******************** Message Abaixo do Header *****************/}
      <div className="p-5">
        <h1 className="text-xl font-bold">Ola, {session?.user ? session.user.name : "Bem vindo "}</h1>
        <p className="mt-1 capitalize">{format(new  Date(), "EEEE,dd 'de' MMMM 'de' yyyy",{locale: ptBR})}</p>

        {/******************* Input De Pesquisa ********************/}
        <div className="mt-4">
          <Search />
        </div>

        <div className="mt-6">
          <Filter />
        </div>

        {/********************** BANNER NA HOME PAGE ******************/}
        <div className="relative mt-6">
          <Banner />
        </div>

        {/************** BANNER DE AGENDAMENTO *****************/}
        <h2 className="mb-2 mt-6 text-sx font-bold uppercase text-gray-400">Agendamentos</h2>
        <div className="mt-6 flex overflow-x-auto gap-3 [&:: -webkit-scrollbar]:hidden">
          {actualbookings.map((booking) => (
              <Agendamento key={booking.id} booking={booking}/>
          ))}
        </div>

        {/*Abaixo estamos a rodar os nosso bancos  e mostrar as nossas imagens*/}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-auto">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-auto">
          {popularesBarbershop.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default Home
