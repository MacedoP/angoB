import { BarbershopService } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"

interface ServiceItemProps {
  service: BarbershopService
  // barbershop:Pick< Barbershop, 'name'>
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
  <>
     <Card className="border-b border-solid overflow-x-auto">
     <CardContent className="flex w-full gap-3 p-3 overflow-x-auto">

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
        <div  className="w-full space-y-3">
            <h2 className="font-semibold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "AOA",
                }).format(Number(service.price))}
              </p>

              <Button variant="secondary" size="sm">
                Reversar
              </Button>
          </div>

        </div>
      {/***************************************************************/}

      </CardContent>
    </Card>
  </>
  )
}

export default ServiceItem
