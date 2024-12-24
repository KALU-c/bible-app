import { BookType } from "@/types/book-type"

type currentBook = BookType;

type BookProviderProps = {
  children: React.ReactNode
  storageKey?: string
}

const BookProvider = () => {
  return (
    <div>

    </div>
  )
}

export default BookProvider
