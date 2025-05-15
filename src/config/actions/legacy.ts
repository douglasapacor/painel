import apiConfigs from "../api"

const legacy = {
  home: {
    inicio: `${apiConfigs.legacy}/home`,
    curriculum: `${apiConfigs.legacy}/home/curriculum`
  },
  boletim: {
    description: (id: number) => `${apiConfigs.legacy}/description/${id}`,
    news: {
      home: `${apiConfigs.legacy}/news`,
      select: (id: string) => `${apiConfigs.legacy}/news/${id}`
    },
    legislation: {
      home: `${apiConfigs.legacy}/legislation`,
      select: (id: string) => `${apiConfigs.legacy}/legislation/${id}`
    },
    jurisprudence: {
      home: `${apiConfigs.legacy}/jurisprudence`,
      select: (id: string) => `${apiConfigs.legacy}/jurisprudence/${id}`
    },
    opinion: {
      home: `${apiConfigs.legacy}/opinion`,
      select: (id: string) => `${apiConfigs.legacy}/opinion/${id}`
    },
    questionAndAnswer: {
      home: `${apiConfigs.legacy}/questions-answers`,
      select: (id: string) => `${apiConfigs.legacy}/questions-answers/${id}`
    },
    messagesEditors: {
      home: `${apiConfigs.legacy}/messages-editors`,
      select: (id: string) => `${apiConfigs.legacy}/messages-editors/${id}`
    },
    pareceres: {
      home: `${apiConfigs.legacy}/pareceres`,
      select: (id: string) => `${apiConfigs.legacy}/pareceres/${id}`
    },
    supplements: {
      temas: `${apiConfigs.legacy}/supplements/themes/list`,
      home: `${apiConfigs.legacy}/supplements`,
      select: (id: string) => `${apiConfigs.legacy}/supplements/${id}`
    }
  },
  classificadores: {
    stateInfo: (acronym: string) =>
      `${apiConfigs.legacy}/classifiers/state?acronym=${acronym}`,
    home: `${apiConfigs.legacy}/classifiers`,
    selectIndex: (id: number) => `${apiConfigs.legacy}/classifiers/${id}`,
    selectContent: (id: number) =>
      `${apiConfigs.legacy}/classifiers/act-content?id=${id}`,
    selectPreviousActs: () => `${apiConfigs.legacy}/classifiers/previous-acts`,
    selectPreviousBarActs: (id: number) =>
      `${apiConfigs.legacy}/classifiers/previous-bars?idAto=${id}`
  }
}

export default legacy
