import Link from "next/link"
import { Home, ShoppingBag, User, FileText, ShoppingCart, Database, Edit, ChevronRight } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-[204px] bg-[#0a0a14] border-r border-gray-800 hidden md:block">
      <div className="flex flex-col h-full">
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li>
              <Link href="/" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white">
                <Home className="h-5 w-5 mr-3" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/ct-marketplace"
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                <span>CT Marketplace</span>
              </Link>
            </li>
            <li>
              <Link
                href="/my-marketplace"
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <User className="h-5 w-5 mr-3" />
                <span>My Workspace</span>
              </Link>
            </li>
            <li>
              <Link
                href="/order-pipeline"
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                <span>Order Pipeline</span>
              </Link>
            </li>
            <li>
              <Link
                href="/reporting"
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <FileText className="h-5 w-5 mr-3" />
                <span>Reporting</span>
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                <span>Order Bundle</span>
              </Link>
            </li>

            {/* Separator and label for SKU Commercial Owner section */}
            <li className="mt-8 mb-2">
              <div className="px-4">
                <div className="border-t border-gray-800 pt-2">
                  <span className="text-xs text-gray-500">SKU COMMERCIAL OWNER</span>
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/sku-database"
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Database className="h-5 w-5 mr-3" />
                <span>SKU Database</span>
              </Link>
            </li>

            <li>
              <Link
                href="/edit-skus"
                className="flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <div className="flex items-center">
                  <Edit className="h-5 w-5 mr-3" />
                  <span>Edit these SKUs</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

