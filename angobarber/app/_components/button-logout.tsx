import { LogInIcon } from "lucide-react"
import { Button } from "./ui/button"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const ButtonOut = () => {
  const { data } = useSession()

  const handleSignOut = async () => signOut()
  return (
    <div className="mb-4 flex w-full justify-start gap-2 border-b border-solid py-5">
      {data?.user && (
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="justify-start"
          asChild
        >
          <Link href="/">
            <LogInIcon size={18} className="gap-2" />
            Sair da Conta
          </Link>
        </Button>
      )}
    </div>
  )
}

export default ButtonOut
