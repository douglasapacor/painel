//#region imports
import Editor from "@/components/Editor"
import PanelFrame from "@/components/PanelFrame"
import { useCtxSuperior } from "@/context/Master"
import sanitize from "@/lib/sanitize"
import Provider from "@/provider"
import management, {
  boletimManagementType
} from "@/serverside/boletim/management"
import { serversideReponse } from "@/serverside/core/serversideResponse"
import {
  ArrowBack,
  ArrowDownward,
  ArrowUpward,
  CalendarMonth,
  Check,
  Delete,
  ExpandMore,
  Publish,
  Save,
  Visibility
} from "@mui/icons-material"
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Modal,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography
} from "@mui/material"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DatePicker,
  LocalizationProvider
} from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import he from "he"
import parse from "html-react-parser"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
//#endregion imports

//#region getServersideProps
export const getServerSideProps: GetServerSideProps<
  serversideReponse<boletimManagementType>
> = async context => {
  return management(context)
}
//#endregion getServersideProps

//#region local-types
type thisList = {
  id?: number
  titulo?: string
  datacad?: string
  idato?: number
  tipo?: string
  ano?: number
}

type conteudo = {
  conteudo_tipo_id: number
  items: {
    id: number | null
    identificador: number
    titulo: string
    url: string
  }[]
}

const sessionNames = [
  "Notícias",
  "Jurisprudências",
  "Legislação",
  "Opiniões",
  "Perguntas e Respotas",
  "Mensagens dos Editores",
  "Pareceres CGJ SP",
  "Suplementos da Consultoria INR",
  "Historias",
  "Cursos",
  "Classificadores SP",
  "Classificadores SP",
  "Classificadores SP",
  "Classificadores SP",
  "Classificadores PR",
  "Classificadores PR",
  "Classificadores PR",
  "Classificadores RS",
  "Classificadores RS",
  "Classificadores RS",
  "Notícias",
  "Jurisprudências",
  "Legislação",
  "Opiniões",
  "Perguntas e Respotas",
  "Mensagens dos Editores",
  "Pareceres CGJ SP",
  "Suplementos da Consultoria INR",
  "Historias",
  "Cursos",
  "Notícias",
  "Jurisprudências",
  "Legislação",
  "Opiniões",
  "Perguntas e Respotas",
  "Mensagens dos Editores",
  "Pareceres CGJ SP",
  "Suplementos da Consultoria INR",
  "Historias",
  "Cursos"
]

const linkNames = [
  "boletim/noticia", // 0
  "boletim/jurisprudencia", // 1
  "boletim/legislacao", // 2
  "boletim/opiniao", // 3
  "boletim/pergunta-e-resposta",
  "boletim/mensagem-editores",
  "boletim/pareceresCGJ",
  "boletim/suplemento",
  "boletim/historia",
  "servicos/INRcursos",
  "boletim/ato-anterior",
  "boletim/classificadorINR-SP",
  "boletim/classificadorINR-SP",
  "boletim/classificadorINR-SP",
  "boletim/classificadorINR-PR",
  "boletim/classificadorINR-PR",
  "boletim/classificadorINR-PR",
  "boletim/classificadorINR-RS",
  "boletim/classificadorINR-RS",
  "boletim/classificadorINR-RS",
  "boletim/noticia",
  "boletim/jurisprudencia",
  "boletim/legislacao",
  "boletim/opiniao",
  "boletim/pergunta-e-resposta",
  "boletim/mensagem-editores",
  "boletim/pareceresCGJ",
  "boletim/suplemento",
  "boletim/historia",
  "servicos/INRcursos",
  "boletim/noticia",
  "boletim/jurisprudencia",
  "boletim/legislacao",
  "boletim/opiniao",
  "boletim/pergunta-e-resposta",
  "boletim/mensagem-editores",
  "boletim/pareceresCGJ",
  "boletim/suplemento",
  "boletim/historia",
  "servicos/INRcursos"
]
//#endregion local-types

