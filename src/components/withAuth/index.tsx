import { useCtxSuperior } from "@/context/Master"
import { useRouter } from "next/router"
import { useEffect } from "react"

function WithAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const { usuario } = useCtxSuperior()
    const router = useRouter()

    useEffect(() => {
      if (!usuario) {
        router.push("/painel/autenticacao")
      }
    }, [usuario, router])

    return usuario ? <Component {...props} /> : null
  }
}

export default WithAuth
