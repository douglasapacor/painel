import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import { useCookies } from "react-cookie"
import { contextoPadrao, contextoSuperior, contextoUsuario } from "./props"

const ctxSuperior = createContext<contextoPadrao>(contextoSuperior)

export function useCtxSuperior(): contextoPadrao {
  return useContext(ctxSuperior)
}

const MasterCtxControll: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const [_, setCookie, removeCookie] = useCookies(["inrcredential"])
  const [usuario, setUsuario] = useState<contextoUsuario | null>(null)
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [left, setLeft] = useState<boolean>(false)
  const [rigth, setRight] = useState<boolean>(false)

  useEffect(() => {
    const lf = localStorage.getItem("leftDrawerOpen")
    const rt = localStorage.getItem("rightDrawerOpen")
    const auth = localStorage.getItem("isAuth")
    const usuario = localStorage.getItem("contextosuperior")

    if (usuario !== null) setUsuario(JSON.parse(usuario))
    if (lf !== null) setLeft(JSON.parse(lf))
    if (rt !== null) setRight(JSON.parse(rt))
    if (auth !== null) setIsAuth(JSON.parse(auth))
  }, [])

  const login = (user: contextoUsuario) => {
    setUsuario(user)
    setIsAuth(true)
    setCookie("inrcredential", user.credential)
    localStorage.setItem("contextosuperior", JSON.stringify(user))
  }

  const logout = () => {
    setUsuario(null)
    setIsAuth(false)
    removeCookie("inrcredential")

    localStorage.removeItem("contextosuperior")
    localStorage.removeItem("leftDrawerOpen")
    localStorage.removeItem("rightDrawerOpen")

    window.location.href = "/painel/autenticacao"
  }

  const changeLeft = () => {
    setLeft(!left)
    localStorage.setItem("leftDrawerOpen", JSON.stringify(!left))
  }

  const changeRigth = () => {
    setRight(!rigth)
    localStorage.setItem("rightDrawerOpen", JSON.stringify(!rigth))
  }

  const ctx: contextoPadrao = {
    usuario,
    isAuth,
    left,
    rigth,
    login,
    logout,
    changeLeft,
    changeRigth
  }

  return (
    <ctxSuperior.Provider value={ctx}>{props.children}</ctxSuperior.Provider>
  )
}

export default MasterCtxControll
