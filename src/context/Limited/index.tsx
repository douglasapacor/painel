import { FC, ReactNode, createContext, useContext } from "react"
import { ContextoLimited, limitedCtxDefault } from "./props"

const limitedCtx = createContext<ContextoLimited>(limitedCtxDefault)

export function useGlobalCtx(): ContextoLimited {
  return useContext(limitedCtx)
}

const LimitedCtxControll: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const context: ContextoLimited = {}

  return (
    <limitedCtx.Provider value={context}>{props.children}</limitedCtx.Provider>
  )
}

export default LimitedCtxControll
