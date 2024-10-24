
import { Barbershop } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { StarIcon} from "lucide-react"
import Link from "next/link"

interface BarberShopItemProps {
  barbershop: Barbershop
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  return (
    <Card className="min-w-[167px] ">{/*Para deixar responsivo teremos que remover esta medida fixa*/}
      <CardContent className="p-0 px-1 pt-1 ">

        {/*Fotos das barbearia*/}
        <div className="servei_img relative h-[159px] w-full container_img ">
          <Image
            fill
            className="barber_img object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />

          <Badge className="absolute top-2 left-2 z-50 space-x-1" variant="secondary">
            <StarIcon size={12} className="fill-primary text-primary"/>
            <p className="text-xs font-semibold ">5,0</p>
          </Badge>

        </div>

        {/*Div contendo os nomes das nossas barbearias*/}
        <div className=" py-3 px-1">

          <h3 className="truncate font-semibold mt-2 mb-2">{barbershop.name}</h3>
          <p className="text-sm text-gray-400 truncate mt-2 mb-2">{barbershop.address}</p>

          <Button variant="secondary" className="w-full" asChild>
            <Link href={`/barbershop/${barbershop.id}`} >Reservar</Link>
          </Button>

        </div>

      </CardContent>
    </Card>
  )
}

export default BarberShopItem
