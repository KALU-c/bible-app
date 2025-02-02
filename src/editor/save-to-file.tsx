import { save } from "@tauri-apps/plugin-dialog"
import { writeTextFile, BaseDirectory, mkdir, exists } from "@tauri-apps/plugin-fs"

import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { Editor } from "@tiptap/react"

const APP_FOLDER = "BibleApp"
const NOTE_FOLDER = "notes"

const SaveToFile = ({ editor }: { editor: Editor | null }) => {

  const handleSaveButton = async () => {
    if (!editor) {
      return;
    }

    try {
      // Check if BibleApp folder exists, create it if not
      const appFolderExists = await exists(APP_FOLDER, { baseDir: BaseDirectory.Document });
      if (!appFolderExists) {
        await mkdir(APP_FOLDER, { baseDir: BaseDirectory.Document, recursive: true });
      }

      // Check if notes folder exists, create it if not
      const notesFolderExists = await exists(`${APP_FOLDER}/${NOTE_FOLDER}`, { baseDir: BaseDirectory.Document });
      if (!notesFolderExists) {
        await mkdir(`${APP_FOLDER}/${NOTE_FOLDER}`, { baseDir: BaseDirectory.Document, recursive: true });
      }

      const filePath = await save({
        filters: [
          {
            name: "JSON Files",
            extensions: ["json"]
          }
        ],
        title: "Save your note...",
        defaultPath: `${BaseDirectory.Document}/${APP_FOLDER}/${NOTE_FOLDER}/untitled.json`
      })

      if (!filePath) {
        console.log("Save canceled by user");
        return;
      }

      await writeTextFile(filePath, JSON.stringify(editor.getJSON()));

      toast({
        description: `File saved successfully: ${filePath}`
      })
    } catch (error) {
      console.error("Error saving file: ", error);
      toast({
        description: "Error saving file. Check the console to see more information",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="border-b flex flex-row items-center gap-0 px-2 z-10 py-1">
      <Button
        variant={"ghost"}
        className="w-7 h-7 rounded-md"
        onClick={handleSaveButton}
      >
        <Save />
      </Button>
    </div>
  )
}

export default SaveToFile
