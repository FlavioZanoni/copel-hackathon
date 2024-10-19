"use client"
import { getPdf } from "@/app/lib/api/pdf"
import { useQuery } from "@tanstack/react-query"
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { X } from 'lucide-react'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PdfCard = ({ fileName, close }: { fileName: string, close: () => void }) => {
  const { data, error, isLoading } = useQuery(["pdf", fileName], () => getPdf({ fileName: fileName }), {
    enabled: !!fileName,
  })

  const url = process.env.NEXT_PUBLIC_URL

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="w-full">
      <div className="flex flex-row justify-start p-2">
        <X className="cursor-pointer" onClick={() => close()} />
      </div>
      <object data={`${url}data/${fileName}`} type="application/pdf" width="100%" height="95%">
      </object>
      { /*
      <Document file={data} >
        <Page pageNumber={1} />
      </Document> */}
    </div>
  )


}

