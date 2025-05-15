import { IEditor } from "@/serverside/types/IEditor"
import dynamic from "next/dynamic"
import { FC } from "react"
import "suneditor/dist/css/suneditor.min.css"

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false })

const Editor: FC<IEditor> = props => {
  return (
    <SunEditor
      lang="pt_br"
      height={props.height}
      width={props.width}
      setOptions={{
        height: "300",
        buttonList: [
          [
            "undo",
            "redo",
            "font",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
            "blockquote",
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript",
            "fontColor",
            "hiliteColor",
            "textStyle",
            "removeFormat",
            "outdent",
            "indent",
            "align",
            "horizontalRule",
            "list",
            "lineHeight",
            "table",
            "link",
            "image",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            "save"
          ]
        ],
        callBackSave: (contents: string, isChanged: boolean) => {
          if (props.callBackSave) props.callBackSave(contents, isChanged)
        }
      }}
      onChange={props.onChange}
      setContents={props.content}
    />
  )
}

export default Editor
