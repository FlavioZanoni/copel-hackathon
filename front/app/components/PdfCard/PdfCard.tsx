"use client"
import { getPdf } from "@/app/lib/api/pdf"
import { useQuery } from "@tanstack/react-query"
import { Document, Page } from 'react-pdf';
import { X } from 'lucide-react'
import { useEffect, useState } from "react";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PdfCard = ({ fileName, close, highlights }: { fileName: string, close: () => void, highlights: any }) => {
  const url = process.env.NEXT_PUBLIC_URL
  const [numPages, setNumPages] = useState("");
  const [ur, setUr] = useState("")
  useEffect(() => {
    setUr(url + "data/" + fileName.substring(0, fileName.length - 4))
  }, [])
  const [isLoading, setIsLoading] = useState(true);
  const [pageScale, setPageScale] = useState(1);
  const [pageSize, setPageSize] = useState({ width: null, height: null });
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };


  useEffect(() => {
    console.log(highlights)
    console.log(highlights?.page)
    document.getElementById("pageei_" + highlights?.page)?.scrollIntoView({
      behavior: "smooth"
    })

  }, [isLoading, numPages])

  const onPageLoadSuccess = (page) => {
    setPageSize({
      width: page.width,
      height: page.height
    });
  };

  return (
    <div className="w-full overflow-scroll">
      <div className="flex flex-row justify-start p-2">
        <X className="cursor-pointer" onClick={() => close()} />
      </div>
      <div className="w-full overflow-scroll bg-zinc-400 p-4">
        <Document
          file={ur}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-center py-4">Loading PDF...</div>}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="relative mb-8">
              <div className="relative" id={'pageei_' + index} >
                <Page
                  pageNumber={index + 1}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="shadow-lg"
                  onLoadSuccess={onPageLoadSuccess}
                />
                {index + 1 == highlights?.page && (
                  <div
                    className="absolute bg-yellow-200 mix-blend-multiply"
                    style={{
                      left: `${40}px`,
                      top: `${220}px`,
                      width: `${420}px`,
                      height: '52px',
                      opacity: 0.3,
                      zIndex: 10,
                      pointerEvents: 'auto',
                    }}
                  >
                    <div
                      className="hidden group-hover:block absolute bottom-full left-0 bg-black text-white p-2 rounded text-sm"
                      style={{ maxWidth: '300px' }}
                    >
                      {highlights.text}
                    </div>
                  </div>
                )}
              </div>

              {/* Page Number */}
              <div className="text-center text-sm text-gray-900 mt-2 font-semibold">
                Page {index + 1} of {numPages}
              </div>
            </div>
          ))}
        </Document>
      </div>
    </div>
  )
}

