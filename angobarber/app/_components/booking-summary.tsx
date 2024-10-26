import { Barbershop, BarbershopService } from "@prisma/client";
import { Card, CardContent } from "./ui/card";


interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, "name">
  }

const BookingSummary = ({ service, barbershop }: ServiceItemProps) => {
    return ( 
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
     );
}
 
export default ;