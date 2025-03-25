"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample returns data
const sampleReturns = [
  {
    id: "RET-2023-0001",
    client: "Global Banking Corp",
    engagementCode: "GBFSI-2023-1234",
    amount: 1500,
    dateRequested: new Date("2023-10-20"),
    status: "Approved",
    reason: "Service not used",
    processingDate: new Date("2023-10-25"),
    skuNumber: "1001039-001-aaa",
    skuDescription: "Single Tenant Small/Medium - Training Component",
    orderId: "ORD-2023-0042",
    approvedBy: "Sarah Johnson",
    expectedReturnDate: new Date("2023-11-10"),
    returnType: "Partial Refund",
    originalInvoice: "INV-2023-4567",
  },
  {
    id: "RET-2023-0002",
    client: "Energy Solutions Inc",
    engagementCode: "ENERGY-2023-5678",
    amount: 2000,
    dateRequested: new Date("2023-10-18"),
    status: "Pending",
    reason: "Duplicate charge",
    processingDate: null,
    skuNumber: "1001039-002-bbb",
    skuDescription: "Data Migration Services",
    orderId: "ORD-2023-0041",
    approvedBy: null,
    expectedReturnDate: new Date("2023-11-15"),
    returnType: "Full Refund",
    originalInvoice: "INV-2023-4568",
  },
  {
    id: "RET-2023-0003",
    client: "Tech Innovations GmbH",
    engagementCode: "TECH-2023-9012",
    amount: 1200,
    dateRequested: new Date("2023-10-10"),
    status: "Rejected",
    reason: "Outside refund window",
    processingDate: new Date("2023-10-12"),
    skuNumber: "1001039-003-ccc",
    skuDescription: "Security Training",
    orderId: "ORD-2023-0040",
    approvedBy: "Robert Smith",
    expectedReturnDate: null,
    returnType: "Partial Refund",
    originalInvoice: "INV-2023-4569",
  },
  {
    id: "RET-2023-0004",
    client: "Digital Futures UK",
    engagementCode: "TECH-2023-3456",
    amount: 7500,
    dateRequested: new Date("2023-10-05"),
    status: "Approved",
    reason: "Service level not met",
    processingDate: new Date("2023-10-10"),
    skuNumber: "1001039-004-ddd",
    skuDescription: "Implementation Services",
    orderId: "ORD-2023-0039",
    approvedBy: "Emily Brown",
    expectedReturnDate: new Date("2023-10-25"),
    returnType: "Partial Refund",
    originalInvoice: "INV-2023-4570",
  },
  {
    id: "RET-2023-0005",
    client: "Manufacturing Solutions Japan",
    engagementCode: "MANUF-2023-7890",
    amount: 5000,
    dateRequested: new Date("2023-09-28"),
    status: "Pending",
    reason: "Scope change",
    processingDate: null,
    skuNumber: "1001039-005-eee",
    skuDescription: "Connector Development (2 units)",
    orderId: "ORD-2023-0038",
    approvedBy: null,
    expectedReturnDate: new Date("2023-10-30"),
    returnType: "Partial Refund",
    originalInvoice: "INV-2023-4571",
  },
]

interface ReturnsReportProps {
  dateRange: string
  statusFilters: string[]
  columns: string[]
  isLoading: boolean
}

export function ReturnsReport({ dateRange, statusFilters, columns, isLoading }: ReturnsReportProps) {
  const [sortField, setSortField] = useState("dateRequested")
  const [sortDirection, setSortDirection] = useState("desc")

  // Handle sort click
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter returns based on status
  const filteredReturns = sampleReturns.filter(
    (returnItem) => statusFilters.length === 0 || statusFilters.includes(returnItem.status.toLowerCase()),
  )

  // Sort returns
  const sortedReturns = [...filteredReturns].sort((a, b) => {
    const fieldA = a[sortField as keyof typeof a]
    const fieldB = b[sortField as keyof typeof a]

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
    }

    if (fieldA instanceof Date && fieldB instanceof Date) {
      return sortDirection === "asc" ? fieldA.getTime() - fieldB.getTime() : fieldB.getTime() - fieldA.getTime()
    }

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA
    }

    return 0
  })

  // Calculate total amount
  const totalAmount = sortedReturns.reduce((sum, returnItem) => sum + returnItem.amount, 0)

  // Calculate amounts by status
  const approvedAmount = sortedReturns
    .filter((item) => item.status === "Approved")
    .reduce((sum, item) => sum + item.amount, 0)

  const pendingAmount = sortedReturns
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + item.amount, 0)

  // Get column label
  const getColumnLabel = (columnId: string) => {
    const columnMap: Record<string, string> = {
      id: "Return ID",
      client: "Client",
      amount: "Amount",
      dateRequested: "Date Requested",
      status: "Status",
      reason: "Reason",
      processingDate: "Processing Date",
      skuNumber: "SKU Number",
      skuDescription: "SKU Description",
      orderId: "Order ID",
      returnType: "Return Type",
      engagementCode: "Engagement Code",
    }
    return columnMap[columnId] || columnId
  }

  // Format cell value
  const formatCellValue = (returnItem: any, columnId: string) => {
    const value = returnItem[columnId]

    if (value instanceof Date) {
      return value.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }

    if (columnId === "amount") {
      return `$${value.toLocaleString()}`
    }

    if (columnId === "status") {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "Approved"
              ? "bg-green-900/50 text-green-300"
              : value === "Pending"
                ? "bg-yellow-900/50 text-yellow-300"
                : "bg-red-900/50 text-red-300"
          }`}
        >
          {value}
        </span>
      )
    }

    return value || "-"
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-300" />
        <span className="ml-2 text-lg text-gray-300">Loading returns data...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="p-4 bg-[#0a0a14]/50 border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a0a14] p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Total Returns</div>
            <div className="text-2xl font-bold text-yellow-300">${totalAmount.toLocaleString()}</div>
          </div>
          <div className="bg-[#0a0a14] p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Approved Returns</div>
            <div className="text-2xl font-bold text-green-300">${approvedAmount.toLocaleString()}</div>
          </div>
          <div className="bg-[#0a0a14] p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Pending Returns</div>
            <div className="text-2xl font-bold text-yellow-300">${pendingAmount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-[#0a0a14]/30 border-b border-gray-800 flex justify-between items-center">
        <div className="text-sm text-gray-400">Showing {sortedReturns.length} returns for the selected period</div>
        <Button variant="outline" size="sm" className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#0a0a14] text-left">
            <tr>
              {columns.map((columnId) => (
                <th
                  key={columnId}
                  className="px-4 py-3 text-gray-300 cursor-pointer"
                  onClick={() => handleSort(columnId)}
                >
                  <div className="flex items-center">
                    <span>{getColumnLabel(columnId)}</span>
                    {sortField === columnId &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4 ml-1 text-yellow-300" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1 text-yellow-300" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedReturns.map((returnItem) => (
              <tr key={returnItem.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                {columns.map((columnId) => (
                  <td key={`${returnItem.id}-${columnId}`} className="px-4 py-4">
                    {formatCellValue(returnItem, columnId)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

