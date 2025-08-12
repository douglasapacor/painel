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
  const [left, setLeft] = useState<boolean>(false)
  const [rigth, setRight] = useState<boolean>(false)

  useEffect(() => {
    const lf = localStorage.getItem("leftDrawerOpen")
    const rt = localStorage.getItem("rightDrawerOpen")
    const usr = localStorage.getItem("contextosuperior")
    if (lf !== null) setLeft(JSON.parse(lf))
    if (rt !== null) setRight(JSON.parse(rt))
    if (usr !== null) setUsuario(JSON.parse(usr))
  }, [])

  const login = (user: contextoUsuario) => {
    setUsuario(user)
    setCookie("credential", user.credencial)
    localStorage.setItem("contextosuperior", JSON.stringify(user))
  }

  const logout = () => {
    setUsuario(null)
    removeCookie("credential")

    localStorage.removeItem("contextosuperior")
    localStorage.removeItem("leftDrawerOpen")
    localStorage.removeItem("rightDrawerOpen")

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
