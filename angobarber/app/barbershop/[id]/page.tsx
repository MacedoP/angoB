
"use server"

import { db } from "@/app/_lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import { ChevronLeftIcon, MapPin, StarIcon } from "lucide-react"
import Link from "next/link"
import Contactos from "@/app/_components/contatos-footer"
import ServiceItem from "@/app/_components/service-item"

interface BarberShopPageProps {
  params: {
    id: string
  }
}

const BarbershopDetailPage =async ({params}: BarberShopPageProps) => {

    
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound
  }

  return (
    <div>
                {/*Div que exibe uma foto das barbearia tecnicamente um dos serviços*/}
            <div className="relative h-[250px] w-full">
                <Image
                src={barbershop?.imageUrl}
                fill
                className="object-cover"
                alt={barbershop?.name}
                />

                {/*Componente que contem os icone para voltar a home pahe e o icon menu*/}
                {/**********************************************************/}
                <div>
                <Button
                    className="absolute left-4 top-4"
                    size="icon"
                    variant="secondary"
                    asChild
                >
                    <Link href="/">
                    <ChevronLeftIcon />
                    </Link>
                </Button>
                </div>
            </div>
              {/*Div que contem o nome da barbearia o endereço*/}
      {/**********************************************************/}
            <div className="mb-3 border-b border-solid p-5">
                <h1 className="mb-6 text-xl font-bold">{barbershop?.name}</h1>

                <div className="mt-2 flex items-center gap-1">
                <MapPin className="text-primary" size={18} />
                <p className="text-sm">{barbershop?.address}</p>
                </div>

                <div className="mt-2 flex items-center gap-1">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-sm">5,0 (889 avaliaçoes)</p>
                </div>
            </div>

             {/*Descricao das barbearias*/}
      {/**********************************************************/}
      <div className="border-d space-y-4 border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="w-full text-justify text-sm">{barbershop?.description}</p>
      </div>

       {/*Div que contem os serviços e os preços do component barbershop-serive-item*/}
      {/**********************************************************/}
      
      <div className="space-y-4 border-b border-solid p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem
              service={service}
              // barbershop={barbershop}
              key={service.id}
            />
          ))}
        </div>
      </div>
      <div className="p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          contactos
        </h2>
        {barbershop.phones.map((phone) => (
          <Contactos phones={phone} key={phone} />
        ))}
      </div>
  
    </div>
  )
}

export default BarbershopDetailPage
