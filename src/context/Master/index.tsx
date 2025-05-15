import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import { useCookies } from "react-cookie"
import { ctxUser, defaultCtx, masterCtxDefault } from "./props"

const MasterCtx = createContext<defaultCtx>(masterCtxDefault)

export function useContextMaster(): defaultCtx {
  return useContext(MasterCtx)
}

const MasterCtxControll: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const [data, setData] = useState<ctxUser | null>(null)
  const [left, setLeft] = useState<boolean>(false)
  const [rigth, setRight] = useState<boolean>(false)
  const [cookies, setCookie, removeCookie] = useCookies(["inr-credencial"])

  useEffect(() => {
    // const storedUser = localStorage.getItem("masterUserData")
    // if (storedUser) {
    //   const parsedUser = JSON.parse(storedUser)
    //   setData(parsedUser)
    //   setCookie("inr-credencial", parsedUser.credential, { path: "/painel" })
    // } else if (!cookies) {
    //   window.location.href = "/painel/autenticacao"
    // }
    // const lfState = localStorage.getItem("lfDrawerState")
    // if (lfState) setLeft(JSON.parse(lfState))
    // const rtState = localStorage.getItem("rtDrawerState")
    // if (rtState) setRight(JSON.parse(rtState))
  }, [])

  const login = (user: ctxUser) => {
    setData(user)
    localStorage.setItem("masterUserData", JSON.stringify(user))
    setCookie("inr-credencial", user.credential, { path: "/painel" })
  }

  const logout = () => {
    setData(null)
    localStorage.removeItem("masterUserData")
    localStorage.removeItem("lfDrawerState")
    localStorage.removeItem("rtDrawerState")
    removeCookie("inr-credencial")
    window.location.href = "/painel/autenticacao"
  }

  const changeLeft = () => {
    setLeft(!left)
    localStorage.setItem("lfDrawerState", JSON.stringify(!left))
  }

  const changeRigth = () => {
    setRight(!rigth)
    localStorage.setItem("rtDrawerState", JSON.stringify(!rigth))
  }

  const ctx: defaultCtx = {
    data,
    left,
    rigth,
    login,
    logout,
    changeLeft,
    changeRigth
  }

  return <MasterCtx.Provider value={ctx}>{props.children}</MasterCtx.Provider>
}

export default MasterCtxControll
