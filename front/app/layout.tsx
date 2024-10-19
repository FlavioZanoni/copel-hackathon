import { Toast } from "@components/Toast"
import { LayoutProvider } from "@context/LayoutContext"
import { QueryContext } from "@context/queryContext"
import { UserProvider } from "@context/userContext"
import { Analytics } from "@vercel/analytics/react"
import { Metadata, Viewport } from "next"
import { Mulish } from "next/font/google"
import "./globals.css"

const mulish = Mulish({ subsets: ["latin"] })

let title = ""
export const metadata: Metadata = {
  authors: [
    {
      name: "FlavioZanoni",
    },
  ],
  appleWebApp: {
    capable: false,
    title: title,
  },
  title: {
    default: title,
    template: "%s | " + title,
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  colorScheme: "only light",
}

const className = mulish.className


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </head>
      <QueryContext>
        <UserProvider>
          <LayoutProvider>
            <body className={className}>
              {children}
              <Toast />
              <Analytics />
            </body>
          </LayoutProvider>
        </UserProvider>
      </QueryContext>
    </html>
  )
}
