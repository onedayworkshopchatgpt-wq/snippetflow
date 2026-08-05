import { Skeleton } from "@/components/ui/skeleton"

export default function SnippetsLoading() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:py-10">
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-1.5">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-9 w-32" />
        </div>

        <Skeleton className="h-9 w-72 rounded-lg" />

        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
