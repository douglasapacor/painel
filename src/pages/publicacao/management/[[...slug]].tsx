import { PanelFrame } from "@/components"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const publicacaoManagement: NextPage = props => {
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  return (
    <PanelFrame
      alerMessage={alerMessage}
      showAlert={showAlert}
      title="Publicações"
      locals={[
        {
          href: "/painel/inicio",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/painel/publicacao",
          iconName: "podcasts",
          text: "Publicações"
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
    ></PanelFrame>
  )
}

export default publicacaoManagement
