"use client"

import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { mutateChat } from "../lib/api/chat"
import { Chat, MutateChat } from "../lib/api/chat/types"
import { useLayoutContext } from "../lib/context/LayoutContext"
import { IError } from "../lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpCircle, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { PdfCard } from "../components/PdfCard"
import Image from "next/image"

type MsgType = {
  text: string
  sources: string[]
  highlights: any[]
  isResponse: boolean
}

export default function Home() {
  const { setToast, resetChat, setResetChat } = useLayoutContext()

  const [currentHigh, setCurrentHigh] = useState({})
  const [started, setStarted] = useState(false)
  const [chatHist, setChatHist] = useState<MsgType[]>([])
  const [input, setInput] = useState<string>("")
  const [pdfUrl, setPdfUrl] = useState<string>("")

  useEffect(() => {
    if (resetChat) {
      setResetChat(false)
      setChatHist([])
      setStarted(false)
    }
  }, [resetChat])

  useEffect(() => {
    document.getElementById("limao")?.scrollIntoView({
      behavior: "smooth"
    })
  }, [chatHist])

  const processChat = (data: Chat) => {
    const sources = data.sources.filter((item, index, arr) => arr.indexOf(item) === index)

    setChatHist([...chatHist, { text: data.response, sources: sources, highlights: data.highlights, isResponse: true }])
  }

  const { mutate, isLoading } = useMutation(
    ["mutateChat", input],
    (data: MutateChat) => mutateChat({ data: data }),
    {
      onSuccess: (data) => {
        processChat(data)
      },
      onError: (error: IError) => {
        setToast({
          type: "error",
          title: error.messages[0],
        })
      },
    }
  )

  if (started && chatHist) {
    return (
      <div className="w-full h-full flex flex-row gap-2">
        <div className="w-full h-full flex flex-col gap-2">
          <HeaderCop />
          <div className={`${pdfUrl ? "ml-2" : "ml-28"}  h-full max-w-[1400px] flex flex-col justify-center gap-2 overflow-scroll`}>

            <ChatHistory setCurrentHigh={setCurrentHigh} pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} isLoading={isLoading} chatHist={chatHist} />
            <div className="m-auto flex flex-row gap-2 w-[700px] p-2 mb-2">
              <Input
                placeholder="Digite sua mensagem"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                }}
              />
              <Button
                className="bg-[#f5821e]"
                onClick={() => {
                  if (!input) return
                  mutate({
                    prompt: input,
                  })
                  setInput("")
                  setChatHist([...chatHist, { text: input, sources: [], highlights: [], isResponse: false }])
                }}>
                <ArrowUpCircle />
                Enviar</Button>
            </div>
          </div>
        </div>
        {pdfUrl && (<PdfCard highlights={currentHigh} fileName={pdfUrl} close={() => {
          setPdfUrl("")
        }} />)}
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col w-full m-auto items-center justify-center">
      <HeaderCop />
      <div className="w-full flex flex-col m-auto items-center justify-center">
        <div className="-mt-16 flex items-center justify-center flex-col gap-2">
          <h1 className="font-bold text-2xl text-center">Como posso ajudar?</h1>

          <div className="flex flex-row gap-2 w-[700px]">
            <Input
              placeholder="Digite sua mensagem"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
              }}
            />
            <Button
              className="bg-[#f5821e]"
              disabled={isLoading} onClick={() => {
                setStarted(true)
                mutate({
                  prompt: input,
                })
                setInput("")
                if (!chatHist) {
                  setChatHist([{ text: input, sources: [], isResponse: false }])
                  return
                }
                setChatHist([...chatHist, { text: input, sources: [], isResponse: false }])
              }}>
              <ArrowUpCircle />
              Enviar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const HeaderCop = () => {
  return (
    <div className="w-full py-4 gap-2 flex flex-col">
      <div className="w-full flex items-center justify-center">
        <Image src="/copel.webp" width={150} height={55} alt="logo" />
      </div>

      <div className="p-2 text-white flex fle-row justify-around bg-[#f5821e]">
        <p>
          <span className="font-bold">Nome: </span>
          Flávio Gallon
        </p>
        <p>
          <span className="font-bold">CPF: </span>
          109.152.859-40
        </p>
        <p>
          <span className="font-bold">RG: </span>
          13.154.801-0
        </p>
        <p>
          <span className="font-bold">Matrícula: </span>
          09187409128
        </p>
        <p>
          <span className="font-bold">Status: </span>
          Em Andamento
        </p>
      </div>
    </div >

  )
}

const ChatHistory = ({ chatHist, isLoading, setPdfUrl, pdfUrl, setCurrentHigh }: { isLoading: boolean; chatHist: MsgType[], setPdfUrl: React.Dispatch<React.SetStateAction<string>>; pdfUrl: string, setCurrentHigh: () => void }) => {
  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      <div className="flex-1 overflow-y-auto">
        {chatHist.map((msg, index) => (
          <div
            key={index}
            className={`flex justify-${msg.isResponse ? 'start' : 'end'} mb-4`}
          >
            <div className="flex flex-col gap-3">
              <div
                id={chatHist.length - 1 === index ? "limao" : "12"}
                className={`p-4 rounded-lg shadow-md max-w-xl border border-zinc-300 ${msg.isResponse ? 'bg-white' : 'bg-zinc-200'
                  }`}
              >
                <div className="text-lg">{msg.text}</div>
                {msg.sources.length > 0 && (
                  <div className="mt-2">
                    <strong className="text-gray-700">Fontes:</strong>
                    <ul className="flex flex-col list-disc list-inside gap-3">
                      {msg.sources.map((source, idx) => (
                        <Card className="w-[450px] bg-gray-200 cursor-pointer"
                          onClick={() => {
                            if (pdfUrl === source.substring(5, source.length)) {
                              setPdfUrl("")
                              return
                            }
                            setPdfUrl(source.substring(5, source.length))
                            const curhi = msg.highlights.find((item) => {
                              return item.source == source.substring(0, source.length - 4)
                            })
                            setCurrentHigh(curhi)
                          }}
                          key={idx}>
                          <CardContent className="flex flex-row gap-2 mt-8 items-center">
                            <div className="flex flex-col w-full">
                              <p className="font-bold">{source.substring(5, source.length)} </p>
                              <p>Clique para ver a referencia</p>
                            </div>
                            <ExternalLink />
                          </CardContent>
                        </Card>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {msg.isResponse && index == chatHist.length - 1 && (
                <div className="ml-4 flex flex-row gap-3 text-zinc-400">
                  <Copy className="cursor-pointer" />
                  <ThumbsUp className="cursor-pointer" />
                  <ThumbsDown className="cursor-pointer" />
                </div>
              )}
            </div>

          </div>
        ))}
        {isLoading && (
          <div className="mb-2 text-gray-500 animate-pulse">
            <Skeleton height={100} width={500} />
          </div>
        )}
      </div>
    </div >
  );
};
