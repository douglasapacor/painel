import { useCtxSuperior } from "@/context/Master"
import { useRouter } from "next/router"
import { useEffect } from "react"

function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const { isAuth } = useCtxSuperior()
    const router = useRouter()

    useEffect(() => {
      if (!isAuth) {
        router.push("/painel/autenticacao")
      }
    }, [isAuth, router])

    return isAuth ? <Component {...props} /> : null
  }
}

export default withAuth
