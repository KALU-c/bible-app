import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

const extensions = [StarterKit.configure({
  heading: {
    levels: [1, 2, 3]
  }
})]

const editorProps = {
  attributes: {
    class: 'prose prose-sm sm:prose-base lg:prose-base xl:prose-lg m-5 focus:outline-none dark:prose-invert prose-headings:text-indigo-500 prose-slate w-full min-h-screen min-w-full',
  },
}

const Tiptap = () => {
  return (
    <EditorProvider
      extensions={extensions}
      editorProps={editorProps}
    >
      <FloatingMenu editor={null}>
        This is floating menu
      </FloatingMenu>
      <BubbleMenu editor={null}>
        This is bubble menu
      </BubbleMenu>
    </EditorProvider>
  )
}

export default Tiptap