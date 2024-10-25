import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

import { Card, CardContent } from "./ui/card"

const Agendamento = () => {
  return (
    <div className="mt-[-10px]">

      <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">Agendamentos</h2>

        <Card>

            <CardContent className="flex justify-between p-0">
              
            {/*Div a esquerda*/}
            <div className="flex flex-col gap-2 py-5 pl-4">
                <Badge className="w-fit">Confirmado</Badge>
                <h3 className="font-bold">Corte de Cabelo</h3>

                <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src="/banner04.jpg"  />
                </Avatar>
                <p className="text-sm">Barbearia Lumi Fino</p>
                </div>
            </div>

            {/*Div a direita*/}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm">Dezembro</p>
                <p className="text-2xl">12</p>
                <p className="tex-sm">20:00</p>
            </div>
            
            </CardContent>

        </Card>
    </div>
  )
}

export default Agendamento