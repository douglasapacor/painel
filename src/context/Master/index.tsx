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
  const [_, setCookie, removeCookie] = useCookies(["credential"])
  const [usuario, setUsuario] = useState<contextoUsuario | null>(null)
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [left, setLeft] = useState<boolean>(false)
  const [rigth, setRight] = useState<boolean>(false)

  useEffect(() => {
    const lf = localStorage.getItem("leftDrawerOpen")
    const rt = localStorage.getItem("rightDrawerOpen")
    const auth = localStorage.getItem("isAuth")
    const usr = localStorage.getItem("contextosuperior")

    if (lf !== null) setLeft(JSON.parse(lf))
    if (rt !== null) setRight(JSON.parse(rt))
    if (auth !== null) setIsAuth(JSON.parse(auth))
    if (usr !== null) {
      setUsuario(JSON.parse(usr))
    }
  }, [])

  const login = (user: contextoUsuario) => {
    setUsuario(user)
    setIsAuth(true)
    setCookie("credential", user.credencial)
    localStorage.setItem("contextosuperior", JSON.stringify(user))
    localStorage.setItem("isAuth", "true")
  }

  const logout = () => {
    setUsuario(null)
    setIsAuth(false)
    removeCookie("credential")
    localStorage.removeItem("contextosuperior")
    localStorage.removeItem("leftDrawerOpen")
    localStorage.removeItem("rightDrawerOpen")
    localStorage.removeItem("isAuth")
    window.location.href = "/autenticacao"
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
