import { metadata } from "./metadata"
import { serversideReponse } from "./serversideResponse"

export default class ServersideSystem<T = any> {
  private _metadata: metadata
  private _data: Partial<T>

  constructor() {
    this._metadata = {
      nome: null,
      url: null,
      icone: null,
      detalhes: {
        criacao: null,
        edicao: null
      }
    }
    this._data = {}
  }

  json(): serversideReponse {
    return { metadata: this._metadata, data: this._data }
  }

  empty(): serversideReponse {
    return {
      metadata: {
        nome: null,
        url: null,
        icone: null,
        detalhes: {
          criacao: null,
          edicao: null
        }
      },
      data: {}
    }
  }

  set metadata(param: metadata) {
    this._metadata = param
  }

  set data(param: Partial<T>) {
    this._data = param
  }

  detalhes(
    criacao: { id: number; nome: string; data: Date } | null,
    edicao: { id: number; nome: string; data: Date } | null
  ) {
    this._metadata.detalhes = {
      criacao,
      edicao
    }
  }
}
