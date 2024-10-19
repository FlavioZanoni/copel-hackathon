"use client"
import React, { createContext, useContext, useState } from "react"

type ToastProps = {
  title: string
  type: "success" | "error" | "warning" | "info"
  description?: string
  duration?: number
}

interface LayoutContextProps {
  toast?: ToastProps
  setToast: React.Dispatch<React.SetStateAction<ToastProps | undefined>>
  showNewUser: boolean
  setShowNewUser: React.Dispatch<React.SetStateAction<boolean>>
  resetChat: boolean
  setResetChat: React.Dispatch<React.SetStateAction<boolean>>
}

export const LayoutContext = createContext({} as LayoutContextProps)

type Props = {
  children: React.ReactNode
}

export const LayoutProvider: React.FC<Props> = ({ children }) => {
  const [toast, setToast] = useState<ToastProps | undefined>(undefined)
  const [showNewUser, setShowNewUser] = useState(false)
  const [resetChat, setResetChat] = useState(false)

  const values = { toast, setToast, showNewUser, setShowNewUser, resetChat, setResetChat }

  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  )
}

export const useLayoutContext = () => {
  const context = useContext(LayoutContext)

  if (context === undefined) {
    throw new Error("useLayoutContext must be used within a LayoutProvider")
  }

  return context
}
