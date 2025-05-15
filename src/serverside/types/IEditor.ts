export interface IEditor {
  width?: string;
  height?: string;
  content?: string | undefined
  onChange?: (content: string) => void
  callBackSave?: (contents: string, isChanged: boolean) => void
}