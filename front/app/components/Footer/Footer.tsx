import { Links } from "./Links"

export const Footer = () => {
  return (
    <nav className="sticky bottom-0 flex w-full items-center justify-around border-2 border-t-[#F6F6F6] bg-white pb-6 pt-3 lg:h-[calc(100vh-64px)] lg:w-[86px] lg:flex-col lg:justify-normal lg:gap-12 lg:rounded-2xl lg:border-gray-20 lg:p-7">
      <Links />
    </nav>
  )
}
