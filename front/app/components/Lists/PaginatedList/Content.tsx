import { Icon } from "../../Icon"

type Props = {
  label: string
  isArrow?: boolean
}

export const Content = ({ label, isArrow }: Props) => {
  return (
    <div className="flex items-center justify-between border-b border-b-gray-30 px-6 py-4 hover:cursor-pointer">
      <p className="truncate text-primary-0">{label}</p>
      <Icon
        name={isArrow ? "arrow_forward" : "edit"}
        className="text-gray-10"
      />
    </div>
  )
}
