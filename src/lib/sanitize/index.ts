import { specials, specialsCleared } from "../base"

const sanitize = (text: string) => {
  return {
    urlFriendly(): string {
      let textResult = ""

      for (let i = 0; i < text.length; i++) {
        const findSpecialsResult = specials.findIndex(char => char === text[i])
        if (findSpecialsResult >= 0) {
          textResult = textResult + specialsCleared[findSpecialsResult]
        } else {
          textResult = textResult + text[i]
        }
      }

      return textResult.toLocaleLowerCase()
    }
  }
}

export default sanitize
