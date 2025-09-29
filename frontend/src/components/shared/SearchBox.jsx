import React from 'react'
import { SearchIcon } from 'lucide-react';
function SearchBox({searchTerm, setSearchTerm,placeholder = "Search..."}) {
  return (
     <div className="relative w-full  mb-4">
                <span className="absolute left-3 top-2.5 text-gray-400"><SearchIcon></SearchIcon></span>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--color-surface-background)] border border-[var(--border-color)] text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all duration-200"
                />
            </div>
  )
}

export default SearchBox
