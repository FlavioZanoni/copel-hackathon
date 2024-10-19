"use client"
import { useLayoutContext } from "@context/LayoutContext"
import * as ToastRoot from "@radix-ui/react-toast"
import clsx from "clsx"
import { Icon } from "../Icon"

export const Toast = () => {
  const { setToast, toast } = useLayoutContext()

  const handleClose = () => {
    setToast(undefined)
  }

  if (!toast) return null

  return (
    <ToastRoot.Provider swipeDirection="left">
      <ToastRoot.Root
        open={!!toast}
        onOpenChange={handleClose}
        className={clsx(
          toast.type === "success" && " bg-green-400",
          toast.type === "error" && "bg-red-500",
          toast.type === "warning" && "bg-yellow-500",
          toast.type === "info" && "bg-blue-500",
          "fixed right-4 top-8 z-[100] w-[calc(100dvw-88px)] animate-fade-left rounded-sm p-3 text-white shadow-lg lg:right-8 lg:w-[400px]"
        )}
        duration={toast.duration || 5000}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <ToastRoot.Title>{toast.title}</ToastRoot.Title>
            <ToastRoot.Description className="ml-4">
              {toast.description}
            </ToastRoot.Description>
          </div>

          <ToastRoot.Close className="flex items-center">
            <Icon name="close" />
          </ToastRoot.Close>
        </div>
      </ToastRoot.Root>

      <ToastRoot.Viewport />
    </ToastRoot.Provider>
  )
}