const Novo: NextPage<serversideReponse<boletimManagementType>> = props => {
  //#region states
  const [alerMessage, setAlerMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [id, setId] = useState<number | null>(props.data.id || null)
  const [boletimTipo, setBoletimTipo] = useState<number | "">(
    props.data.boletim_tipo_id ?? ""
  )
  const [boltimData, setBoletimData] = useState<dayjs.Dayjs | null>(
    dayjs(props.data.data) || null
  )
  const [conteudotipo, setConteudotipo] = useState<number | "">("")
  const [conteudotipoLista, setConteudotipoLista] = useState<
    { id: number; nome: string }[]
  >(props.data.conteudotipoLista || [])
  const [titulo, setTitulo] = useState<string>(props.data.titulo ?? "")
  const [conteudoItems, setConteudoItems] = useState<conteudo[]>(
    props.data.conteudo ?? []
  )
  const [needSaveBe, setNeedSaveBe] = useState(props.data.needSaveBe)
  const [needSaveContent, setNeedSaveContent] = useState(
    props.data.needSaveContent
  )
  const [needSaveObservacao, setNeedSaveObservacao] = useState(
    props.data.needSaveObservacao
  )
  const [observacaoText, setObservacaoText] = useState(
    props.data.observacao ?? ""
  )
  const [showAcumuladoData, setShowAcumuladoData] = useState(false)
  const [showDeleteBoletim, setShowDeleteBoletim] = useState(false)

  //#region states:-details
  const [criadopor] = useState<string>(
    props.metadata.detalhes.criacao?.nome || ""
  )
  const [criadoem] = useState<string>(
    props.metadata.detalhes.criacao?.data.toString() || ""
  )

  const [editadopor, setEditadopor] = useState<string>(
    props.metadata.detalhes.edicao?.nome || ""
  )
  const [editadoem, setEditadoem] = useState<string>(
    props.metadata.detalhes.edicao?.data.toString() || ""
  )

  const [aprovado, setAprovado] = useState<string>(props.data.aprovado || "N")
  const [aprovadopor, setAprovadopor] = useState<string>(
    props.data.aprovado_nome || ""
  )
  const [aprovadoem, setAprovadoem] = useState<string>(
    props.data.aprovado_em?.toString() || ""
  )

  const [publicado, setPublicado] = useState<string>(
    props.data.publicado || "N"
  )
  const [publicadopor, setPublicadopor] = useState<string>(
    props.data.publicado_nome || ""
  )
  const [publicadoem, setPublicadoem] = useState<string>(
    props.data.publicado_em?.toString() || ""
  )
  //#endregion states:-details

  //#region states:-select pagination
  const [pagina, setPagina] = useState(0)
  const [selectLoading, setSelectLoading] = useState(true)
  const [list, setList] = useState<thisList[]>([])
  const menuRef = useRef<HTMLUListElement | null>(null)
  const scrollPositionRef = useRef<number>(0)
  //#endregion states:-details

  //#endregion states

  //#region statics
  const router = useRouter()
  const ctx = useCtxSuperior()
  const limite = 20
  //#endregion statics

  //#region function
  const fetchItems = async () => {
    try {
      if (!conteudotipo) {
        console.warn(`conteudoTipo não definido`)
        return
      }

      if (conteudotipo === 13) {
        setList([
          {
            id: 0,
            titulo: `${boltimData?.format(
              "DD/MM/YYYY"
            )} – Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado de São Paulo na data de hoje.`,
            datacad: new Date().toLocaleDateString()
          }
        ])
        return
      }

      if (conteudotipo === 14) {
        setList([
          {
            id: 0,
            titulo: `${boltimData?.format(
              "DD/MM/YYYY"
            )} – Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do São Paulo.`,
            datacad: new Date().toLocaleDateString()
          }
        ])
        return
      }

      if (conteudotipo === 16) {
        setList([
          {
            id: 0,
            titulo: `${boltimData?.format(
              "DD/MM/YYYY"
            )} – Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado de Paraná na data de hoje.`,
            datacad: new Date().toLocaleDateString()
          }
        ])
        return
      }

      if (conteudotipo === 19) {
        setList([
          {
            id: 0,
            titulo: `${boltimData?.format(
              "DD/MM/YYYY"
            )} – Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado de Rio Grande do Sul na data de hoje.`,
            datacad: new Date().toLocaleDateString()
          }
        ])
        return
      }

      if (conteudotipo === 17) {
        setList([
          {
            id: 0,
            titulo: `${boltimData?.format(
              "DD/MM/YYYY"
            )} – Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Paraná.`,
            datacad: new Date().toLocaleDateString()
          }
        ])
        return
      }

      if (conteudotipo === 20) {
        setList([
          {
            id: 0,
            titulo: `${boltimData?.format(
              "DD/MM/YYYY"
            )} – Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Rio Grande do Sul.`,
            datacad: new Date().toLocaleDateString()
          }
        ])

        return
      }

      setSelectLoading(true)

      const provider = new Provider()
      const endpoints: { [key: number]: string } = {
        1: "noticia.home",
        2: "jurisprudencia.home",
        3: "legislacao.home",
        4: "opniao.home",
        5: "perguntasrespostas.home",
        6: "mensagemeditores.home",
        7: "pareceresCGJSP.home",
        8: "suplemento.home",
        9: "historia.home",
        10: "curso.home",
        11: "classificador.atoanterior",
        12: "classificador.sp",
        13: "classificador.sempubsp",
        14: "classificador.sematosp",
        15: "classificador.pr",
        16: "classificador.sempubpr",
        17: "classificador.sematopr",
        18: "classificador.rs",
        19: "classificador.sempubrs",
        20: "classificador.semators",
        21: "noticia.home",
        22: "jurisprudencia.home",
        23: "legislacao.home",
        24: "opniao.home",
        25: "perguntasrespostas.home",
        26: "mensagemeditores.home",
        27: "pareceresCGJSP.home",
        28: "suplemento.home",
        29: "historia.home",
        30: "curso.home",
        31: "noticia.home",
        32: "jurisprudencia.home",
        33: "legislacao.home",
        34: "opniao.home",
        35: "perguntasrespostas.home",
        36: "mensagemeditores.home",
        37: "pareceresCGJSP.home",
        38: "suplemento.home",
        39: "historia.home",
        40: "curso.home"
      }

      const endpoint = endpoints[conteudotipo] || ""

      if (!endpoint) {
        console.warn(`Endpoint não definido para conteudoTipo: ${conteudotipo}`)
        return
      }

      const apiResponse = await provider.call<thisList[]>(
        "api",
        endpoint,
        undefined,
        {
          pagina,
          limite: limite
        }
      )

      if (!apiResponse.success)
        throw new Error(apiResponse.message?.toString() || "Erro")

      if (apiResponse.data) {
        let filtered: any
        switch (conteudotipo) {
          case 11:
            filtered = apiResponse.data.map(item => ({
              id: item.idato,
              titulo: item.ano,
              datacad: "acumulado até"
            }))

            setList(prev => [...prev, ...(filtered as thisList[])])
            break
          case 12:
          case 15:
          case 18:
            filtered = apiResponse.data.map(item => ({
              id: item.id,
              titulo: `${item.datacad} – Clique aqui e acesse o conteúdo desta edição.`,
              datacad: item.datacad
            }))

            setList(prev => [...prev, ...(filtered as thisList[])])
            break
          default:
            setList(prev => [...prev, ...(apiResponse.data as thisList[])])
            break
        }
      }
    } catch (error: any) {
      console.error("Erro ao buscar itens:", error.message)
    } finally {
      setSelectLoading(false)
    }
  }

  const handleScroll = (event: any) => {
    const target = event.target as HTMLDivElement

    const bottom =
      Math.ceil(target.scrollHeight - target.scrollTop) <=
      target.clientHeight + 10

    if (bottom && !selectLoading) {
      scrollPositionRef.current = target.scrollTop
      setPagina(prev => prev + 1)
    }
  }

  const upConteudoItem = (conteudoTipo: number, index: number): void => {
    try {
      const tmp = [...conteudoItems]
      const targetPos = index - 1
      const sessaoPos = tmp.findIndex(
        sess => sess.conteudo_tipo_id === conteudoTipo
      )

      if (sessaoPos < 0) return
      if (targetPos < 0) return

      const contentToUp = tmp[sessaoPos].items[index]
      const contentToDown = tmp[sessaoPos].items[targetPos]

      tmp[sessaoPos].items[targetPos] = contentToUp
      tmp[sessaoPos].items[index] = contentToDown

      setConteudoItems(tmp)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
      setLoading(false)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }

  const downConteudoItem = (conteudoTipo: number, index: number): void => {
    try {
      const tmp = [...conteudoItems]
      const targetPos = index + 1
      const sessaoPos = tmp.findIndex(
        sess => sess.conteudo_tipo_id === conteudoTipo
      )

      if (sessaoPos < 0) return
      if (targetPos >= tmp[sessaoPos].items.length) return

      const contentToDown = tmp[sessaoPos].items[index]
      const contentToUp = tmp[sessaoPos].items[targetPos]

      tmp[sessaoPos].items[targetPos] = contentToDown
      tmp[sessaoPos].items[index] = contentToUp

      setConteudoItems(tmp)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
      setLoading(false)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }

  const clickIn = (content: thisList): void => {
    try {
      if (!needSaveContent) setNeedSaveContent(true)

      const tmp = [...conteudoItems]

      if (conteudotipo === "") throw new Error("Selecione tipo do boletim.")

      const linkName = linkNames[conteudotipo - 1]
      let sufix

      if (conteudotipo === 11) {
        sufix = new Date().getFullYear()
      } else if (conteudotipo >= 12 && conteudotipo <= 20) {
        sufix = "ler"
      } else {
        sufix = sanitize(
          parse(
            he.decode(content.titulo || "").replace(/<\/?p>/g, "")
          ).toString()
        ).urlFriendly()
      }

      if (tmp.length === 0) {
        if (conteudotipo === 11) {
          tmp.push({
            conteudo_tipo_id: 12,
            items: [
              {
                id: null,
                identificador: content.id || 0,
                titulo:
                  "Clique aqui e acesse o conteúdo acumulado até o dia [selecione a data].",
                url: `https://inrpublicacoes.com.br/site/${linkName}/${content.id}/${sufix}`
              }
            ]
          })

          setConteudoItems(tmp)
          return
        }

        if (conteudotipo === 13 || conteudotipo === 14) {
          tmp.push({
            conteudo_tipo_id: 12,
            items: [
              {
                id: null,
                identificador: content.id || 0,
                titulo: content.titulo || "",
                url: ":NO-URL"
              }
            ]
          })

          setConteudoItems(tmp)
          return
        }

        if (conteudotipo === 16 || conteudotipo === 17) {
          tmp.push({
            conteudo_tipo_id: 15,
            items: [
              {
                id: null,
                identificador: content.id || 0,
                titulo: content.titulo || "",
                url: ":NO-URL"
              }
            ]
          })

          setConteudoItems(tmp)
          return
        }

        if (conteudotipo === 19 || conteudotipo === 20) {
          tmp.push({
            conteudo_tipo_id: 18,
            items: [
              {
                id: null,
                identificador: content.id || 0,
                titulo: content.titulo || "",
                url: ":NO-URL"
              }
            ]
          })

          setConteudoItems(tmp)
          return
        }

        tmp.push({
          conteudo_tipo_id: conteudotipo,
          items: [
            {
              id: null,
              identificador: content.id || 0,
              titulo: content.titulo || "",
              url: `https://inrpublicacoes.com.br/site/${linkName}/${content.id}/${sufix}`
            }
          ]
        })

        setConteudoItems(tmp)
        return
      } else {
        let sessionIndex = -1

        switch (conteudotipo) {
          case 11:
          case 13:
          case 14:
            sessionIndex = tmp.findIndex(t => t.conteudo_tipo_id === 12)
            break
          case 16:
          case 17:
            sessionIndex = tmp.findIndex(t => t.conteudo_tipo_id === 15)
            break
          case 19:
          case 20:
            sessionIndex = tmp.findIndex(t => t.conteudo_tipo_id === 18)
            break
          default:
            sessionIndex = tmp.findIndex(
              t => t.conteudo_tipo_id === conteudotipo
            )
            break
        }

        if (sessionIndex < 0) {
          if (
            conteudotipo === 11 ||
            conteudotipo === 13 ||
            conteudotipo === 14
          ) {
            tmp.push({
              conteudo_tipo_id: 12,
              items: [
                {
                  id: null,
                  identificador: content.id || 0,
                  titulo: content.titulo || "",
                  url: ":NO-URL"
                }
              ]
            })

            setConteudoItems(tmp)
            return
          }

          if (conteudotipo === 16 || conteudotipo === 17) {
            tmp.push({
              conteudo_tipo_id: 15,
              items: [
                {
                  id: null,
                  identificador: content.id || 0,
                  titulo: content.titulo || "",
                  url: ":NO-URL"
                }
              ]
            })

            console.log("16, 17", conteudotipo)

            setConteudoItems(tmp)
            return
          }

          if (conteudotipo === 19 || conteudotipo === 20) {
            tmp.push({
              conteudo_tipo_id: 18,
              items: [
                {
                  id: null,
                  identificador: content.id || 0,
                  titulo: content.titulo || "",
                  url: ":NO-URL"
                }
              ]
            })

            console.log("19, 20", conteudotipo)

            setConteudoItems(tmp)
            return
          }

          tmp.push({
            conteudo_tipo_id: conteudotipo,
            items: [
              {
                id: null,
                identificador: content.id || 0,
                titulo: content.titulo || "",
                url: `https://inrpublicacoes.com.br/site/${linkName}/${content.id}/${sufix}`
              }
            ]
          })

          setConteudoItems(tmp)
          return
        } else {
          console.log(conteudotipo)

          if (
            conteudotipo === 11 ||
            conteudotipo === 13 ||
            conteudotipo === 14 ||
            conteudotipo === 16 ||
            conteudotipo === 17 ||
            conteudotipo === 19 ||
            conteudotipo === 20
          ) {
            tmp[sessionIndex].items.push({
              id: null,
              identificador: content.id || 0,
              titulo: content.titulo || "",
              url: ":NO-URL"
            })

            setConteudoItems(tmp)
            return
          }

          tmp[sessionIndex].items.push({
            id: null,
            identificador: content.id || 0,
            titulo: content.titulo || "",
            url: `https://inrpublicacoes.com.br/site/${linkName}/${content.id}/${sufix}`
          })

          setConteudoItems(tmp)
          return
        }
      }
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }

  const deleteItemInContent = (content: thisList): void => {
    if (!needSaveContent) setNeedSaveContent(true)

    const tmp = [...conteudoItems]

    const ses = tmp.findIndex(c => c.conteudo_tipo_id === conteudotipo)

    tmp[ses].items = tmp[ses].items.filter(i => i.identificador !== content.id)

    setConteudoItems(tmp)
  }

  const deleteThisItem = (conteudoTipo: number, index: number) => {
    if (!needSaveContent) setNeedSaveContent(true)

    const tmp = [...conteudoItems]
    const session = tmp.findIndex(i => i.conteudo_tipo_id === conteudoTipo)

    if (session < 0) return

    tmp[session].items = tmp[session].items.filter((_, ind) => ind !== index)

    setConteudoItems(tmp)
  }

  const deleteThisSession = (conteudoTipo: number) => {
    if (!needSaveContent) setNeedSaveContent(true)

    const newContent = conteudoItems.filter(
      t => t.conteudo_tipo_id !== conteudoTipo
    )
    setConteudoItems(newContent)
  }

  const justAdded = (identificador: number): boolean => {
    const ses = conteudoItems.findIndex(
      c => c.conteudo_tipo_id === conteudotipo
    )

    if (ses < 0) return false

    const item = conteudoItems[ses].items.findIndex(
      i => i.identificador === identificador
    )

    return item >= 0
  }

  const updateConteudo = async () => {
    try {
      if (!boletimTipo)
        throw new Error("Selecione o tipo de boletim a ser criado")

      if (!boltimData) throw new Error("Entre com a data do boletim")

      setLoading(true)

      const provider = new Provider()
      const response = await provider.call<{
        edicao: {
          editadopor: string
          editadoem: string
        }
        conteudo: conteudo[]
      }>(
        "api",
        "boletim.updateconteudo",
        { conteudo: conteudoItems },
        { idboletim: id },
        { headers: { credential: ctx.usuario?.credencial } }
      )

      if (!response.success)
        throw new Error(response.message?.toString() || "Erro")

      if (response.data) {
        setConteudoItems(response.data.conteudo)
        setEditadopor(response.data.edicao.editadopor)
        setEditadoem(response.data.edicao.editadoem)
      }

      setAprovado("N")
      setAprovadoem("")
      setAprovadopor("")
      setPublicado("N")
      setPublicadoem("")
      setPublicadopor("")

      setNeedSaveContent(false)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
      setLoading(false)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }

  const updateObservacao = async () => {
    try {
      setLoading(true)

      const provider = new Provider()
      const response = await provider.call<{
        edicao: {
          editadopor: string
          editadoem: string
        }
        conteudo: conteudo[]
      }>(
        "api",
        "boletim.updateobservacao",
        { observacao: observacaoText },
        { idboletim: id },
        { headers: { credential: ctx.usuario?.credencial } }
      )

      if (!response.success)
        throw new Error(response.message?.toString() || "Erro")

      if (response.data) {
        setEditadopor(response.data.edicao.editadopor)
        setEditadoem(response.data.edicao.editadoem)
      }

      setAprovado("N")
      setAprovadoem("")
      setAprovadopor("")
      setPublicado("N")
      setPublicadoem("")
      setPublicadopor("")

      setAlerMessage(response.message?.toString() ?? "")
      setShowAlert(true)

      setNeedSaveObservacao(false)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
      setLoading(false)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }

  const saveButtonAction = async () => {
    if (activeStep === 0) {
      try {
        if (!boletimTipo)
          throw new Error("Selecione o tipo de boletim a ser criado")

        if (!boltimData) throw new Error("Entre com a data do boletim")

        const provider = new Provider()
        const response = await provider.call<{ boletim_id: number }>(
          "api",
          "boletim.salvar",
          { boletim_tipo_id: boletimTipo, data: boltimData },
          undefined,
          { headers: { credential: ctx.usuario?.credencial } }
        )

        if (!response.success)
          throw new Error(response.message?.toString() || "Erro")

        setAprovado("N")
        setAprovadoem("")
        setAprovadopor("")
        setPublicado("N")
        setPublicadoem("")
        setPublicadopor("")
        setNeedSaveBe(false)
        setId(response.data?.boletim_id ?? null)
        router.push(`/boletim/${response.data?.boletim_id}`)
        setActiveStep(1)
      } catch (error: any) {
        setAlerMessage(error.message)
        setShowAlert(true)
        setLoading(false)
      } finally {
        setLoading(false)
        setTimeout(() => {
          setShowAlert(false)
        }, 6000)
      }
    }

    if (activeStep === 1) {
      await updateConteudo()
      setActiveStep(2)
    }

    if (activeStep === 2) {
      await updateObservacao()
      setActiveStep(3)
    }
  }

  const publishThis = async () => {
    try {
      setLoading(true)

      const provider = new Provider()
      const response = await provider.call<{
        publicado: "N" | "S"
        publicadoPor: string
        publicadoEm: string
      }>(
        "api",
        "boletim.publicarboletim",
        undefined,
        { idboletim: id },
        { headers: { credential: ctx.usuario?.credencial } }
      )

      if (!response.success) throw new Error(response.message?.toString() || "")

      setPublicado(response.data?.publicado || "")
      setPublicadoem(response.data?.publicadoEm || "")
      setPublicadopor(response.data?.publicadoPor || "")

      setLoading(false)

      setAlerMessage(response.message?.toString() || "")
      setShowAlert(true)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
      setLoading(false)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }

  const aproveThis = async () => {
    try {
      setLoading(true)
      const provider = new Provider()
      const response = await provider.call<{
        aprovado: "N" | "S"
        aprovadoPor: string
        aprovadoEm: string
      }>(
        "api",
        "boletim.aprovarboletim",
        undefined,
        { idboletim: id },
        { headers: { credential: ctx.usuario?.credencial } }
      )

      if (!response.success) throw new Error(response.message?.toString() || "")

      setAprovado(response.data?.aprovado || "")
      setAprovadoem(response.data?.aprovadoEm || "")
      setAprovadopor(response.data?.aprovadoPor || "")

      setLoading(false)

      setAlerMessage(response.message?.toString() || "")
      setShowAlert(true)
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
      setLoading(false)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }

  const deleteBoletim = async () => {
    try {
      setLoading(true)

      const provider = new Provider()
      const response = await provider.call(
        "api",
        "boletim.deleteboletim",
        undefined,
        { idboletim: id },
        { headers: { credential: ctx.usuario?.credencial } }
      )

      if (!response.success) throw new Error(response.message?.toString() || "")

      router.push("/boletim?msg=1")
    } catch (error: any) {
      setAlerMessage(error.message)
      setShowAlert(true)
      setLoading(false)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }
  //#endregion function

  //#region effects
  useEffect(() => {
    if (conteudotipo) {
      setList([])
      setPagina(0)
      fetchItems()
    }
  }, [conteudotipo])

  useEffect(() => {
    fetchItems()
  }, [pagina])

  useEffect(() => {
    if (menuRef.current && !loading) {
      menuRef.current.scrollTop = scrollPositionRef.current
    }
  }, [list, selectLoading])
  //#endregion effects

  return (
    <PanelFrame
      dense
      alerMessage={alerMessage}
      showAlert={showAlert}
      title={`Novo boletim eletrônico`}
      loading={loading}
      locals={[
        {
          href: "/",
          iconName: "home",
          text: "Home"
        },
        {
          href: "/boletim",
          iconName: "newspaper",
          text: "Boletim eletrônico"
        },
        {
          href: props.metadata.url ?? "",
          iconName: props.metadata.icone ?? "",
          text: props.metadata.nome ?? ""
        }
      ]}
      closeAlert={() => {
        setShowAlert(false)
      }}
      outsideContent={
        <Paper sx={{ p: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <Tooltip title="Voltar">
                <IconButton
                  color="warning"
                  onClick={() => {
                    router.push("/boletim")
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Tooltip title="Anterior">
                      <IconButton
                        disabled={activeStep === 0}
                        onClick={() => {
                          setActiveStep(actualValue => actualValue - 1)
                        }}
                      >
                        <ArrowLeftIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    {publicado === "N" && (
                      <Tooltip title="Salvar">
                        <IconButton onClick={saveButtonAction}>
                          <Save color="info" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    {aprovado === "N" && publicado === "N" && (
                      <Tooltip title="Aprovar">
                        <IconButton onClick={aproveThis}>
                          <Check color="success" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    {publicado === "N" && (
                      <Tooltip title="Publicar">
                        <IconButton onClick={publishThis}>
                          <Publish />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    {publicado === "N" && id && (
                      <Tooltip title="Excluir">
                        <IconButton
                          onClick={() => {
                            setShowDeleteBoletim(true)
                          }}
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Tooltip title="Próximo">
                      <IconButton
                        disabled={activeStep === 3}
                        onClick={() => {
                          if (activeStep === 0 && needSaveBe) {
                            setAlerMessage("Salve antes de seguir adiante.")
                            setShowAlert(true)
                            setTimeout(() => {
                              setShowAlert(false)
                            }, 4000)

                            return
                          }

                          if (activeStep === 1 && needSaveContent) {
                            setAlerMessage("Salve antes de seguir adiante.")
                            setShowAlert(true)
                            setTimeout(() => {
                              setShowAlert(false)
                            }, 4000)

                            return
                          }

                          if (activeStep === 2 && needSaveObservacao) {
                            setAlerMessage("Salve antes de seguir adiante")
                            setShowAlert(true)
                            setTimeout(() => {
                              setShowAlert(false)
                            }, 4000)
                            return
                          }

                          setActiveStep(actualValue => actualValue + 1)
                        }}
                      >
                        <ArrowRightIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stepper activeStep={activeStep}>
                  <Step>
                    <StepLabel>Criação do Boletim</StepLabel>
                  </Step>

                  <Step>
                    <StepLabel>Conteúdo do boletim</StepLabel>
                  </Step>

                  <Step>
                    <StepLabel
                      optional={
                        <Typography variant="caption">Opcional</Typography>
                      }
                    >
                      Observações
                    </StepLabel>
                  </Step>

                  <Step>
                    <StepLabel>Resumo</StepLabel>
                  </Step>
                </Stepper>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    position: "relative"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      transform: `translateX(-${activeStep * 100}%`,
                      transition: "transform 0.5s ease-in-out"
                    }}
                  >
                    {/* step 0 */}
                    <Box sx={{ minWidth: "100%", padding: 1 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <FormControl fullWidth>
                            <InputLabel htmlFor="tipoBoletim">
                              Tipo de boletim
                            </InputLabel>

                            <Select
                              disabled={props.data.boletimTipoDisabled}
                              id="tipoBoletim"
                              label="Tipo de boletim"
                              value={boletimTipo}
                              onChange={async e => {
                                setNeedSaveBe(true)

                                setBoletimTipo(
                                  e.target.value ? +e.target.value : ""
                                )

                                const provider = new Provider()
                                const conttipolista = await provider.call<
                                  { id: number; nome: string }[]
                                >(
                                  "api",
                                  "boletim.conteudotipo",
                                  undefined,
                                  {
                                    idtipoboletim: e.target.value
                                      ? +e.target.value
                                      : null
                                  },
                                  {
                                    headers: {
                                      credential: ctx.usuario?.credencial
                                    }
                                  }
                                )

                                if (conttipolista.success) {
                                  setConteudotipoLista(conttipolista.data || [])
                                }
                              }}
                            >
                              <MenuItem
                                key={`recurso-tipo-${0}-id-${0}`}
                                value=""
                              >
                                Selecione
                              </MenuItem>

                              {props.data.tipoLista &&
                                props.data.tipoLista.map(
                                  (boletimTipo, i: any) => (
                                    <MenuItem
                                      key={`recurso-tipo-${i}-id-${boletimTipo.id}`}
                                      value={boletimTipo.id}
                                    >
                                      {boletimTipo.nome}
                                    </MenuItem>
                                  )
                                )}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="pt-br"
                          >
                            <DatePicker
                              disabled={props.data.boletimDataDisabled}
                              sx={{ width: "100%" }}
                              value={dayjs(boltimData)}
                              onChange={e => {
                                setNeedSaveBe(true)
                                setBoletimData(e)
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Typography variant="body1">Detalhes</Typography>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  border: `1px solid ${
                                    !criadopor
                                      ? "#BDBDBD"
                                      : "rgba(0, 0, 0, 0.87)"
                                  }`,
                                  borderRadius: "3px",
                                  padding: 10
                                }}
                              >
                                <Grid container>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: !criadopor
                                          ? "#BDBDBD"
                                          : "rgba(0, 0, 0, 0.87)"
                                      }}
                                    >
                                      <strong>criação:</strong>
                                    </Typography>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: !criadopor
                                          ? "#BDBDBD"
                                          : "rgba(0, 0, 0, 0.87)"
                                      }}
                                    >
                                      {!criadopor
                                        ? `-------- -------- | --/--/---- --:--`
                                        : `${criadopor} | ${
                                            criadoem
                                              ? new Date(
                                                  criadoem
                                                ).toLocaleDateString()
                                              : ""
                                          } ${
                                            criadoem
                                              ? new Date(
                                                  criadoem
                                                ).toLocaleTimeString()
                                              : ""
                                          }`}
                                    </Typography>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Box
                                      sx={{
                                        width: "100%",
                                        paddingTop: "10px",
                                        paddingBottom: "10px"
                                      }}
                                    >
                                      <Divider />
                                    </Box>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: !editadopor
                                          ? "#BDBDBD"
                                          : "rgba(0, 0, 0, 0.87)"
                                      }}
                                    >
                                      <strong>alteração:</strong>
                                    </Typography>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: !editadopor
                                          ? "#BDBDBD"
                                          : "rgba(0, 0, 0, 0.87)"
                                      }}
                                    >
                                      {!editadopor
                                        ? `-------- -------- | --/--/---- --:--`
                                        : `${editadopor} | ${
                                            editadoem
                                              ? `${new Date(
                                                  editadoem
                                                ).toLocaleDateString()} ${new Date(
                                                  editadoem
                                                ).toLocaleTimeString()}`
                                              : ""
                                          }`}
                                    </Typography>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Box
                                      sx={{
                                        width: "100%",
                                        paddingTop: "10px",
                                        paddingBottom: "10px"
                                      }}
                                    >
                                      <Divider />
                                    </Box>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: !aprovadopor
                                          ? "#BDBDBD"
                                          : "rgba(0, 0, 0, 0.87)"
                                      }}
                                    >
                                      <strong>aprovação:</strong>
                                    </Typography>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: !aprovadopor
                                          ? "#BDBDBD"
                                          : "rgba(0, 0, 0, 0.87)"
                                      }}
                                    >
                                      {!aprovadopor
                                        ? `-------- -------- | --/--/---- --:--`
                                        : `${aprovadopor} | ${
                                            aprovadoem
                                              ? `${new Date(
                                                  aprovadoem
                                                ).toLocaleDateString()} ${new Date(
                                                  aprovadoem
                                                ).toLocaleTimeString()}`
                                              : ""
                                          }`}
                                    </Typography>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Box
                                      sx={{
                                        width: "100%",
                                        paddingTop: "10px",
                                        paddingBottom: "10px"
                                      }}
                                    >
                                      <Divider />
                                    </Box>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: !publicadopor
                                          ? "#BDBDBD"
                                          : "rgba(0, 0, 0, 0.87)"
                                      }}
                                    >
                                      <strong>publicação:</strong>
                                    </Typography>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: !publicadopor
                                          ? "#BDBDBD"
                                          : "rgba(0, 0, 0, 0.87)"
                                      }}
                                    >
                                      {!publicadopor
                                        ? `-------- -------- | --/--/---- --:--`
                                        : `${publicadopor} | ${
                                            publicadoem
                                              ? `${new Date(
                                                  publicadoem
                                                ).toLocaleDateString()} ${new Date(
                                                  publicadoem
                                                ).toLocaleTimeString()}`
                                              : ""
                                          }`}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* step 1 */}
                    <Box sx={{ minWidth: "100%", padding: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="h6">{titulo}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                              <FormControl fullWidth>
                                <InputLabel htmlFor="tipoConteudo">
                                  Tipo de Conteúdo
                                </InputLabel>

                                <Select
                                  disabled={
                                    props.data.publicado &&
                                    props.data.publicado === "S"
                                      ? true
                                      : false
                                  }
                                  id="tipoConteudo"
                                  label="Tipo de Conteúdo"
                                  value={conteudotipo}
                                  onChange={e => {
                                    setConteudotipo(
                                      e.target.value ? +e.target.value : ""
                                    )
                                  }}
                                >
                                  <MenuItem>Selecione</MenuItem>

                                  {conteudotipoLista.map((item, index) => (
                                    <MenuItem
                                      key={`conteudo-tipo-item-${index}-item-${item.id}`}
                                      value={item.id}
                                    >
                                      {item.nome}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                              <FormControl fullWidth>
                                <InputLabel
                                  htmlFor="ContentBoletimSelect"
                                  id="ContentBoletimLabel"
                                >
                                  Contéudo
                                </InputLabel>
                                <Select
                                  disabled={
                                    props.data.publicado &&
                                    props.data.publicado === "S"
                                      ? true
                                      : false
                                  }
                                  id="ContentBoletimSelect"
                                  label="Contéudo"
                                  labelId="ContentBoletimLabel"
                                  multiple
                                  value={[]}
                                  MenuProps={{
                                    PaperProps: {
                                      style: { maxHeight: 300 },
                                      onClick: (e: any) => {
                                        e.preventDefault()
                                      },
                                      onScroll: (event: any) => {
                                        handleScroll(event)

                                        if (
                                          event.target instanceof HTMLDivElement
                                        ) {
                                          scrollPositionRef.current =
                                            event.target.scrollTop
                                        }
                                      }
                                    },
                                    classes: {
                                      list: `content-list-indentification`
                                    },
                                    MenuListProps: {
                                      ref: menuRef
                                    }
                                  }}
                                >
                                  {!selectLoading && (
                                    <MenuItem value="" disabled>
                                      Selecione uma opção
                                    </MenuItem>
                                  )}

                                  {selectLoading ? (
                                    <MenuItem disabled>
                                      <Box
                                        sx={{
                                          width: "100%",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center"
                                        }}
                                      >
                                        Aguarde...
                                        <CircularProgress
                                          sx={{ marginLeft: "26px" }}
                                          size={16}
                                        />
                                      </Box>
                                    </MenuItem>
                                  ) : (
                                    list.map((item: any, key: number) => (
                                      <MenuItem
                                        key={`${item.id}-index-${key}`}
                                        value={item.id}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignContent: "center",
                                            alignItems: "center"
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              width: "94%",
                                              display: "flex",
                                              flexDirection: "row",
                                              alignContent: "center",
                                              alignItems: "center"
                                            }}
                                          >
                                            {item.titulo.length > 90
                                              ? `[${
                                                  item.datacad
                                                }] | ${item.titulo.slice(
                                                  0,
                                                  90
                                                )}...`
                                              : `[${item.datacad}] | ${item.titulo}`}
                                          </Box>

                                          <Box
                                            sx={{
                                              width: "6%",
                                              display: "flex",
                                              flexDirection: "row",
                                              alignContent: "center",
                                              alignItems: "center",
                                              justifyContent: "center"
                                            }}
                                          >
                                            {justAdded(item.id) ? (
                                              <IconButton
                                                color="error"
                                                sx={{
                                                  width: "20px",
                                                  height: "20px"
                                                }}
                                                onClick={e => {
                                                  deleteItemInContent(item)
                                                }}
                                              >
                                                <Icon fontSize="inherit">
                                                  close
                                                </Icon>
                                              </IconButton>
                                            ) : (
                                              <IconButton
                                                color="success"
                                                sx={{
                                                  width: "20px",
                                                  height: "20px"
                                                }}
                                                onClick={e => {
                                                  clickIn(item)
                                                }}
                                              >
                                                <Icon fontSize="inherit">
                                                  check
                                                </Icon>
                                              </IconButton>
                                            )}
                                          </Box>
                                        </Box>
                                      </MenuItem>
                                    ))
                                  )}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="body1">
                            Conteúdo do boletim
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Box
                            sx={{
                              with: "100%",
                              p: 1,
                              border: "0.5px dashed #000",
                              height: "400px",
                              flexFlow: "wrap",
                              overflowY: "scroll"
                            }}
                          >
                            {conteudoItems.map((item, ci) => (
                              <Accordion
                                key={`content-index-${ci}-${item.conteudo_tipo_id}`}
                                sx={{
                                  bgcolor: "#E0E0E0",
                                  border: "0.5px solid #0b397fff",
                                  mb: 0.5
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <ExpandMore sx={{ color: "white" }} />
                                  }
                                  aria-controls={`panel${ci + 1}-content`}
                                  id={`panel${ci + 1}-header`}
                                  sx={{
                                    backgroundColor: "#0D47A1"
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      p: 1,
                                      color: "white"
                                    }}
                                  >
                                    {`${
                                      sessionNames[item.conteudo_tipo_id - 1]
                                    } - ${item.items.length}`}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <List dense>
                                    {item.items.map((conteudoItem, cii) => (
                                      <ListItem
                                        sx={{ marginBottom: "1px" }}
                                        key={`item-conteudo-${conteudoItem.identificador}-${conteudoItem.id}-${cii}`}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "left",
                                            alignItems: "center",
                                            border: "0.5px solid #424242",
                                            paddingLeft: "10px",
                                            paddingRight: "5px",
                                            paddingTop: "5px",
                                            paddingBottom: "5px"
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              minWidth: "64%",
                                              textAlign: "left",
                                              alignItems: "center"
                                            }}
                                          >
                                            {conteudoItem.titulo}
                                          </Box>

                                          {conteudoItem.titulo.includes(
                                            "[selecione a data]"
                                          ) && (
                                            <Box
                                              sx={{
                                                minWidth: "6%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                              }}
                                            >
                                              <Tooltip title="Selecione a data">
                                                <IconButton
                                                  size="small"
                                                  onClick={() => {
                                                    setShowAcumuladoData(true)
                                                  }}
                                                >
                                                  <CalendarMonth />
                                                </IconButton>
                                              </Tooltip>
                                            </Box>
                                          )}

                                          {!props.data.publicado ||
                                            (props.data.publicado === "N" && (
                                              <Box
                                                sx={{
                                                  minWidth: "6%",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center"
                                                }}
                                              >
                                                <Tooltip title="Subir uma posição">
                                                  <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                      if (!needSaveContent)
                                                        setNeedSaveContent(true)
                                                      upConteudoItem(
                                                        item.conteudo_tipo_id,
                                                        cii
                                                      )
                                                    }}
                                                  >
                                                    <ArrowUpward />
                                                  </IconButton>
                                                </Tooltip>
                                              </Box>
                                            ))}

                                          <Box
                                            sx={{
                                              minWidth: "6%",
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center"
                                            }}
                                          >
                                            <Tooltip title="Posição do item no boletim">
                                              <Typography
                                                variant="body2"
                                                sx={{ userSelect: "none" }}
                                              >
                                                {cii + 1}º
                                              </Typography>
                                            </Tooltip>
                                          </Box>

                                          {!props.data.publicado ||
                                            (props.data.publicado === "N" && (
                                              <Box
                                                sx={{
                                                  minWidth: "6%",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center"
                                                }}
                                              >
                                                <Tooltip title="Descer uma posição">
                                                  <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                      if (!needSaveContent)
                                                        setNeedSaveContent(true)
                                                      downConteudoItem(
                                                        item.conteudo_tipo_id,
                                                        cii
                                                      )
                                                    }}
                                                  >
                                                    <ArrowDownward />
                                                  </IconButton>
                                                </Tooltip>
                                              </Box>
                                            ))}

                                          {!props.data.publicado ||
                                            (props.data.publicado === "N" && (
                                              <Box
                                                sx={{
                                                  minWidth: "6%",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center"
                                                }}
                                              >
                                                <Tooltip title="Excluir">
                                                  <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                      deleteThisItem(
                                                        item.conteudo_tipo_id,
                                                        cii
                                                      )
                                                    }}
                                                  >
                                                    <Delete />
                                                  </IconButton>
                                                </Tooltip>
                                              </Box>
                                            ))}

                                          {!conteudoItem.url.includes(
                                            ":NO-URL"
                                          ) && (
                                            <Box
                                              sx={{
                                                minWidth: "6%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                              }}
                                            >
                                              <Tooltip title="Visualizar">
                                                <IconButton
                                                  size="small"
                                                  onClick={() => {
                                                    window.open(
                                                      conteudoItem.url,
                                                      "_blank"
                                                    )
                                                  }}
                                                >
                                                  <Visibility />
                                                </IconButton>
                                              </Tooltip>
                                            </Box>
                                          )}
                                        </Box>
                                      </ListItem>
                                    ))}
                                  </List>
                                </AccordionDetails>
                                {!props.data.publicado ||
                                  (props.data.publicado === "N" && (
                                    <AccordionActions>
                                      <Button
                                        color="error"
                                        variant="contained"
                                        endIcon={<Delete />}
                                        onClick={() => {
                                          deleteThisSession(
                                            item.conteudo_tipo_id
                                          )
                                        }}
                                      >
                                        {`Excluir ${
                                          sessionNames[
                                            item.conteudo_tipo_id - 1
                                          ]
                                        }`}
                                      </Button>
                                    </AccordionActions>
                                  ))}
                              </Accordion>
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* step 2 */}
                    <Box sx={{ minWidth: "100%", padding: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                          <Typography variant="h6">
                            Observações (opcional)
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Editor
                            width="100%"
                            height="400px"
                            content={observacaoText}
                            onChange={(content: string) => {
                              setObservacaoText(content)
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* step 3 */}
                    <Box sx={{ minWidth: "100%", padding: 1 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Paper
                            sx={{ p: 2, background: "#0D47A1", color: "white" }}
                          >
                            <Grid container spacing={1}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography variant="caption">
                                  Aprovado por:
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography
                                  sx={{ paddingLeft: "20px" }}
                                  variant="h6"
                                >
                                  {!aprovadopor ? "Ñ Aprovado" : aprovadopor}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Paper
                            sx={{ p: 2, background: "#0D47A1", color: "white" }}
                          >
                            <Grid container spacing={1}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography variant="caption">
                                  Publicado por:
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography
                                  sx={{ paddingLeft: "20px" }}
                                  variant="h6"
                                >
                                  {!publicadopor ? "Ñ Publicado" : publicadopor}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Typography variant="h6">Resumo</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Box
                            sx={{
                              width: "100%",
                              border: "0.6px solid #212121"
                            }}
                          >
                            {conteudoItems.map((ct, index) => (
                              <Box
                                key={`resumo-item-${ct.conteudo_tipo_id}-index${index}`}
                                sx={{
                                  width: "100%",
                                  p: 0.4,
                                  background:
                                    index % 2 === 0 ? "#9E9E9E" : "#F5F5F5",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "row"
                                }}
                              >
                                <Box sx={{ width: "90%", fontSize: "12pt" }}>
                                  {sessionNames[ct.conteudo_tipo_id - 1]}
                                </Box>

                                <Box
                                  sx={{
                                    width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                  }}
                                >
                                  {ct.items.length}
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={showAcumuladoData}
        onClose={() => {
          setShowAcumuladoData(false)
        }}
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container justifyItems="center" alignItems="center">
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <Icon color="error" fontSize="large">
                    calendar_month
                  </Icon>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                  <Typography
                    variant="body1"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Selecione a data limite dos acumulados
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="pt-br"
              >
                <DatePicker
                  sx={{ width: "100%" }}
                  onChange={e => {
                    if (!e) return

                    const tmp = [...conteudoItems]

                    for (let i = 0; i < tmp.length; i++) {
                      for (let y = 0; y < tmp[i].items.length; y++) {
                        if (
                          tmp[i].items[y].titulo.includes("[selecione a data]")
                        ) {
                          tmp[i].items[
                            y
                          ].titulo = `Clique aqui e acesse o conteúdo acumulado até o dia ${e.format(
                            "DD/MM/YYYY"
                          )}.`
                        }
                      }
                    }

                    setConteudoItems(tmp)
                    setShowAcumuladoData(false)
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={showDeleteBoletim}
        onClose={() => {
          setShowDeleteBoletim(false)
        }}
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                sx={{
                  width: "100%",
                  padding: 1,
                  background: "#212121",
                  borderRadius: 1
                }}
              >
                <Grid container justifyItems="center" alignItems="center">
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                    <Icon sx={{ color: "#FAFAFA" }} fontSize="large">
                      delete
                    </Icon>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                    <Typography
                      variant="body1"
                      sx={{ textTransform: "uppercase", color: "#FAFAFA" }}
                    >
                      Confirmação de exclusão
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography variant="body1">
                Tem certeza que voce deseja excluir esse boletim ?
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                sx={{
                  width: "100%",
                  justifyContent: "space-around",
                  display: "flex"
                }}
              >
                <Button
                  variant="contained"
                  color="warning"
                  onClick={deleteBoletim}
                >
                  sim
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setShowDeleteBoletim(false)
                  }}
                >
                  Não
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </PanelFrame>
  )
}

export default Novo
