
import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";


const ButtonOut = () => {

    const handleSignOut = async () => signOut()
    return ( 
        <div className="flex justify-start gap-2 border-b border-solid  mb-4 py-5 w-full">
            <Button variant="ghost" onClick={handleSignOut}>
                <LogInIcon size={18} className="gap-2"/>
                Sair da Conta
            </Button>

        </div>
     );
}
 
export default ButtonOut;
