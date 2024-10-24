import { Card, CardContent } from "./ui/card";

const Footer = () => {
    return ( 
        <footer>
        <Card className="p-[10px]">
               <CardContent className="p-[10px] text-center text-sm">
                    © 2024 Copyright Francisco Macedo
               </CardContent>
             </Card>
      </footer>
     );
}
 
export default Footer;