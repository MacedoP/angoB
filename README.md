# angoB
## Server actions
### Definição: Uma Server Action é uma função definida dentro de um componente de página ou layout e marcada para rodar no servidor.

* Exemplo de uma Server actions usado para pegar as datas no nosso banco de dado

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
        lte: endOfDay(date), [lte => less then]
        gte: startOfDay(date),[gte => great then]
      },
    },
  })
}

* Execução no Servidor: Por serem executadas no servidor, as Server Actions podem acessar diretamente o banco de dados, variáveis de ambiente e realizar qualquer lógica server-side.
* Chamada: Elas podem ser chamadas diretamente no React, como se fossem funções normais. Mas, ao serem invocadas, a execução realmente ocorre no servidor.

## revalidatePath("/bookings")
