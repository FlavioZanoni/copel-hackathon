import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export const DefaultPage = () => {
  return (
    <div className="h-[calc(100dvh-86px-88px)] p-6">
      <Skeleton height={28} width={250} />
      <Skeleton height={54} className="mt-6" />
    </div>
  )
}
