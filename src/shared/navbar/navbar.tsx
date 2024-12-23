import { SelectBook } from "./select-book"
import { SelectVersion } from "./select-version"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-2 border-b">
      <div className="flex gap-4">
        {/* select books */}
        <SelectBook />
        {/* select versions */}
        <SelectVersion />
      </div>
      {/* right sidebar tools */}
    </nav>
  )
}

export default Navbar
