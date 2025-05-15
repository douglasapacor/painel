export type featureIndexServerSide = {
  device: {
    list: []
    length: 0
  }
}

const constructor = (): featureIndexServerSide => {
  return {
    device: {
      list: [],
      length: 0
    }
  }
}

export { constructor }
