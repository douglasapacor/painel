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

    url = url + "/seguranca/autenticacao/painel"

    const apiResponse = await axios.post<{
      success: boolean
      data?: any
      message?: string
    }>(url, req.body, {
      withCredentials: true
    })

    res.setHeader(
      "Set-Cookie",
      `credencial=${apiResponse.data.data.credencial}; Path=/; Secure;`
    )

    res.status(200).json(apiResponse.data.data)
  } catch (err) {
    res.status(500).json({ success: false, message: String(err) })
  }
}
