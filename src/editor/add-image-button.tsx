import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { ChevronDown, Image, Link } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const AddImage = ({
  editor,
  className
}: {
  editor: Editor | null
  className?: string
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  }

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (file) {
      const url = URL.createObjectURL(file[0]);

      if (url) {
        editor?.chain().focus().setImage({ src: url }).run();
      }
    }
  }, [editor]);

  // NOTE - not working
  const handleFileUrlInput = useCallback(() => {
    if (imageUrl !== "") {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
    }
  }, [editor])

  if (!editor) {
    return null
  }
  return (
    <>
      <div className="flex items-center gap-0">
        <Button
          variant="ghost"
          onClick={handleClick}
          className="w-7 h-7 rounded-none"
        >
          <Image />
        </Button>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 h-7 rounded-none"
              >
                <ChevronDown size={12} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none">
              <DropdownMenuItem className="text-xs rounded-none" onClick={handleClick}>
                <Image />
                Upload from computer
              </DropdownMenuItem>

              <DialogTrigger asChild>
                <DropdownMenuItem className="text-xs rounded-none">
                  <Link />
                  Import via URL
                </DropdownMenuItem>
              </DialogTrigger>

            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-sm">Insert image URL</DialogTitle>
            </DialogHeader>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                value={imageUrl}
                onChange={event => setImageUrl(event.currentTarget.value)}
              />
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" variant="default" onClick={handleFileUrlInput}>
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Input
        ref={hiddenFileInput}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={cn("bg-green-400 hidden", className)}
      />
    </>
  )
}
export default AddImage