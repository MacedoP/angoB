
// "use client";
// import { Smartphone } from "lucide-react";
// import { Button } from "./ui/button";
// import { toast } from "sonner";


// interface NumberContactProps{
//     phones: string
// }

// const Contactos = ({phones}: NumberContactProps) => {

//     const handleCopyPhoneClick = ()=>{
//         navigator.clipboard.writeText(phones);
//         toast.success("Telefone copiado com sucesso");

//     }
//     return ( 
//         <div className="p-3  flex justify-between items-center">
//             <div className="flex gap-2">
//                 <Smartphone/>
//                 <p>{phones}</p>

//             </div>

//             {/*Button para copiar os contantos*/}
//             <div className="">
//                 <Button 
//                     variant="secondary" 
//                     size="sm"
//                     onClick={handleCopyPhoneClick}
//                 >Copiar
            
//                 </Button>

//             </div>
          
            

//         </div>
//      );
// }
 
// export default Contactos;
