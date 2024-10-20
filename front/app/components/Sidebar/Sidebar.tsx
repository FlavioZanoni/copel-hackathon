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
        <h2 className="font-bold">
          Hoje
        </h2>
        <ul className="flex flex-col gap-2">
          <li className="truncate max-w-[290px]">Solicitação de Cancelamento de Fatura</li>
          <li className="truncate max-w-[290px]">Dúvida Sobre Cancelamento de Fatura</li>
          <li className="truncate max-w-[290px]">Como Cancelar a Fatura?</li>
          <li className="truncate max-w-[290px]">Cancelamento de Fatura - Suporte</li>
          <li className="truncate max-w-[290px]">Ajuda com Cancelamento de Fatura</li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold">
          Ontem
        </h2>
        <ul className="flex flex-col gap-2">
          <li className="truncate max-w-[290px]">Pedido de Cancelamento de Fatura</li>
          <li className="truncate max-w-[290px]">Informações Sobre Cancelamento de Fatura</li>
          <li className="truncate max-w-[290px]">Dificuldades para Cancelar a Fatura</li>
          <li className="truncate max-w-[290px]">Ajuda para Cancelar a Fatura</li>
          <li className="truncate max-w-[290px]">Cancelamento de Fatura - Dúvidas</li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold">
          Última Semana
        </h2>
        <ul className="flex flex-col gap-2">
          <li className="max-w-[290px] truncate">Perguntas Frequentes: Cancelamento...</li>
          <li className="max-w-[290px] truncate">Problema com Cancelamento de Fatura</li>
          <li className="max-w-[290px] truncate">Tutorial de Cancelamento de Fatura</li>
          <li className="max-w-[290px] truncate">Passo a Passo para Cancelar a Fatura</li>
          <li className="max-w-[290px] truncate">Cancelamento de Fatura - Guia Completo</li>
        </ul>
      </div>
    </div>
  )
}
