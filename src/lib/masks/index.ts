const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

const noSpecialCharactersMask = (value: string): string => {
  return value.replace(/[^\w\s]/gi, "")
}

const numbersOnlyMask = (value: string): string => {
  return value.replace(/\D/g, "")
}

const moneyMask = (value: string): string => {
  let v = value.replace(/\D/g, "")
  v = (parseInt(v) / 100).toFixed(2) + ""
  v = v.replace(".", ",")
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,")
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,")
  value = v
  return value
}

const cnpjMask = (value: string): string => {
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

const phoneMask = (v: string) => {
  v = v.replace(/\D/g, "")
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2")
  v = v.replace(/(\d)(\d{4})$/, "$1-$2")
  return v
}

const cepMask = (value: string) => {
  const cep = value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
  return cep
}

const measureMask = (value: string) => {
  return value.replace(/[^0-9,]/g, "").replace(/(,.*?),(.*,)?/, "$1")
}

export {
  cepMask,
  cnpjMask,
  cpfMask,
  measureMask,
  moneyMask,
  noSpecialCharactersMask,
  numbersOnlyMask,
  phoneMask
}
