import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { quickSearchOptions } from "../_service-icon-filter/search-icon"

const Filter = () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-3 p-2">
      {/*[&:: -webkit-scrollbar]:hidden mb-[0px] mt-[-10px] flex scroll-mx-0 gap-3 overflow-scroll p-5*/}
      {quickSearchOptions.map((filter) => (
        <Button
          key={filter.title}
          variant="secondary"
          className="gap-2 text-white"
          asChild
        >
          <Link href={`barbershops?services=${filter.title}`}>
            <Image
              src={filter.imageUrl}
              alt={filter.title}
              width={18}
              height={18}
            />
            {filter.title}
          </Link>
        </Button>
      ))}
    </div>
  )
}

export default Filter