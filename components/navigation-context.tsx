"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type NavigationContextType = {
  currentFile: string
  currentPath: string[]
  setCurrentFile: (file: string) => void
  setCurrentPath: (path: string[]) => void
  openFolders: Set<string>
  toggleFolder: (folder: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentFile, setCurrentFile] = useState("File1.docx")
  const [currentPath, setCurrentPath] = useState(["School", "Junior Year"])
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(["School", "Junior Year", "Work"]))

  const toggleFolder = (folder: string) => {
    setOpenFolders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(folder)) {
        newSet.delete(folder)
      } else {
        newSet.add(folder)
      }
      return newSet
    })
  }

  const navigationValue = {
    currentFile,
    currentPath,
    setCurrentFile,
    setCurrentPath,
    openFolders,
    toggleFolder,
  }

  return <NavigationContext.Provider value={navigationValue}>{children}</NavigationContext.Provider>
}

