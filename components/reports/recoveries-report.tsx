"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample recoveries data
const sampleRecoveries = [
  {
    id: "REC-2023-0001",
    client: "Global Banking Corp",
    engagementCode: "GBFSI-2023-1234",
    amount: 7500,
    dateBilled: new Date("2023-10-15"),
    status: "Paid",
    invoiceNumber: "INV-2023-4567",
    paymentDate: new Date("2023-10-30"),
    skuNumber: "1001039-001-aaa",
    skuDescription: "Single Tenant Small/Medium",
    orderId: "ORD-2023-0042",
    expectedRecoveryDate: new Date("2023-11-15"),
    recoveryType: "License Fee",
    billingCycle: "One-time",
  },
  {
    id: "REC-2023-0002",
    client: "Energy Solutions Inc",
    engagementCode: "ENERGY-2023-5678",
    amount: 5000,
    dateBilled: new Date("2023-10-12"),
    status: "Pending",
    invoiceNumber: "INV-2023-4568",
    paymentDate: null,
    skuNumber: "1001039-002-bbb",
    skuDescription: "Multi Tenant Analytics",
    orderId: "ORD-2023-0041",
    expectedRecoveryDate: new Date("2023-11-12"),
    recoveryType: "Implementation",
    billingCycle: "One-time",
  },
  {
    id: "REC-2023-0003",
    client: "Tech Innovations GmbH",
    engagementCode: "TECH-2023-9012",
    amount: 8700,
    dateBilled: new Date("2023-10-08"),
    status: "Paid",
    invoiceNumber: "INV-2023-4569",
    paymentDate: new Date("2023-10-25"),
    skuNumber: "1001039-003-ccc",
    skuDescription: "Cloud Security Services",
    orderId: "ORD-2023-0040",
    expectedRecoveryDate: new Date("2023-10-25"),
    recoveryType: "License Fee",
    billingCycle: "Monthly",
  },
  {
    id: "REC-2023-0004",
    client: "Digital Futures UK",
    engagementCode: "TECH-2023-3456",
    amount: 12000,
    dateBilled: new Date("2023-09-30"),
    status: "Overdue",
    invoiceNumber: "INV-2023-4570",
    paymentDate: null,
    skuNumber: "1001039-004-ddd",
    skuDescription: "AI Development Framework",
    orderId: "ORD-2023-0039",
    expectedRecoveryDate: new Date("2023-10-30"),
    recoveryType: "License Fee",
    billingCycle: "Annual",
  },
  {
    id: "REC-2023-0005",
    client: "Manufacturing Solutions Japan",
    engagementCode: "MANUF-2023-7890",
    amount: 22000,
    dateBilled: new Date("2023-09-25"),
    status: "Paid",
    invoiceNumber: "INV-2023-4571",
    paymentDate: new Date("2023-10-10"),
    skuNumber: "1001039-005-eee",
    skuDescription: "Enterprise Integration Platform",
    orderId: "ORD-2023-0038",
    expectedRecoveryDate: new Date("2023-10-10"),
    recoveryType: "Implementation",
    billingCycle: "One-time",
  },
]

// Sample projected recoveries
const projectedRecoveries = [
  {
    period: "Current Month",
    amount: 35000,
  },
  {
    period: "Next Month",
    amount: 42000,
  },
  {
    period: "Remainder of Quarter",
    amount: 85000,
  },
  {
    period: "Remainder of Fiscal Year",
    amount: 320000,
  },
  {
    period: "Remainder of Calendar Year",
    amount: 125000,
  },
]

interface RecoveriesReportProps {
  dateRange: string
  statusFilters: string[]
  columns: string[]
  isLoading: boolean
}

export function RecoveriesReport({ dateRange, statusFilters, columns, isLoading }: RecoveriesReportProps) {
  const [sortField, setSortField] = useState("dateBilled")
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

  // Filter recoveries based on status
  const filteredRecoveries = sampleRecoveries.filter(
    (recovery) => statusFilters.length === 0 || statusFilters.includes(recovery.status.toLowerCase()),
  )

  // Sort recoveries
  const sortedRecoveries = [...filteredRecoveries].sort((a, b) => {
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
  const totalAmount = sortedRecoveries.reduce((sum, recovery) => sum + recovery.amount, 0)

  // Get column label
  const getColumnLabel = (columnId: string) => {
    const columnMap: Record<string, string> = {
      id: "Recovery ID",
      client: "Client",
      amount: "Amount",
      dateBilled: "Date Billed",
      expectedRecoveryDate: "Expected Recovery",
      status: "Status",
      recoveryType: "Type",
      engagementCode: "Engagement Code",
      invoiceNumber: "Invoice Number",
      billingCycle: "Billing Cycle",
    }
    return columnMap[columnId] || columnId
  }

  // Format cell value
  const formatCellValue = (recovery: any, columnId: string) => {
    const value = recovery[columnId]

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
            value === "Paid"
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
        <span className="ml-2 text-lg text-gray-300">Loading recoveries data...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="p-4 bg-[#0a0a14]/50 border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Recoveries Summary */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Current Recoveries</h3>
            <div className="bg-[#0a0a14] p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Total Recoveries ({sortedRecoveries.length})</div>
              <div className="text-2xl font-bold text-yellow-300">${totalAmount.toLocaleString()}</div>
            </div>
          </div>

          {/* Projected Recoveries */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Projected Recoveries</h3>
            <div className="bg-[#0a0a14] p-4 rounded-lg space-y-3">
              {projectedRecoveries.map((projection, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300">{projection.period}</span>
                  <span className="font-medium text-yellow-300">${projection.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-[#0a0a14]/30 border-b border-gray-800 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Showing {sortedRecoveries.length} recoveries for the selected period
        </div>
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
            {sortedRecoveries.map((recovery) => (
              <tr key={recovery.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                {columns.map((columnId) => (
                  <td key={`${recovery.id}-${columnId}`} className="px-4 py-4">
                    {formatCellValue(recovery, columnId)}
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

