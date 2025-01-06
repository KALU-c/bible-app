import {
  FloatingPanelBody,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
} from "@/components/verse/floating-panel"
import { useBookSetting } from "@/providers/book-provider"


function FloatingNoteInput() {
  const { fontFamily } = useBookSetting()

  const handleSubmit = (note: string) => {
    console.log("Submitted note:", note)
  }

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Take Note"
        className={`${fontFamily === "Source Serif Pro" ? "font-source-serif" : "font-inter"} flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors`}
      >
        <span>Take Note</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-96">
        <FloatingPanelForm onSubmit={handleSubmit}>
          <FloatingPanelBody className="min-h-[200px] px-1 py-0">
            <FloatingPanelTextarea id="note-input" className="h-full min-h-[200px] rounded-none scrollbar dark:scrollbar-dark" />
          </FloatingPanelBody>
          <FloatingPanelFooter className="py-1">
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  )
}

export default FloatingNoteInput