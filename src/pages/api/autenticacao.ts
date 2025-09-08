import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Método não permitido" })
  }

  try {
    let url =
      process.env.NODE_ENV === "production"
        ? "https://api.publicacoesinr.com.br"
        : "http://localhost:3001"

    // let url = "https://api.publicacoesinr.com.br"
    url = url + "/seguranca/autenticacao/painel"

    const apiResponse = await axios.post<{
      success: boolean
      data?: any
      message?: string
    }>(url, req.body, {
      withCredentials: true
    })

    const today = new Date()
    let newDate: Date

    if (req.body.keep) {
      newDate = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000)
    } else {
      newDate = new Date(today.getTime() + 8 * 60 * 60 * 1000)
    }

    res.setHeader(
      "Set-Cookie",
      `credential=${
        apiResponse.data.data.credential
      }; Path=/; Secure; Expires=${newDate.toUTCString()};`
    )

    res.status(200).json(apiResponse.data.data)
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message })
  }
}
