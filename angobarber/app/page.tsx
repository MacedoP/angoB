import Header from "./_components/header"
import Banner from "./_components/banner"
import Agendamento from "./_components/banner-agendamento"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-items"
import Filter from "./_components/filter-service"
import Search from "./_components/search"

const Home = async () => {
  
  const barbershops = await db.barbershop.findMany({})
  const popularesBarbershop = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  

  return (
    <div>
      {/***************** HEADER ********************/}
      <Header />

      {/******************** Message Abaixo do Header *****************/}
      <div className="p-5">
        <h1 className="text-xl font-bold">Ola , Macedo</h1>
        <p className="mt-1">Segunda-feira, 08 de agosto</p>


        {/******************* Input De Pesquisa ********************/}
       <div className="mt-4">
          <Search/>
       </div>

        <div className="mt-6">
          <Filter/>
        </div>


        {/********************** BANNER NA HOME PAGE ******************/}
        <div className="relative mt-6">
           <Banner/>
        </div>


        {/************** BANNER DE AGENDAMENTO *****************/}
        <div className="mt-6">
          <Agendamento/>
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
