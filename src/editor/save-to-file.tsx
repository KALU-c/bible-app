import { save, open } from "@tauri-apps/plugin-dialog"
import { writeTextFile, BaseDirectory, mkdir, exists, readTextFile } from "@tauri-apps/plugin-fs"

import { Button } from '@/components/ui/button'
import { FilePlus, FolderOpen, Save, SaveAll } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { Editor } from "@tiptap/react"
import { Input } from "@/components/ui/input"
import { useBookSetting } from "@/providers/book-provider"
import { documentDir } from "@tauri-apps/api/path"

const APP_FOLDER = "Orah App Files"
const NOTE_FOLDER = "notes"

const SaveToFile = ({ editor }: { editor: Editor | null }) => {
  const { currentNote, setCurrentNote } = useBookSetting();

  return (
    <div className="border-b flex flex-row items-center gap-0 px-2 z-10 py-1">
      <Input
        value={currentNote || "Untitled"}
        className="p-0 m-0 rounded-sm h-[25px] w-[100px] px-2 mr-2"
        disabled
      />
      <Button
        variant={"ghost"}
        className="w-7 h-7 rounded-md"
        onClick={handleOpenButton}
      >
        <FolderOpen />
      </Button>
      <Button
        variant={"ghost"}
        className="w-7 h-7 rounded-md"
        onClick={() => handleSaveButton("save")}
      >
        <Save />
      </Button>
      <Button
        variant={"ghost"}
        className="w-7 h-7 rounded-md"
        onClick={() => handleSaveButton("save as")}
      >
        <SaveAll />
      </Button>
      <Button
        variant={"ghost"}
        className="w-7 h-7 rounded-md"
      // onClick={handleSaveButton}
      >
        <FilePlus />
      </Button>
    </div>
  );

  async function handleOpenButton() {
    if (!editor) return;

    try {
      const file = await open({
        multiple: false,
        directory: false,
        defaultPath: `${BaseDirectory.Document}/${APP_FOLDER}/${NOTE_FOLDER}`
      })

      if (!file) {
        console.log("No file selected!")
        return;
      }

      // get file name
      const fileNameWithExtension = file.split("\\").pop();
      const fileName = fileNameWithExtension?.split(".").shift();
      setCurrentNote(fileName!);

      const note = await readTextFile(file as string);

      const parsedNote = JSON.parse(note);

      // set the editor content with the parsed note
      editor.commands.setContent(parsedNote.content);

      toast({
        description: "File opened and loaded successfully"
      })
    } catch (err) {
      console.log("Error while opening note: ", err)
    }

  }

  async function handleSaveButton(type: "save" | "save as") {
    if (!editor) {
      return;
    }

    try {
      // Check if Orah App folder exists, create it if not
      const appFolderExists = await exists(APP_FOLDER, { baseDir: BaseDirectory.Document });
      if (!appFolderExists) {
        await mkdir(APP_FOLDER, { baseDir: BaseDirectory.Document, recursive: true });
      }

      // Check if notes folder exists, create it if not
      const notesFolderExists = await exists(`${APP_FOLDER}/${NOTE_FOLDER}`, { baseDir: BaseDirectory.Document });
      if (!notesFolderExists) {
        await mkdir(`${APP_FOLDER}/${NOTE_FOLDER}`, { baseDir: BaseDirectory.Document, recursive: true });
      }

      if (type === "save") {
        const baseDirectory = await documentDir();
        const fileExists = await exists(`${APP_FOLDER}/${NOTE_FOLDER}/${currentNote}.json`, {
          baseDir: BaseDirectory.Document
        });

        if (fileExists) {
          // Overwrites if the file exist
          await writeTextFile(`${baseDirectory}\\${APP_FOLDER}\\${NOTE_FOLDER}\\${currentNote}.json`, JSON.stringify(editor.getJSON()));

          toast({
            description: `${currentNote} saved successfully!`
          })

          return;
        }
      }

      const filePath = await save({
        filters: [
          {
            name: "JSON Files",
            extensions: ["json"]
          }
        ],
        title: "Save your note...",
        defaultPath: `${BaseDirectory.Document}/${APP_FOLDER}/${NOTE_FOLDER}/Untitled.json`
      })

      if (!filePath) {
        console.log("Save canceled by user");
        return;
      }

      await writeTextFile(filePath, JSON.stringify(editor.getJSON()));

      // get file name
      const fileNameWithExtension = filePath.split("\\").pop();
      const fileName = fileNameWithExtension?.split(".").shift();
      setCurrentNote(fileName!);


      toast({
        description: `File saved successfully`
      })
    } catch (error) {
      console.error("Error saving file: ", error);
      toast({
        description: "Error saving file. Check the console to see more information",
        variant: "destructive"
      })
    }
  }
}

export default SaveToFile
