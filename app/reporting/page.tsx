"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BarChart3, ChevronDown, ChevronRight, Download, Loader2, Save, Share2 } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { OrdersReport } from "@/components/reports/orders-report"
import { OrderBundleReport } from "@/components/reports/order-bundle-report"
import { RecoveriesReport } from "@/components/reports/recoveries-report"
import { ReturnsReport } from "@/components/reports/returns-report"
import { SavedReportsList } from "@/components/reports/saved-reports-list"

// Sample saved reports data
const sampleSavedReports = [
  {
    id: "rep-001",
    name: "Monthly Orders Summary",
    description: "Summary of all orders in the current month",
    type: "orders",
    createdBy: "Ashleigh Franklin",
    createdAt: new Date("2023-11-15"),
    lastRun: new Date("2023-11-20"),
    filters: {
      dateRange: "month",
      status: ["active", "pending"],
      engagementCodes: [],
    },
    columns: ["id", "name", "skuNumber", "orderDate", "status", "cost", "billingFrequency"],
    isFavorite: true,
  },
  {
    id: "rep-002",
    name: "Q4 Recoveries Projection",
    description: "Projected recoveries for Q4 2023",
    type: "recoveries",
    createdBy: "Ashleigh Franklin",
    createdAt: new Date("2023-10-05"),
    lastRun: new Date("2023-11-18"),
    filters: {
      dateRange: "quarter",
      status: ["paid", "pending"],
      engagementCodes: ["GBFSI-2023-1234", "TECH-2023-3456"],
    },
    columns: ["id", "client", "amount", "dateBilled", "expectedRecoveryDate", "status"],
    isFavorite: false,
  },
  {
    id: "rep-003",
    name: "STAT Bundle Analysis",
    description: "Detailed analysis of STAT product bundles",
    type: "order-bundle",
    createdBy: "Ashleigh Franklin",
    createdAt: new Date("2023-09-22"),
    lastRun: new Date("2023-11-10"),
    filters: {
      bundleIds: ["ORD-2023-0042"],
      includeItems: true,
    },
    columns: ["id", "name", "skuNumber", "cost", "increments", "endDate"],
    isFavorite: true,
  },
  {
    id: "rep-004",
    name: "YTD Returns Summary",
    description: "Summary of all returns year to date",
    type: "returns",
    createdBy: "Ashleigh Franklin",
    createdAt: new Date("2023-08-15"),
    lastRun: new Date("2023-11-15"),
    filters: {
      dateRange: "ytd",
      status: ["approved", "pending"],
      engagementCodes: [],
    },
    columns: ["id", "client", "amount", "dateRequested", "status", "returnType"],
    isFavorite: false,
  },
]

