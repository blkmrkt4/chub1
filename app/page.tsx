import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { ProductDetails } from "@/components/product-details"

export default function Home() {
  return (
    <div className="flex h-screen bg-[#0a0a14]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <TopNavbar />
        <main className="flex-1">
          <ProductDetails />
        </main>
      </div>
    </div>
  )
}

