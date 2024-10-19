import { FloatingMenu } from "@components/FloatingMenu"
import { Footer } from "@components/Footer"
import { Header } from "@components/Header"
import { Sidebar } from "../components/Sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <main className="w-full h-full flex flex-row">
        <Sidebar />
        <div className="w-4/5">
          {children}
        </div>
      </main>
    </>
  )
}
