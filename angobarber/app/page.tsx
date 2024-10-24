import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Banner from "./_components/banner"

const Hpme = () => {
  return (
    <div>
      {/***************** HEADER ********************/}
      <Header />

      {/******************** Message Abaixo do Header *****************/}
      <div className="p-5">
        <h1 className="text-xl font-bold">Ola , Macedo</h1>
        <p>Segunda-feira, 08 de agosto</p>

        {/******************* Input De Pesquisa ********************/}
        <div className="flex items-center justify-between gap-2 mt-6">
          <Input placeholder="Faca sua pesquica..." />

          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/********************** BANNER NA HOME PAHE ******************/}
        <div className="relative mt-6">
           <Banner/>
        </div>
        
      </div>


    </div>
  )
}

export default Hpme
