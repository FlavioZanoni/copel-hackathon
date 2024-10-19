"use client"
import { useLayoutContext } from "@/app/lib/context/LayoutContext"
import { Button } from "@/components/ui/button"
import { PenBox } from "lucide-react"

export const Sidebar = () => {
  const { setResetChat } = useLayoutContext()

  return (
    <div className="p-4 w-1/5 bg-gray-100 flex flex-col gap-6">
      <Button
        className="bg-[#f5821e]"
        onClick={() => {
          setResetChat(true)
        }}>
        <PenBox /> Novo chat
      </Button>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold" >
          Hoje
        </h2>

        <ul className="flex flex-col gap-2">
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold" >
          Ontem:
        </h2>

        <ul className="flex flex-col gap-2">
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold" >
          Ultima semana:
        </h2>

        <ul className="flex flex-col gap-2">
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
          <li>Como cancelar fatura </li>
        </ul>
      </div>
    </div >
  )
}
