"use client"

import { ChevronDown, ChevronRight, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Sample order bundle data
const sampleBundles = {
  "ORD-2023-0042": {
    id: "ORD-2023-0042",
    name: "Strategic Transaction Accounting Tool Bundle",
    engagementCode: "GBFSI-2023-1234",
    orderDate: new Date("2023-10-15"),
    items: [
      {
        id: "ITEM-001",
        name: "Single Tenant Small/Medium",
        skuNumber: "CT-EYSTAT-STSM02",
        skuDescription: "Single Tenant Small/Medium",
        cost: 2000,
        billingFrequency: "Monthly",
        increments: 12,
        startDate: new Date("2023-10-15"),
        endDate: new Date("2024-10-14"),
        totalCost: 24000,
      },
      {
        id: "ITEM-002",
        name: "Implementation Services",
        skuNumber: "CT-EYSTAT-IMP01",
        skuDescription: "Implementation Services",
        cost: 5000,
        billingFrequency: "One Time",
        increments: 1,
        startDate: new Date("2023-10-15"),
        endDate: new Date("2023-10-15"),
        totalCost: 5000,
      },
      {
        id: "ITEM-003",
        name: "Training Package",
        skuNumber: "CT-EYSTAT-TRN01",
        skuDescription: "Training Package",
        cost: 1500,
        billingFrequency: "One Time",
        increments: 1,
        startDate: new Date("2023-10-15"),
        endDate: new Date("2023-10-15"),
        totalCost: 1500,
      },
    ],
    totalRecurringCost: 2000,
    totalOneTimeCost: 6500,
    totalAnnualCost: 30500,
  },
  "ORD-2023-0039": {
    id: "ORD-2023-0039",
    name: "AI Development Framework Bundle",
    engagementCode: "TECH-2023-3456",
    orderDate: new Date("2023-09-28"),
    items: [
      {
        id: "ITEM-001",
        name: "AI Framework License",
        skuNumber: "CT-AIDEV-PRO01",
        skuDescription: "Professional License",
        cost: 4500,
        billingFrequency: "Monthly",
        increments: 12,
        startDate: new Date("2023-09-28"),
        endDate: new Date("2024-09-27"),
        totalCost: 54000,
      },
      {
        id: "ITEM-002",
        name: "Implementation Services",
        skuNumber: "CT-AIDEV-IMP01",
        skuDescription: "Implementation Services",
        cost: 7500,
        billingFrequency: "One Time",
        increments: 1,
        startDate: new Date("2023-09-28"),
        endDate: new Date("2023-09-28"),
        totalCost: 7500,
      },
      {
        id: "ITEM-003",
        name: "Developer Training",
        skuNumber: "CT-AIDEV-TRN01",
        skuDescription: "Developer Training",
        cost: 2000,
        billingFrequency: "One Time",
        increments: 2,
        startDate: new Date("2023-09-28"),
        endDate: new Date("2023-09-28"),
        totalCost: 4000,
      },
    ],
    totalRecurringCost: 4500,
    totalOneTimeCost: 11500,
    totalAnnualCost: 65500,
  },
  "ORD-2023-0037": {
    id: "ORD-2023-0037",
    name: "DevOps Automation Suite Bundle",
    engagementCode: "TECH-2023-1357",
    orderDate: new Date("2023-09-10"),
    items: [
      {
        id: "ITEM-001",
        name: "DevOps Suite License",
        skuNumber: "CT-DEVOPS-STD01",
        skuDescription: "Standard License",
        cost: 2500,
        billingFrequency: "Monthly",
        increments: 12,
        startDate: new Date("2023-09-10"),
        endDate: new Date("2024-09-09"),
        totalCost: 30000,
      },
      {
        id: "ITEM-002",
        name: "Pipeline Setup Services",
        skuNumber: "CT-DEVOPS-IMP01",
        skuDescription: "Pipeline Setup Services",
        cost: 6000,
        billingFrequency: "One Time",
        increments: 1,
        startDate: new Date("2023-09-10"),
        endDate: new Date("2023-09-10"),
        totalCost: 6000,
      },
      {
        id: "ITEM-003",
        name: "Team Training",
        skuNumber: "CT-DEVOPS-TRN01",
        skuDescription: "Team Training",
        cost: 3000,
        billingFrequency: "One Time",
        increments: 1,
        startDate: new Date("2023-09-10"),
        endDate: new Date("2023-09-10"),
        totalCost: 3000,
      },
    ],
    totalRecurringCost: 2500,
    totalOneTimeCost: 9000,
    totalAnnualCost: 39000,
  },
}

interface OrderBundleReportProps {
  bundleId: string
  columns: string[]
  isLoading: boolean
}

export function OrderBundleReport({ bundleId, columns, isLoading }: OrderBundleReportProps) {
  const [expandedItems, setExpandedItems] = useState<boolean>(true)

  // Get bundle data
  const bundle = bundleId ? sampleBundles[bundleId as keyof typeof sampleBundles] : null

  // Get column label
  const getColumnLabel = (columnId: string) => {
    const columnMap: Record<string, string> = {
      id: "Item ID",
      name: "Item Name",
      skuNumber: "SKU Number",
      skuDescription: "SKU Description",
      cost: "Cost",
      billingFrequency: "Billing Frequency",
      increments: "Increments",
      startDate: "Start Date",
      endDate: "End Date",
      totalCost: "Total Cost",
    }
    return columnMap[columnId] || columnId
  }

  // Format cell value
  const formatCellValue = (item: any, columnId: string) => {
    const value = item[columnId]

    if (value instanceof Date) {
      return value.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }

    if (columnId === "cost" || columnId === "totalCost") {
      return `$${value.toLocaleString()}`
    }

    return value
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-300" />
        <span className="ml-2 text-lg text-gray-300">Loading bundle data...</span>
      </div>
    )
  }

  if (!bundle) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400">Please select an order bundle to view details</div>
      </div>
    )
  }

  return (
    <div>
      <div className="p-4 bg-[#0a0a14]/50 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-white">{bundle.name}</h3>
          <div className="text-sm text-gray-400 mt-1">
            Engagement: {bundle.engagementCode} | Ordered: {bundle.orderDate.toLocaleDateString()}
          </div>
        </div>
        <Button variant="outline" size="sm" className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="p-4 bg-[#0a0a14]/30 border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0a0a14] p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Monthly Recurring Cost</div>
            <div className="text-2xl font-bold text-yellow-300">${bundle.totalRecurringCost.toLocaleString()}</div>
          </div>
          <div className="bg-[#0a0a14] p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">One-Time Costs</div>
            <div className="text-2xl font-bold text-yellow-300">${bundle.totalOneTimeCost.toLocaleString()}</div>
          </div>
          <div className="bg-[#0a0a14] p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Total Annual Cost</div>
            <div className="text-2xl font-bold text-yellow-300">${bundle.totalAnnualCost.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="font-medium text-white flex items-center">
          <button onClick={() => setExpandedItems(!expandedItems)} className="mr-2 focus:outline-none">
            {expandedItems ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>
          Bundle Items ({bundle.items.length})
        </h3>
      </div>

      {expandedItems && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#0a0a14] text-left">
              <tr>
                {columns.map((columnId) => (
                  <th key={columnId} className="px-4 py-3 text-gray-300">
                    {getColumnLabel(columnId)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bundle.items.map((item) => (
                <tr key={item.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                  {columns.map((columnId) => (
                    <td key={`${item.id}-${columnId}`} className="px-4 py-4">
                      {formatCellValue(item, columnId)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

