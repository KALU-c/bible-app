import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu
} from "@tiptap/react"

// extensions
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"

// custom components
import BubbleMenuButtons from "./bubble-menu-buttons"
import FloatingMenuButtons from "./floating-menu-buttons"

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3]
    }
  }),
  Highlight.configure({
    multicolor: true
  }),
  Image
]

const editorProps = {
  attributes: {
    class: 'prose prose-sm sm:prose-base lg:prose-base xl:prose-lg m-5 focus:outline-none dark:prose-invert prose-headings:text-indigo-500 prose-slate w-full min-h-screen min-w-full',
  }
}

const Tiptap = () => {
  return (
    <EditorProvider
      extensions={extensions}
      editorProps={editorProps}
    >
      <FloatingMenu editor={null}>
        <FloatingMenuButtons />
      </FloatingMenu>
      <BubbleMenu editor={null}>
        <BubbleMenuButtons />
      </BubbleMenu>
    </EditorProvider>
  )
}

export default Tiptap