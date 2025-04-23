// app/admin/loading.tsx (or wherever your loading file is)

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats or Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>

      {/* Table Header */}
      <Skeleton className="h-6 w-40 mt-10" />

      {/* Table Rows */}
      <div className="space-y-4 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            <Skeleton className="h-6 w-full col-span-1" />
            <Skeleton className="h-6 w-full col-span-1" />
            <Skeleton className="h-6 w-full col-span-1" />
            <Skeleton className="h-6 w-full col-span-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
