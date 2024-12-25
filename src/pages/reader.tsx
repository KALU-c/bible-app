import { getBookByChapter } from "@/assets/book/old"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import VersePopover from "@/components/verse/verse-popover"
import { VerseFocusType, VerseHighlightColor, VerseType } from "@/types/verse-type"
import { CircleSlash2, Copy, Forward } from "lucide-react"
import { useState } from "react"


const Reader = () => {
  const [isVerseFocused, setIsVerseFocused] = useState<VerseFocusType[]>([]);
  const [highlightColor, setHighlightColor] = useState<VerseHighlightColor[]>([]);

  const book = getBookByChapter("genesis", 50);

  function handleClick(verse: VerseType) {
    const isVerseFocusedRn = isVerseFocused.find(item => item.verse === verse.verseNumber);
    const isVerseHighlighted = highlightColor.find(item => item.verse === verse.verseNumber);

    if (isVerseFocusedRn) {
      setIsVerseFocused(isVerseFocused.filter(item => item.verse !== verse.verseNumber))
    } else {
      setIsVerseFocused([...isVerseFocused, { verse: verse.verseNumber, isFocused: true }])
    }

    if (isVerseFocusedRn && !isVerseHighlighted) {
      setHighlightColor([...highlightColor, { verse: verse.verseNumber }]);
    }
  }

  return (
    <div
      // className="xl:mx-96 md:mx-16 sm:mx-4 mx-2 py-4"
      className="sm:grid grid-cols-2 w-full xl:gap-24 sm:gap-14 xl:px-20 px-10"
    // style={open ? { marginLeft: 200 } : { marginLeft: 384 }}
    >
      <div>
        <h1 className="text-center text-base mb-8 font-semibold">GENESIS 50</h1>
        {book.map((verse, index) => (
          <>
            {(verse.type === "paragraph text" || verse.type === "line text") && (
              <VersePopover
                key={index}
                verse={verse}
                highlightColor={highlightColor}
                setHighlightColor={setHighlightColor}
              >
                <span
                  key={index}
                  style={highlightColor.find(item => item.verse === verse.verseNumber) && {
                    color: highlightColor.find(item => item.verse === verse.verseNumber)?.textColor || "black"
                  }}
                  className={`
                    mb-1 text-[17px] cursor-pointer p-1 
                    bg-${highlightColor?.find(item => item.verse === verse.verseNumber)?.backgroundColor || "bg-none"}
                    ${isVerseFocused.find(item => item.verse === verse.verseNumber)
                      ? `border-b border-dotted border-b-black dark:border-b-white rounded-sm`
                      : "border-none"}
                  `}
                  onClick={() => handleClick(verse)}
                >
                  <sup
                    className={`
                  text-xs text-blue-500 mr-1 
                  ${(verse.type === "line text" && verse.value === " ") && "hidden"}
                  ${(verse.sectionNumber !== 1 && "hidden")}
                `}
                  >
                    {verse.verseNumber}
                  </sup>
                  {verse.value}
                </span>
              </VersePopover>
            )}

            {verse.type === "paragraph end" && (
              <>
                <br />
                <br />
              </>
            )}

            {verse.type === "stanza end" && (
              <>
                <br />
                <br />
              </>
            )}
          </>
        ))}
      </div>

      <div>
        <h1 className="text-center text-base mb-8 font-semibold">GENESIS 50</h1>
        {book.map((verse, index) => (
          <>
            {(verse.type === "paragraph text" || verse.type === "line text") && (
              <Popover>
                <PopoverTrigger asChild>
                  <span
                    key={index}
                    style={highlightColor.find(item => item.verse === verse.verseNumber) && {
                      color: highlightColor.find(item => item.verse === verse.verseNumber)?.textColor || "black"
                    }}
                    className={`
                    mb-1 text-[17px] cursor-pointer p-1 
                    bg-${highlightColor?.find(item => item.verse === verse.verseNumber)?.backgroundColor || "bg-none"}
                    ${isVerseFocused.find(item => item.verse === verse.verseNumber)
                        ? `border-b border-dotted border-b-black dark:border-b-white rounded-sm`
                        : "border-none"}
                  `}
                    onClick={() => {
                      isVerseFocused.find(item => item.verse === verse.verseNumber)
                        ? setIsVerseFocused(isVerseFocused.filter(item => item.verse !== verse.verseNumber))
                        : setIsVerseFocused([...isVerseFocused, { verse: verse.verseNumber, isFocused: true }])
                    }}
                  >
                    <sup
                      className={`
                  text-xs text-blue-500 mr-1 
                  ${(verse.type === "line text" && verse.value === " ") && "hidden"}
                  ${(verse.sectionNumber !== 1 && "hidden")}
                `}
                    >
                      {verse.verseNumber}
                    </sup>
                    {verse.value}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-52 p-2 flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <Label className="text-muted-foreground text-xs text-center">Highlight</Label>
                    <div className="flex flex-row justify-between">
                      <span
                        className="w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center"
                        onClick={() => setHighlightColor([...highlightColor, { verse: verse.verseNumber, backgroundColor: "green-300" }])}
                      >
                        <CircleSlash2 />
                      </span>
                      <span
                        className="w-[30px] h-[30px] bg-green-300 rounded-full cursor-pointer"
                        onClick={() => setHighlightColor([...highlightColor, { verse: verse.verseNumber, backgroundColor: "green-300" }])}
                      ></span>
                      <span
                        className="w-[30px] h-[30px] bg-blue-300 rounded-full cursor-pointer"
                        onClick={() => setHighlightColor([...highlightColor, { verse: verse.verseNumber, backgroundColor: "blue-300" }])}
                      ></span>
                      <span
                        className="w-[30px] h-[30px] bg-red-300 rounded-full cursor-pointer"
                        onClick={() => setHighlightColor([...highlightColor, { verse: verse.verseNumber, backgroundColor: "red-300" }])}
                      ></span>
                      <span
                        className="w-[30px] h-[30px] bg-yellow-300 rounded-full cursor-pointer"
                        onClick={() => setHighlightColor([...highlightColor, { verse: verse.verseNumber, backgroundColor: "yellow-300" }])}
                      ></span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-row justify-between gap-2">
                    <Button variant="secondary" className="text-xs">
                      <Forward />
                      Share
                    </Button>
                    <Button
                      variant="secondary"
                      className="text-xs w-full"
                      onClick={() => navigator.clipboard.writeText(`${verse.verseNumber} - ${verse.value}`)}
                    >
                      <Copy />
                      Copy
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {verse.type === "paragraph end" && (
              <>
                <br />
                <br />
              </>
            )}

            {verse.type === "stanza end" && (
              <>
                <br />
                <br />
              </>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

export default Reader
