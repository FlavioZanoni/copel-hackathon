import Skeleton from "react-loading-skeleton"

export const FormSkeletons = ({ inputCount }: { inputCount: number }) => {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex w-full flex-col gap-4">
        <Skeleton
          height={32}
          width={80}
          style={{
            borderRadius: 12,
          }}
        />

        {Array(inputCount)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={48} />
          ))}
      </div>

      <div className="flex gap-4 self-end">
        <Skeleton
          height={40}
          width={90}
          style={{
            borderRadius: 12,
          }}
        />
        <Skeleton
          height={40}
          width={90}
          style={{
            borderRadius: 12,
          }}
        />{" "}
      </div>
    </div>
  )
}
