"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample orders data
const sampleOrders = [
  {
    id: "ORD-2023-0042",
    name: "Strategic Transaction Accounting Tool",
    skuNumber: "CT-EYSTAT-STSM02",
    skuDescription: "Single Tenant Small/Medium",
    orderDate: new Date("2023-10-15"),
    status: "Active",
    cost: 2000,
    billingFrequency: "Monthly",
    nextBillingDate: new Date("2023-12-15"),
    engagementCode: "GBFSI-2023-1234",
    approvalStatus: "Approved",
    commercialOwner: "Sarah Johnson",
  },
  {
    id: "ORD-2023-0039",
    name: "AI Development Framework",
    skuNumber: "CT-AIDEV-PRO01",
    skuDescription: "Professional License",
    orderDate: new Date("2023-09-28"),
    status: "Active",
    cost: 4500,
    billingFrequency: "Monthly",
    nextBillingDate: new Date("2023-12-28"),
    engagementCode: "TECH-2023-3456",
    approvalStatus: "Pending",
    commercialOwner: "Emily Brown",
  },
  {
    id: "ORD-2023-0037",
    name: "DevOps Automation Suite",
    skuNumber: "CT-DEVOPS-STD01",
    skuDescription: "Standard License",
    orderDate: new Date("2023-09-10"),
    status: "Active",
    cost: 2500,
    billingFrequency: "Monthly",
    nextBillingDate: new Date("2023-12-10"),
    engagementCode: "TECH-2023-1357",
    approvalStatus: "Approved",
    commercialOwner: "Robert Smith",
  },
  {
    id: "ORD-2023-0036",
    name: "Blockchain Solutions Implementation",
    skuNumber: "CT-BLOCK-ENT01",
    skuDescription: "Enterprise License",
    orderDate: new Date("2023-08-25"),
    status: "Active",
    cost: 5000,
    billingFrequency: "Monthly",
    nextBillingDate: new Date("2023-12-25"),
    engagementCode: "FINTECH-2023-2468",
    approvalStatus: "Approved",
    commercialOwner: "David Williams",
  },
  {
    id: "ORD-2023-0035",
    name: "Healthcare Systems Implementation",
    skuNumber: "CT-HEALTH-STD01",
    skuDescription: "Standard License",
    orderDate: new Date("2023-08-10"),
    status: "Pending",
    cost: 3500,
    billingFrequency: "Monthly",
    nextBillingDate: new Date("2023-12-10"),
    engagementCode: "HEALTH-2023-3579",
    approvalStatus: "Pending",
    commercialOwner: "Sarah Johnson",
  },
]

interface OrdersReportProps {
  columns: string[]
  isLoading: boolean
}

export function OrdersReport({ columns, isLoading }: OrdersReportProps) {
  const [sortField, setSortField] = useState("orderDate")
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

  // Sort orders
  const sortedOrders = [...sampleOrders].sort((a, b) => {
    const fieldA = a[sortField as keyof typeof a]
    const fieldB = b[sortField as keyof typeof a]

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
    }

    if (typeof fieldA === "boolean" && typeof fieldB === "boolean") {
      return sortDirection === "asc" ? Number(fieldA) - Number(fieldB) : Number(fieldB) - Number(fieldA)
    }

    if (fieldA instanceof Date && fieldB instanceof Date) {
      return sortDirection === "asc" ? fieldA.getTime() - fieldB.getTime() : fieldB.getTime() - fieldA.getTime()
    }

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA
    }

    return 0
  })

  // Get column label
  const getColumnLabel = (columnId: string) => {
    const columnMap: Record<string, string> = {
      id: "Order ID",
      name: "Order Name",
      skuNumber: "SKU Number",
      skuDescription: "SKU Description",
      orderDate: "Order Date",
      status: "Status",
      cost: "Cost",
      billingFrequency: "Billing Frequency",
      nextBillingDate: "Next Billing Date",
      engagementCode: "Engagement Code",
      approvalStatus: "Approval Status",
      commercialOwner: "Commercial Owner",
    }
    return columnMap[columnId] || columnId
  }

  // Format cell value
  const formatCellValue = (order: any, columnId: string) => {
    const value = order[columnId]

    if (value instanceof Date) {
      return value.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }

    if (columnId === "cost") {
      return `$${value.toLocaleString()}`
    }

    if (columnId === "status" || columnId === "approvalStatus") {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "Active" || value === "Approved"
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

    return value
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-300" />
        <span className="ml-2 text-lg text-gray-300">Loading report data...</span>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="p-4 bg-[#0a0a14]/50 border-b border-gray-800 flex justify-between items-center">
        <div className="text-sm text-gray-400">Showing {sortedOrders.length} orders</div>
        <Button variant="outline" size="sm" className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

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
          {sortedOrders.map((order) => (
            <tr key={order.id} className="border-t border-gray-800 hover:bg-gray-800/30">
              {columns.map((columnId) => (
                <td key={`${order.id}-${columnId}`} className="px-4 py-4">
                  {formatCellValue(order, columnId)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

