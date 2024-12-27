import { getBookByChapter } from "@/assets/book/old"
import VersePopover from "@/components/verse/verse-popover"
import { useBookSetting } from "@/providers/book-provider"
import { VerseFocusType, VerseHighlightColor, VerseType } from "@/types/verse-type"
import { useState } from "react"


const Reader = () => {
  const { isParallel } = useBookSetting();

  const [isVerseFocused, setIsVerseFocused] = useState<VerseFocusType[]>([]);
  const [highlightColor, setHighlightColor] = useState<VerseHighlightColor[]>([]);

  const book1 = getBookByChapter("genesis", 50);

  // TODO - make it work
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
      className={isParallel === "single" ? "xl:mx-96 md:mx-16 sm:mx-4 mx-2 py-4" : "sm:grid grid-cols-2 w-full xl:gap-24 sm:gap-14 xl:px-20 px-10"}
      style={isParallel === "single" ? { marginLeft: 384 } : {}}
    >
      <div>
        <h1 className="text-center text-base mb-8 font-semibold">GENESIS 50</h1>
        {book1.map((verse, index) => (
          <>
            {(verse.type === "paragraph text" || verse.type === "line text") && (
              <VersePopover
                key={index}
                verse={verse}
                highlightColor={highlightColor}
                isVerseFocused={isVerseFocused}
                setIsVerseFocused={setIsVerseFocused}
                setHighlightColor={setHighlightColor}
              >
                <span
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
    </div>
  )
}

export default Reader
