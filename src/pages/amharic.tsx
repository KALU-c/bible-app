import genesis from "C:/Users/admin/Desktop/FINAL TRIAL/scrape/NASV/genesis.json"

const Amharic = () => {
  return (
    <div className="py-4">
      {genesis.chapters.map(book => (
        <>
          {book.title === "ዘፍጥረት 1" && (
            <>
              <h1 className="mb-8 text-center text-2xl font-bold">
                {book.title}
              </h1>
              <div className="flex flex-col">
                {book.content.map(chapter => (
                  <>
                    {chapter.type === "title" && (
                      <span className="font-semibold text-base mb-4">{chapter.text}</span>
                    )}
                    {chapter.type === "paragraph" && (
                      <>
                        {chapter.verses.map(verse => (
                          <span className="font-jiret text-xl">
                            <sup className="text-blue-500 mr-1">
                              {verse.verseNumber}
                            </sup>
                            {verse.text}
                          </span>
                        ))}
                      </>
                    )}
                  </>
                ))}
              </div>
            </>
          )}
        </>
      ))}
    </div>
  )
}
export default Amharic