import BarberShopItem from "../_components/barbershop-items"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"




interface BarbershopsPageProps {
  searchParams: Promise<{ title?: string; service?: string }>;
    // searchParams: {
    //   title?: string
    //   service?: string
    // }
  }

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where: {
          OR: [
            (await searchParams)?.title
              ? {
                  name: {
                    contains: (await searchParams)?.title,
                    mode: "insensitive",
                  },
                }
              : {},
            (await searchParams).service
              ? {
                  services: {
                    some: {
                      name: {
                        contains: (await searchParams).service,
                        mode: "insensitive",
                      },
                    },
                  },
                }
              : {},
          ],
        },
      })

  return (
    <div>
    {/*********************************************************************/}
      <Header />
    {/*********************************************************************/}
      <div className="my-6 px-5">
        <Search />
      </div>
    {/*********************************************************************/}
      <div className="px-5">
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Resultado para
            <q>{(await searchParams)?.title || (await searchParams)?.service}</q>
          </h2>
          
              {/*********************************************************************/}
          <div className="grid grid-cols-2 gap-4">
            {barbershops.map((barbershop) => (
              <BarberShopItem barbershop={barbershop} key={barbershop.id} />
            ))}
          </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
