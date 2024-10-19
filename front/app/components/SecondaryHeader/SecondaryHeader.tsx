import clsx from "clsx"

type Props = {
  title: string
  subtitle?: string
  usePadding?: boolean
}

export const SecondaryHeader = ({ subtitle, title, usePadding }: Props) => {
  return (
    <div className={clsx("flex flex-col gap-1", usePadding && "px-6")}>
      <p className="text-xl text-primary-0 lg:text-3xl">{title}</p>
      <p className="text-sm font-light text-gray-0 lg:text-xl">{subtitle}</p>
    </div>
  )
}
