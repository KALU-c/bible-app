import { Input } from "@/components/ui/input"
import { useCurrentEditor } from "@tiptap/react";
import { useCallback } from "react";

const FloatingMenuButtons = () => {
  const { editor } = useCurrentEditor()

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (file) {
      const url = URL.createObjectURL(file[0]);

      if (url) {
        editor?.chain().focus().setImage({ src: url }).run();
      }
    }
  }, [editor]);

  if (!editor) {
    return null
  }

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        onChange={event => handleFileChange(event)}
      />
    </div>
  )
}
export default FloatingMenuButtons