export default function ReportingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get report ID from URL if present
  const reportId = searchParams.get("id")

  const [activeTab, setActiveTab] = useState("reports")
  const [selectedReportType, setSelectedReportType] = useState("orders")
  const [filterMenuOpen, setFilterMenuOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [reportName, setReportName] = useState("")
  const [reportDescription, setReportDescription] = useState("")

  // State for selected columns
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])

  // State for filters
  const [dateRange, setDateRange] = useState("running-month")
  const [statusFilters, setStatusFilters] = useState<string[]>([])
  const [engagementCode, setEngagementCode] = useState("")
  const [bundleId, setBundleId] = useState("")

  // State for saved reports
  const [savedReports, setSavedReports] = useState(sampleSavedReports)
  const [selectedReport, setSelectedReport] = useState<(typeof sampleSavedReports)[0] | null>(null)

  // Load report if ID is provided
  useEffect(() => {
    if (reportId) {
      const report = savedReports.find((r) => r.id === reportId)
      if (report) {
        setSelectedReport(report)
        setSelectedReportType(report.type)
        setActiveTab("create")

        // Load report filters and columns
        if (report.filters.dateRange) {
          setDateRange(report.filters.dateRange as string)
        }
        if (report.filters.status) {
          setStatusFilters(report.filters.status as string[])
        }
        if (report.columns) {
          setSelectedColumns(report.columns as string[])
        }
        if (report.filters.bundleIds && report.filters.bundleIds.length > 0) {
          setBundleId(report.filters.bundleIds[0])
        }

        // Simulate loading
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    }
  }, [reportId, savedReports])

  // Handle report type change
  const handleReportTypeChange = (type: string) => {
    setSelectedReportType(type)

    // Set default columns based on report type
    switch (type) {
      case "orders":
        setSelectedColumns(["id", "name", "skuNumber", "orderDate", "status", "cost", "billingFrequency"])
        setStatusFilters(["active", "pending"])
        break
      case "order-bundle":
        setSelectedColumns(["id", "name", "skuNumber", "cost", "increments", "endDate"])
        break
      case "recoveries":
        setSelectedColumns(["id", "client", "amount", "dateBilled", "expectedRecoveryDate", "status"])
        setStatusFilters(["paid", "pending"])
        break
      case "returns":
        setSelectedColumns(["id", "client", "amount", "dateRequested", "status", "returnType"])
        setStatusFilters(["approved", "pending"])
        break
    }
  }

  // Handle running the report
  const handleRunReport = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  // Handle saving the report
  const handleSaveReport = () => {
    setIsSaving(true)

    // Create new report object
    const newReport = {
      id: `rep-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: reportName,
      description: reportDescription,
      type: selectedReportType,
      createdBy: "Ashleigh Franklin",
      createdAt: new Date(),
      lastRun: new Date(),
      filters: {
        dateRange,
        status: statusFilters,
        engagementCodes: engagementCode ? [engagementCode] : [],
        bundleIds: bundleId ? [bundleId] : [],
      },
      columns: selectedColumns,
      isFavorite: false,
    }

    // Add to saved reports
    setSavedReports([...savedReports, newReport])

    // Close dialog and reset form
    setTimeout(() => {
      setSaveDialogOpen(false)
      setIsSaving(false)
      setReportName("")
      setReportDescription("")
    }, 1000)
  }

  // Handle loading a saved report
  const handleLoadReport = (report: (typeof sampleSavedReports)[0]) => {
    setSelectedReport(report)
    setSelectedReportType(report.type)

    // Load report filters and columns
    if (report.filters.dateRange) {
      setDateRange(report.filters.dateRange as string)
    }
    if (report.filters.status) {
      setStatusFilters(report.filters.status as string[])
    }
    if (report.columns) {
      setSelectedColumns(report.columns as string[])
    }
    if (report.filters.bundleIds && report.filters.bundleIds.length > 0) {
      setBundleId(report.filters.bundleIds[0])
    }

    // Switch to create tab
    setActiveTab("create")

    // Simulate loading
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Get available columns based on report type
  const getAvailableColumns = () => {
    switch (selectedReportType) {
      case "orders":
        return [
          { id: "id", label: "Order ID" },
          { id: "name", label: "Order Name" },
          { id: "skuNumber", label: "SKU Number" },
          { id: "skuDescription", label: "SKU Description" },
          { id: "orderDate", label: "Order Date" },
          { id: "status", label: "Status" },
          { id: "cost", label: "Cost" },
          { id: "billingFrequency", label: "Billing Frequency" },
          { id: "nextBillingDate", label: "Next Billing Date" },
          { id: "engagementCode", label: "Engagement Code" },
          { id: "approvalStatus", label: "Approval Status" },
          { id: "commercialOwner", label: "Commercial Owner" },
        ]
      case "order-bundle":
        return [
          { id: "id", label: "Bundle ID" },
          { id: "name", label: "Bundle Name" },
          { id: "skuNumber", label: "SKU Number" },
          { id: "skuDescription", label: "SKU Description" },
          { id: "cost", label: "Cost" },
          { id: "increments", label: "Increments" },
          { id: "startDate", label: "Start Date" },
          { id: "endDate", label: "End Date" },
          { id: "totalCost", label: "Total Cost" },
          { id: "engagementCode", label: "Engagement Code" },
        ]
      case "recoveries":
        return [
          { id: "id", label: "Recovery ID" },
          { id: "client", label: "Client" },
          { id: "amount", label: "Amount" },
          { id: "dateBilled", label: "Date Billed" },
          { id: "expectedRecoveryDate", label: "Expected Recovery Date" },
          { id: "status", label: "Status" },
          { id: "recoveryType", label: "Recovery Type" },
          { id: "engagementCode", label: "Engagement Code" },
          { id: "invoiceNumber", label: "Invoice Number" },
          { id: "billingCycle", label: "Billing Cycle" },
        ]
      case "returns":
        return [
          { id: "id", label: "Return ID" },
          { id: "client", label: "Client" },
          { id: "amount", label: "Amount" },
          { id: "dateRequested", label: "Date Requested" },
          { id: "status", label: "Status" },
          { id: "reason", label: "Reason" },
          { id: "processingDate", label: "Processing Date" },
          { id: "skuNumber", label: "SKU Number" },
          { id: "skuDescription", label: "SKU Description" },
          { id: "orderId", label: "Order ID" },
          { id: "returnType", label: "Return Type" },
          { id: "engagementCode", label: "Engagement Code" },
        ]
      default:
        return []
    }
  }

  // Get status filter options based on report type
  const getStatusFilterOptions = () => {
    switch (selectedReportType) {
      case "orders":
        return [
          { id: "active", label: "Active" },
          { id: "pending", label: "Pending" },
          { id: "cancelled", label: "Cancelled" },
          { id: "expired", label: "Expired" },
        ]
      case "recoveries":
        return [
          { id: "paid", label: "Paid" },
          { id: "pending", label: "Pending" },
          { id: "overdue", label: "Overdue" },
        ]
      case "returns":
        return [
          { id: "approved", label: "Approved" },
          { id: "pending", label: "Pending" },
          { id: "rejected", label: "Rejected" },
        ]
      default:
        return []
    }
  }

  // Render the appropriate report component
  const renderReportComponent = () => {
    switch (selectedReportType) {
      case "orders":
        return <OrdersReport columns={selectedColumns} isLoading={isLoading} />
      case "order-bundle":
        return <OrderBundleReport bundleId={bundleId} columns={selectedColumns} isLoading={isLoading} />
      case "recoveries":
        return (
          <RecoveriesReport
            dateRange={dateRange}
            statusFilters={statusFilters}
            columns={selectedColumns}
            isLoading={isLoading}
          />
        )
      case "returns":
        return (
          <ReturnsReport
            dateRange={dateRange}
            statusFilters={statusFilters}
            columns={selectedColumns}
            isLoading={isLoading}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-[#0a0a14]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <TopNavbar />
        <main className="flex-1">
          {/* Header */}
          <div className="bg-[#1a1a2e] py-8 px-6 border-b border-gray-800">
            <div className="flex items-center mb-2">
              <BarChart3 className="h-6 w-6 text-yellow-300 mr-2" />
              <h1 className="text-3xl font-bold text-white">Reporting</h1>
            </div>
            <p className="text-gray-300">
              Create, save, and run custom reports to analyze your orders, recoveries, and returns.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="p-6">
            <Tabs defaultValue="reports" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList className="bg-[#1a1a2e]">
                  <TabsTrigger
                    value="reports"
                    className="data-[state=active]:bg-yellow-300 data-[state=active]:text-black"
                  >
                    My Reports
                  </TabsTrigger>
                  <TabsTrigger
                    value="create"
                    className="data-[state=active]:bg-yellow-300 data-[state=active]:text-black"
                  >
                    Create Report
                  </TabsTrigger>
                </TabsList>

                {activeTab === "create" && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      onClick={() => router.push("/reporting")}
                    >
                      Clear
                    </Button>
                    <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Report
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#1a1a2e] border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle>Save Report</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Save this report configuration for future use.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="report-name">Report Name</Label>
                            <Input
                              id="report-name"
                              placeholder="Enter report name"
                              value={reportName}
                              onChange={(e) => setReportName(e.target.value)}
                              className="bg-[#0a0a14] border-gray-700 text-gray-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="report-description">Description (Optional)</Label>
                            <Input
                              id="report-description"
                              placeholder="Enter description"
                              value={reportDescription}
                              onChange={(e) => setReportDescription(e.target.value)}
                              className="bg-[#0a0a14] border-gray-700 text-gray-300"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setSaveDialogOpen(false)}
                            className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSaveReport}
                            className="bg-yellow-300 hover:bg-yellow-400 text-black"
                            disabled={!reportName || isSaving}
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Report"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      className="bg-yellow-300 hover:bg-yellow-400 text-black"
                      onClick={handleRunReport}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Running...
                        </>
                      ) : (
                        <>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Run Report
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* My Reports Tab */}
              <TabsContent value="reports" className="mt-0">
                <SavedReportsList
                  reports={savedReports}
                  onLoadReport={handleLoadReport}
                  onDeleteReport={(id) => setSavedReports(savedReports.filter((r) => r.id !== id))}
                  onToggleFavorite={(id) => {
                    setSavedReports(savedReports.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)))
                  }}
                />
              </TabsContent>

              {/* Create Report Tab */}
              <TabsContent value="create" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Left Sidebar - Report Configuration */}
                  <div className="lg:col-span-1">
                    <div className="bg-[#1a1a2e] rounded-lg border border-gray-800 mb-6">
                      <div className="p-4 border-b border-gray-800">
                        <h2 className="text-lg font-bold text-white">Report Type</h2>
                      </div>
                      <div className="p-4">
                        <Select value={selectedReportType} onValueChange={handleReportTypeChange}>
                          <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="orders">Orders Report</SelectItem>
                            <SelectItem value="order-bundle">Order Bundle Report</SelectItem>
                            <SelectItem value="recoveries">Recoveries Report</SelectItem>
                            <SelectItem value="returns">Returns Report</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="mt-4 text-sm text-gray-400">
                          {selectedReportType === "orders" && (
                            <p>View and analyze orders with their approval status and details.</p>
                          )}
                          {selectedReportType === "order-bundle" && (
                            <p>Analyze a specific order bundle with detailed cost and timing information.</p>
                          )}
                          {selectedReportType === "recoveries" && (
                            <p>Track current and projected recovery amounts for fiscal and calendar years.</p>
                          )}
                          {selectedReportType === "returns" && (
                            <p>View returned product increments and associated cost returns.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
                      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-white">Filters</h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                          onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                        >
                          {filterMenuOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </Button>
                      </div>

                      {filterMenuOpen && (
                        <div className="p-4 space-y-6">
                          {/* Date Range Filter - for all except Order Bundle */}
                          {selectedReportType !== "order-bundle" && (
                            <div>
                              <label className="block text-sm text-gray-400 mb-2">Date Range</label>
                              <Select value={dateRange} onValueChange={setDateRange}>
                                <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                                  <SelectValue placeholder="Select date range" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="month">This Month</SelectItem>
                                  <SelectItem value="running-month">Last 30 Days</SelectItem>
                                  <SelectItem value="quarter">This Quarter</SelectItem>
                                  <SelectItem value="ytd">Year to Date</SelectItem>
                                  <SelectItem value="running-year">Last 365 Days</SelectItem>
                                  <SelectItem value="next-30-days">Next 30 Days</SelectItem>
                                  <SelectItem value="rest-of-fy">Rest of Fiscal Year</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {/* Status Filter - for all except Order Bundle */}
                          {selectedReportType !== "order-bundle" && (
                            <div>
                              <label className="block text-sm text-gray-400 mb-2">Status</label>
                              <div className="space-y-2">
                                {getStatusFilterOptions().map((option) => (
                                  <div key={option.id} className="flex items-center">
                                    <Checkbox
                                      id={`status-${option.id}`}
                                      checked={statusFilters.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setStatusFilters([...statusFilters, option.id])
                                        } else {
                                          setStatusFilters(statusFilters.filter((id) => id !== option.id))
                                        }
                                      }}
                                      className="data-[state=checked]:bg-yellow-300 data-[state=checked]:text-black"
                                    />
                                    <label htmlFor={`status-${option.id}`} className="ml-2 text-sm text-gray-300">
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Engagement Code Filter - for all except Order Bundle */}
                          {selectedReportType !== "order-bundle" && (
                            <div>
                              <label className="block text-sm text-gray-400 mb-2">Engagement Code</label>
                              <Input
                                placeholder="Enter code (optional)"
                                value={engagementCode}
                                onChange={(e) => setEngagementCode(e.target.value)}
                                className="bg-[#0a0a14] border-gray-700 text-gray-300"
                              />
                            </div>
                          )}

                          {/* Bundle ID Filter - for Order Bundle only */}
                          {selectedReportType === "order-bundle" && (
                            <div>
                              <label className="block text-sm text-gray-400 mb-2">Order Bundle ID</label>
                              <Select value={bundleId} onValueChange={setBundleId}>
                                <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                                  <SelectValue placeholder="Select bundle" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ORD-2023-0042">ORD-2023-0042 (STAT Implementation)</SelectItem>
                                  <SelectItem value="ORD-2023-0039">ORD-2023-0039 (AI Development)</SelectItem>
                                  <SelectItem value="ORD-2023-0037">ORD-2023-0037 (DevOps Automation)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="bg-[#1a1a2e] rounded-lg border border-gray-800 mt-6">
                      <div className="p-4 border-b border-gray-800">
                        <h2 className="text-lg font-bold text-white">Columns</h2>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                          {getAvailableColumns().map((column) => (
                            <div key={column.id} className="flex items-center">
                              <Checkbox
                                id={`column-${column.id}`}
                                checked={selectedColumns.includes(column.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedColumns([...selectedColumns, column.id])
                                  } else {
                                    setSelectedColumns(selectedColumns.filter((id) => id !== column.id))
                                  }
                                }}
                                className="data-[state=checked]:bg-yellow-300 data-[state=checked]:text-black"
                              />
                              <label htmlFor={`column-${column.id}`} className="ml-2 text-sm text-gray-300">
                                {column.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Report Preview */}
                  <div className="lg:col-span-3">
                    <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
                      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <div>
                          <h2 className="text-lg font-bold text-white">
                            {selectedReport ? selectedReport.name : "Report Preview"}
                          </h2>
                          {selectedReport && <p className="text-sm text-gray-400 mt-1">{selectedReport.description}</p>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                            disabled={isLoading}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                            disabled={isLoading}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>

                      <div className="p-0">{renderReportComponent()}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

