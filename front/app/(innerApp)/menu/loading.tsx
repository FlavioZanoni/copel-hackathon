import Skeleton from "react-loading-skeleton"

export default function Loading() {
  return (
    <div className="h-screen">
      <Skeleton height={81} count={2} />
    </div>
  )
}
