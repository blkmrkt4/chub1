import { Skeleton } from "@/components/ui/skeleton"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"

export default function Loading() {
  return (
    <div className="flex h-screen bg-[#0a0a14]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <TopNavbar />
        <main className="flex-1">
          {/* Header Skeleton */}
          <div className="bg-[#1a1a2e] py-6 px-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-8 w-64 bg-gray-800 mb-2" />
                <Skeleton className="h-4 w-96 bg-gray-800" />
              </div>
              <Skeleton className="h-10 w-32 bg-gray-800" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-6">
            <div className="bg-[#1a1a2e] rounded-lg border border-gray-800 mb-6">
              <div className="p-4 border-b border-gray-800">
                <Skeleton className="h-6 w-48 bg-gray-800" />
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full bg-gray-800" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

