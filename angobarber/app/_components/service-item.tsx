import { Barbershop, BarbershopService } from "@prisma/client";

interface ServiceItemProps {
    service: BarbershopService
    barbershop:Pick< Barbershop, 'name'>
  }

  
const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    return ( 
        <div>

        </div>
     );
}
 
export default ServiceItem;