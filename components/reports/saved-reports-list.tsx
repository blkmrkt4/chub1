"use client"

import { useState } from "react"
import {
  Calendar,
  ChevronRight,
  Download,
  FileText,
  Loader2,
  Package,
  RefreshCw,
  Search,
  ShoppingBag,
  Star,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SavedReportsListProps {
  reports: any[]
  onLoadReport: (report: any) => void
  onDeleteReport: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export function SavedReportsList({ reports, onLoadReport, onDeleteReport, onToggleFavorite }: SavedReportsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Filter reports based on search query
  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group reports by type
  const favoriteReports = filteredReports.filter((report) => report.isFavorite)
  const ordersReports = filteredReports.filter((report) => report.type === "orders" && !report.isFavorite)
  const bundleReports = filteredReports.filter((report) => report.type === "order-bundle" && !report.isFavorite)
  const recoveriesReports = filteredReports.filter((report) => report.type === "recoveries" && !report.isFavorite)
  const returnsReports = filteredReports.filter((report) => report.type === "returns" && !report.isFavorite)

  // Get icon for report type
  const getReportIcon = (type: string) => {
    switch (type) {
      case "orders":
        return <ShoppingBag className="h-5 w-5 text-blue-400" />
      case "order-bundle":
        return <Package className="h-5 w-5 text-purple-400" />
      case "recoveries":
        return <Download className="h-5 w-5 text-green-400" />
      case "returns":
        return <RefreshCw className="h-5 w-5 text-orange-400" />
      default:
        return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  // Handle delete confirmation
  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      setIsDeleting(true)

      // Simulate API call
      setTimeout(() => {
        onDeleteReport(confirmDeleteId)
        setIsDeleting(false)
        setConfirmDeleteId(null)
      }, 1000)
    }
  }

  // Render report card
  const renderReportCard = (report: any) => (
    <div
      key={report.id}
      className="bg-[#1a1a2e] rounded-lg border border-gray-800 hover:border-yellow-300 hover:shadow-md hover:shadow-yellow-300/10 transition-all cursor-pointer transform hover:-translate-y-1"
      onClick={() => onLoadReport(report)}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="mr-3 mt-1">{getReportIcon(report.type)}</div>
          <div>
            <h3 className="font-medium text-white">{report.name}</h3>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{report.description}</p>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(report.id)
            }}
            className={`text-gray-400 hover:text-yellow-300 ${report.isFavorite ? "text-yellow-300" : ""}`}
          >
            <Star className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="px-4 py-3 bg-[#0a0a14]/30 border-t border-gray-800 flex justify-between items-center rounded-b-lg">
        <div className="flex items-center text-xs text-gray-400">
          <Calendar className="h-3 w-3 mr-1" />
          <span>
            {report.lastRun.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation()
              setConfirmDeleteId(report.id)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <div className="bg-yellow-300/20 rounded-full p-1">
            <ChevronRight className="h-4 w-4 text-yellow-300" />
          </div>
        </div>
      </div>
      <div className="absolute -top-2 -right-2 bg-[#0a0a14] px-2 py-1 rounded text-xs font-medium">
        {report.type === "orders" && "Orders"}
        {report.type === "order-bundle" && "Bundle"}
        {report.type === "recoveries" && "Recoveries"}
        {report.type === "returns" && "Returns"}
      </div>
    </div>
  )

  return (
    <div>
      <div className="bg-[#1a1a2e] rounded-lg border border-gray-800 mb-6">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">My Saved Reports</h2>
            <p className="text-sm text-gray-400 mt-1">Select a report to view or edit</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a14] border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
            />
          </div>
        </div>

        <div className="p-6">
          {filteredReports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No reports found</h3>
              <p className="text-gray-400">
                {searchQuery ? "Try a different search term" : "Create and save reports to see them here"}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Favorites Section */}
              {favoriteReports.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-6 flex items-center border-b border-gray-800 pb-3">
                    <Star className="h-5 w-5 text-yellow-300 mr-2" />
                    Favorites
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{favoriteReports.map(renderReportCard)}</div>
                </div>
              )}

              {/* Orders Reports Section */}
              {ordersReports.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-6 flex items-center border-b border-gray-800 pb-3">
                    <ShoppingBag className="h-5 w-5 text-blue-400 mr-2" />
                    Orders Reports
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{ordersReports.map(renderReportCard)}</div>
                </div>
              )}

              {/* Bundle Reports Section */}
              {bundleReports.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-6 flex items-center border-b border-gray-800 pb-3">
                    <Package className="h-5 w-5 text-purple-400 mr-2" />
                    Bundle Reports
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{bundleReports.map(renderReportCard)}</div>
                </div>
              )}

              {/* Recoveries Reports Section */}
              {recoveriesReports.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-6 flex items-center border-b border-gray-800 pb-3">
                    <Download className="h-5 w-5 text-green-400 mr-2" />
                    Recoveries Reports
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{recoveriesReports.map(renderReportCard)}</div>
                </div>
              )}

              {/* Returns Reports Section */}
              {returnsReports.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-6 flex items-center border-b border-gray-800 pb-3">
                    <RefreshCw className="h-5 w-5 text-orange-400 mr-2" />
                    Returns Reports
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{returnsReports.map(renderReportCard)}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDeleteId} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
        <DialogContent className="bg-[#1a1a2e] border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete Report</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this report? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteId(null)}
              className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Report"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

