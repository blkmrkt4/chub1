"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Download,
  Plus,
  Minus,
  Save,
  Clock,
  AlertCircle,
  CheckCircle2,
  FileText,
  ShoppingCart,
  Info,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SKUInfoDialog } from "@/components/sku-info-dialog"

// Types
type OrderStatus = "Draft" | "Estimate" | "Ordered"

type BillingFrequency = "Monthly" | "Weekly" | "One Time" | "Hourly"

type OrderBundle = {
  id: string
  name: string
  description: string
  status: OrderStatus
  createdDate: Date
  lastModified: Date
  totalCost: number
  recurringCost: number
  oneTimeCost: number
  engagementCode: string
  clientName: string
  endDate?: Date
  items: OrderBundleItem[]
}

// Update the OrderBundleItem type to include quantity
type OrderBundleItem = {
  id: string
  skuNumber: string
  skuName: string
  description: string
  cost: number
  billingFrequency: BillingFrequency
  increments: number
  quantity: number // Add quantity separate from increments
  startDate: Date
  endDate?: Date
  isRecurring: boolean
  maxIncrements?: number
  notes?: string
  billedIncrements?: number // Track how many increments have been billed
}

// Update the sample data to include quantity and billedIncrements
const sampleOrderBundles: OrderBundle[] = [
  {
    id: "ORD-2023-0042",
    name: "Strategic Transaction Accounting Tool Implementation",
    description: "Full implementation of STAT with training and support",
    status: "Ordered",
    createdDate: new Date("2023-10-15"),
    lastModified: new Date("2023-10-20"),
    totalCost: 8500,
    recurringCost: 2000,
    oneTimeCost: 6500,
    engagementCode: "GBFSI-2023-1234",
    clientName: "Global Bank Corp",
    endDate: new Date("2024-10-15"),
    items: [
      {
        id: "item-001",
        skuNumber: "1001039-002-bbb",
        skuName: "Single Tenant Small/Medium",
        description: "CT-EYSTAT-STSM02",
        cost: 2000,
        billingFrequency: "Monthly",
        increments: 12,
        quantity: 1,
        startDate: new Date("2023-10-15"),
        endDate: new Date("2024-10-15"),
        isRecurring: true,
        billedIncrements: 5, // Assuming 5 months have been billed
      },
      {
        id: "item-002",
        skuNumber: "1001039-003-ccc",
        skuName: "One-time Setup Cost",
        description: "CT-EYSTAT-SETUP01",
        cost: 5000,
        billingFrequency: "One Time",
        increments: 1,
        quantity: 1,
        startDate: new Date("2023-10-15"),
        isRecurring: false,
        billedIncrements: 1, // One-time items are fully billed
      },
      {
        id: "item-003",
        skuNumber: "1001039-005-eee",
        skuName: "Deployment Labour Bundle",
        description: "CT-EYSTAT-DEPL01",
        cost: 150,
        billingFrequency: "Hourly",
        increments: 10,
        quantity: 1,
        startDate: new Date("2023-10-15"),
        isRecurring: false,
        billedIncrements: 10, // All hours have been billed
      },
    ],
  },
  {
    id: "ORD-2023-0039",
    name: "AI Development Framework Implementation",
    description: "AI Development Framework with professional services",
    status: "Estimate",
    createdDate: new Date("2023-09-28"),
    lastModified: new Date("2023-09-30"),
    totalCost: 12500,
    recurringCost: 4500,
    oneTimeCost: 8000,
    engagementCode: "TECH-2023-3456",
    clientName: "Tech Innovations Inc",
    items: [
      {
        id: "item-004",
        skuNumber: "1002045-001-aaa",
        skuName: "AI Development Framework Professional",
        description: "CT-AIDEV-PRO01",
        cost: 4500,
        billingFrequency: "Monthly",
        increments: 6,
        quantity: 1,
        startDate: new Date("2023-10-01"),
        endDate: new Date("2024-04-01"),
        isRecurring: true,
        billedIncrements: 0,
      },
      {
        id: "item-005",
        skuNumber: "1002045-002-bbb",
        skuName: "AI Implementation Services",
        description: "CT-AIDEV-IMP01",
        cost: 8000,
        billingFrequency: "One Time",
        increments: 1,
        quantity: 1,
        startDate: new Date("2023-10-01"),
        isRecurring: false,
        billedIncrements: 1,
      },
    ],
  },
  {
    id: "ORD-2023-0037",
    name: "DevOps Automation Suite",
    description: "DevOps Automation Suite with standard license",
    status: "Draft",
    createdDate: new Date("2023-09-10"),
    lastModified: new Date("2023-09-15"),
    totalCost: 7500,
    recurringCost: 2500,
    oneTimeCost: 5000,
    engagementCode: "TECH-2023-1357",
    clientName: "Software Solutions Ltd",
    items: [
      {
        id: "item-006",
        skuNumber: "1003056-001-aaa",
        skuName: "DevOps Automation Standard License",
        description: "CT-DEVOPS-STD01",
        cost: 2500,
        billingFrequency: "Monthly",
        increments: 12,
        quantity: 1,
        startDate: new Date("2023-09-15"),
        endDate: new Date("2024-09-15"),
        isRecurring: true,
        billedIncrements: 0,
      },
      {
        id: "item-007",
        skuNumber: "1003056-002-bbb",
        skuName: "DevOps Implementation Package",
        description: "CT-DEVOPS-IMP01",
        cost: 5000,
        billingFrequency: "One Time",
        increments: 1,
        quantity: 1,
        startDate: new Date("2023-09-15"),
        isRecurring: false,
        billedIncrements: 0,
      },
    ],
  },
]

// Update the statSkus to include quantity
const statSkus = [
  {
    id: "1001039-001-aaa",
    skuNumber: "CT-EYSTAT-MT01",
    skuName: "Multi-Tenant",
    description: "CT-EYSTAT-MT01",
    cost: 1500,
    billingFrequency: "Monthly",
    increments: 1,
    quantity: 1,
    startDate: new Date(),
    isRecurring: true,
  },
  {
    id: "1001039-002-bbb",
    skuNumber: "CT-EYSTAT-STSM02",
    skuName: "Single Tenant Small/Medium",
    description: "CT-EYSTAT-STSM02",
    cost: 2000,
    billingFrequency: "Monthly",
    increments: 1,
    quantity: 1,
    startDate: new Date(),
    isRecurring: true,
  },
  {
    id: "1001039-003-ccc",
    skuNumber: "CT-EYSTAT-SETUP01",
    skuName: "One-time Setup Cost",
    description: "CT-EYSTAT-SETUP01",
    cost: 5000,
    billingFrequency: "One Time",
    increments: 1,
    quantity: 1,
    startDate: new Date(),
    isRecurring: false,
  },
  {
    id: "1001039-004-ddd",
    skuNumber: "CT-EYSTAT-SUPP01",
    skuName: "Support Package",
    description: "CT-EYSTAT-SUPP01",
    cost: 800,
    billingFrequency: "Monthly",
    increments: 1,
    quantity: 1,
    startDate: new Date(),
    isRecurring: true,
  },
  {
    id: "1001039-005-eee",
    skuNumber: "CT-EYSTAT-DEPL01",
    skuName: "Deployment Labour Bundle",
    description: "CT-EYSTAT-DEPL01",
    cost: 150,
    billingFrequency: "Hourly",
    increments: 40,
    quantity: 1,
    startDate: new Date(),
    isRecurring: false,
  },
]

// Add a function to calculate fiscal year costs
const calculateFiscalYearCosts = (item: OrderBundleItem) => {
  if (!item.isRecurring) return { currentFYCost: item.cost * item.quantity * item.increments, nextFYCost: 0 }

  const startDate = new Date(item.startDate)
  const endDate = item.endDate ? new Date(item.endDate) : new Date(startDate)
  if (item.increments > 1 && !item.endDate) {
    endDate.setMonth(startDate.getMonth() + item.increments - 1)
  }

  // Calculate current fiscal year end
  const today = new Date()
  const currentYear = today.getMonth() >= 6 ? today.getFullYear() + 1 : today.getFullYear()
  const fiscalYearEnd = new Date(currentYear, 6, 1) // July 1st

  // If end date is before fiscal year end, all costs are in current FY
  if (endDate < fiscalYearEnd) {
    return {
      currentFYCost: item.cost * item.quantity * item.increments,
      nextFYCost: 0,
    }
  }

  // If start date is after fiscal year end, all costs are in next FY
  if (startDate >= fiscalYearEnd) {
    return {
      currentFYCost: 0,
      nextFYCost: item.cost * item.quantity * item.increments,
    }
  }

  // Calculate months in current FY and next FY
  let currentFYMonths = 0
  let nextFYMonths = 0

  // Clone dates to avoid modifying originals
  const iterDate = new Date(startDate)
  const endIterDate = new Date(endDate)

  // Count months in each fiscal year
  while (iterDate <= endIterDate) {
    if (iterDate < fiscalYearEnd) {
      currentFYMonths++
    } else {
      nextFYMonths++
    }
    iterDate.setMonth(iterDate.getMonth() + 1)
  }

  return {
    currentFYCost: item.cost * item.quantity * currentFYMonths,
    nextFYCost: item.cost * item.quantity * nextFYMonths,
  }
}

export default function OrderBundlePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")
  const skuParams = searchParams.getAll("sku")

  // State
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All")
  const [dateFilter, setDateFilter] = useState("all")
  const [orderBundles, setOrderBundles] = useState<OrderBundle[]>(sampleOrderBundles)
  const [selectedBundle, setSelectedBundle] = useState<OrderBundle | null>(null)
  const [showSearch, setShowSearch] = useState(true)
  const [newBundle, setNewBundle] = useState<OrderBundle | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [activeInfoDialog, setActiveInfoDialog] = useState<string | null>(null)

  // Handle SKUs from URL parameters
  useEffect(() => {
    if (skuParams.length > 0 && !orderId) {
      // Create a new draft bundle with the selected SKUs
      const selectedSkuItems = skuParams
        .map((skuId) => {
          const sku = statSkus.find((s) => s.id === skuId)
          if (!sku) return null

          return {
            id: `new-item-${Math.random().toString(36).substring(2, 9)}`,
            skuNumber: sku.skuNumber,
            skuName: sku.skuName,
            description: sku.description,
            cost: sku.cost,
            billingFrequency: sku.billingFrequency,
            increments: sku.increments,
            quantity: sku.quantity,
            startDate: new Date(),
            endDate:
              sku.isRecurring && sku.billingFrequency === "Monthly"
                ? new Date(new Date().setMonth(new Date().getMonth() + sku.increments))
                : undefined,
            isRecurring: sku.isRecurring,
          } as OrderBundleItem
        })
        .filter(Boolean) as OrderBundleItem[]

      if (selectedSkuItems.length > 0) {
        // Calculate costs
        let recurringCost = 0
        let oneTimeCost = 0

        selectedSkuItems.forEach((item) => {
          if (item.isRecurring) {
            recurringCost += item.cost * item.quantity * item.increments
          } else {
            oneTimeCost += item.cost * item.quantity * item.increments
          }
        })

        const newDraftBundle: OrderBundle = {
          id: `DRAFT-${Math.random().toString(36).substring(2, 9)}`,
          name: "Strategic Transaction Accounting Tool - New Draft",
          description: "Draft bundle created from STAT product page",
          status: "Draft",
          createdDate: new Date(),
          lastModified: new Date(),
          totalCost: recurringCost + oneTimeCost,
          recurringCost,
          oneTimeCost,
          engagementCode: "TBD",
          clientName: "Draft Client",
          items: selectedSkuItems,
        }

        setNewBundle(newDraftBundle)
        setSelectedBundle(newDraftBundle)
        setShowSearch(false)
      }
    }
  }, [skuParams, orderId])

  // Load order bundle from URL parameter
  useEffect(() => {
    if (orderId) {
      const bundle = orderBundles.find((b) => b.id === orderId)
      if (bundle) {
        setSelectedBundle(bundle)
        setShowSearch(false)
      }
    }
  }, [orderId, orderBundles])

  // Filter order bundles
  const filteredBundles = orderBundles.filter((bundle) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      bundle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bundle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bundle.engagementCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bundle.clientName.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "All" || bundle.status === statusFilter

    // Date filter
    let matchesDate = true
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)

    if (dateFilter === "30days") {
      matchesDate = bundle.lastModified >= thirtyDaysAgo
    } else if (dateFilter === "90days") {
      matchesDate = bundle.lastModified >= ninetyDaysAgo
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  // Handle bundle selection
  const handleSelectBundle = (bundle: OrderBundle) => {
    // Check if there are unsaved changes
    if (hasChanges && selectedBundle) {
      if (confirm("You have unsaved changes. Do you want to discard them?")) {
        setSelectedBundle(bundle)
        setShowSearch(false)
        setHasChanges(false)
        // Update URL without full page reload
        router.push(`/order-bundle?id=${bundle.id}`, { scroll: false })
      }
    } else {
      setSelectedBundle(bundle)
      setShowSearch(false)
      // Update URL without full page reload
      router.push(`/order-bundle?id=${bundle.id}`, { scroll: false })
    }
  }

  // Handle quantity changes
  const handleQuantityChange = (itemId: string, delta: number) => {
    if (!selectedBundle) return

    setSelectedBundle((prevBundle) => {
      if (!prevBundle) return null

      const newItems = prevBundle.items.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQuantity }
        }
        return item
      })

      // Recalculate costs
      let recurringCost = 0
      let oneTimeCost = 0

      newItems.forEach((item) => {
        const itemCost = item.cost * item.quantity * item.increments
        if (item.isRecurring) {
          recurringCost += itemCost
        } else {
          oneTimeCost += itemCost
        }
      })

      return {
        ...prevBundle,
        items: newItems,
        recurringCost,
        oneTimeCost,
        totalCost: recurringCost + oneTimeCost,
      }
    })

    setHasChanges(true)
  }

  // Handle increment changes
  const handleIncrementChange = (itemId: string, delta: number) => {
    if (!selectedBundle) return

    setSelectedBundle((prevBundle) => {
      if (!prevBundle) return null

      const newItems = prevBundle.items.map((item) => {
        if (item.id === itemId) {
          const newIncrements = Math.max(1, item.increments + delta)

          // Update end date for recurring items
          let newEndDate = item.endDate
          if (item.isRecurring && item.billingFrequency === "Monthly" && item.startDate instanceof Date) {
            newEndDate = new Date(item.startDate)
            newEndDate.setMonth(item.startDate.getMonth() + newIncrements - 1)
          }

          return {
            ...item,
            increments: newIncrements,
            endDate: newEndDate,
          }
        }
        return item
      })

      // Recalculate costs
      let recurringCost = 0
      let oneTimeCost = 0

      newItems.forEach((item) => {
        const itemCost = item.cost * item.quantity * item.increments
        if (item.isRecurring) {
          recurringCost += itemCost
        } else {
          oneTimeCost += itemCost
        }
      })

      return {
        ...prevBundle,
        items: newItems,
        recurringCost,
        oneTimeCost,
        totalCost: recurringCost + oneTimeCost,
      }
    })

    setHasChanges(true)
  }

  // Handle direct quantity update from input
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (!selectedBundle) return

    setSelectedBundle((prevBundle) => {
      if (!prevBundle) return null

      const newItems = prevBundle.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.max(1, newQuantity) }
        }
        return item
      })

      // Recalculate costs
      let recurringCost = 0
      let oneTimeCost = 0

      newItems.forEach((item) => {
        const itemCost = item.cost * item.quantity * item.increments
        if (item.isRecurring) {
          recurringCost += itemCost
        } else {
          oneTimeCost += itemCost
        }
      })

      return {
        ...prevBundle,
        items: newItems,
        recurringCost,
        oneTimeCost,
        totalCost: recurringCost + oneTimeCost,
      }
    })

    setHasChanges(true)
  }

  // Handle direct increments update from input
  const handleUpdateIncrements = (itemId: string, newIncrements: number) => {
    if (!selectedBundle) return

    setSelectedBundle((prevBundle) => {
      if (!prevBundle) return null

      const newItems = prevBundle.items.map((item) => {
        if (item.id === itemId) {
          // Update end date for recurring items
          let newEndDate = item.endDate
          if (item.isRecurring && item.billingFrequency === "Monthly" && item.startDate instanceof Date) {
            newEndDate = new Date(item.startDate)
            newEndDate.setMonth(item.startDate.getMonth() + newIncrements - 1)
          }

          return {
            ...item,
            increments: Math.max(1, newIncrements),
            endDate: newEndDate,
          }
        }
        return item
      })

      // Recalculate costs
      let recurringCost = 0
      let oneTimeCost = 0

      newItems.forEach((item) => {
        const itemCost = item.cost * item.quantity * item.increments
        if (item.isRecurring) {
          recurringCost += itemCost
        } else {
          oneTimeCost += itemCost
        }
      })

      return {
        ...prevBundle,
        items: newItems,
        recurringCost,
        oneTimeCost,
        totalCost: recurringCost + oneTimeCost,
      }
    })

    setHasChanges(true)
  }

  // Handle date change from timeline
  const handleTimelineClick = (itemId: string, date: Date) => {
    if (!selectedBundle || !(date instanceof Date)) return

    setSelectedBundle((prevBundle) => {
      if (!prevBundle) return null

      const newItems = prevBundle.items.map((item) => {
        if (item.id === itemId && item.isRecurring && item.startDate instanceof Date) {
          // Calculate months difference between start date and clicked date
          const startDate = new Date(item.startDate)
          const monthDiff =
            (date.getFullYear() - startDate.getFullYear()) * 12 + (date.getMonth() - startDate.getMonth()) + 1

          const newIncrements = Math.max(1, monthDiff)

          // Update end date
          const newEndDate = new Date(startDate)
          newEndDate.setMonth(startDate.getMonth() + newIncrements - 1)

          return {
            ...item,
            increments: newIncrements,
            endDate: newEndDate,
          }
        }
        return item
      })

      // Recalculate costs
      let recurringCost = 0
      let oneTimeCost = 0

      newItems.forEach((item) => {
        const itemCost = item.cost * item.quantity * item.increments
        if (item.isRecurring) {
          recurringCost += itemCost
        } else {
          oneTimeCost += itemCost
        }
      })

      return {
        ...prevBundle,
        items: newItems,
        recurringCost,
        oneTimeCost,
        totalCost: recurringCost + oneTimeCost,
      }
    })

    setHasChanges(true)
  }

  // Generate timeline visualization
  const generateTimeline = (item: OrderBundleItem) => {
    if (!(item.startDate instanceof Date)) {
      return null
    }

    if (!item.isRecurring || item.billingFrequency !== "Monthly") return null

    const startDate = new Date(item.startDate)
    const months = []
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const maxMonths = 24 // Show up to 24 months
    const isOrdered = selectedBundle?.status === "Ordered"

    // Calculate fiscal year boundary
    const fiscalYearEnd = new Date(today.getMonth() >= 6 ? today.getFullYear() + 1 : today.getFullYear(), 6, 1)

    for (let i = 0; i < maxMonths; i++) {
      const currentDate = new Date(startDate)
      currentDate.setMonth(startDate.getMonth() + i)

      const isIncluded = i < item.increments
      const isPast =
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) <
        new Date(today.getFullYear(), today.getMonth(), 1)
      const isCurrent = currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear
      const isFuture = !isPast && !isCurrent
      const isEndMonth = i === item.increments - 1
      const isFiscalYearBoundary = currentDate.getMonth() === 6 && currentDate.getDate() === 1

      // Determine the background color class based on conditions
      let bgColorClass = "bg-gray-800 text-gray-500" // Default for non-included months

      if (isIncluded) {
        if (isPast) {
          bgColorClass = "bg-gray-700 text-gray-300" // Past months
        } else if (isCurrent) {
          bgColorClass = "bg-yellow-300 text-black" // Current month
        } else if (isFuture) {
          bgColorClass = "bg-green-500 text-white" // Future months
        }
      }

      months.push(
        <div
          key={i}
          className={`h-8 w-8 flex items-center justify-center text-xs rounded-sm mx-0.5 ${bgColorClass} ${
            !isOrdered ? "cursor-pointer hover:bg-gray-700 hover:text-gray-300" : ""
          } relative`}
          onClick={() => !isOrdered && handleTimelineClick(item.id, currentDate)}
          title={`${currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}${isEndMonth ? " (End Date)" : ""}`}
        >
          {currentDate.toLocaleString("default", { month: "short" }).substring(0, 1)}
          {isEndMonth && <div className="absolute w-2 h-2 bg-red-500 rounded-full bottom-0"></div>}
          {isFiscalYearBoundary && <div className="absolute w-full h-1 bg-purple-500 bottom-0"></div>}
        </div>,
      )
    }

    return (
      <div className="flex flex-col mt-2 overflow-x-auto pb-2 max-w-full">
        <div className="flex items-center">
          <div className="text-xs text-gray-400 mr-2 whitespace-nowrap">Timeline:</div>
          <div className="flex">{months}</div>
        </div>
        <div className="flex mt-1 text-xs">
          <div className="flex items-center mr-3">
            <div className="w-3 h-3 bg-gray-700 rounded-sm mr-1"></div>
            <span className="text-gray-400">Past</span>
          </div>
          <div className="flex items-center mr-3">
            <div className="w-3 h-3 bg-yellow-300 rounded-sm mr-1"></div>
            <span className="text-gray-400">Current</span>
          </div>
          <div className="flex items-center mr-3">
            <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
            <span className="text-gray-400">Future</span>
          </div>
          <div className="flex items-center mr-3">
            <div className="w-3 h-3 rounded-sm mr-1 relative">
              <div className="absolute w-full h-full bg-red-500 rounded-full"></div>
            </div>
            <span className="text-gray-400">End Month</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-sm mr-1"></div>
            <span className="text-gray-400">Fiscal Year End (July 1)</span>
          </div>
        </div>
      </div>
    )
  }

  // Save changes
  const saveChanges = (newStatus?: OrderStatus) => {
    if (!selectedBundle) return

    const updatedBundle = {
      ...selectedBundle,
      lastModified: new Date(),
      status: newStatus || selectedBundle.status,
    }

    if (newBundle) {
      // Add the new bundle to the list
      setOrderBundles([...orderBundles, updatedBundle])
      setNewBundle(null)
    } else {
      // Update the order bundle in the list
      setOrderBundles(orderBundles.map((bundle) => (bundle.id === selectedBundle.id ? updatedBundle : bundle)))
    }

    // Update selected bundle
    setSelectedBundle(updatedBundle)
    setHasChanges(false)
  }

  // Cancel changes
  const cancelChanges = () => {
    if (newBundle) {
      // If canceling a new bundle, go back to search
      setSelectedBundle(null)
      setNewBundle(null)
      setShowSearch(true)
      router.push("/order-bundle", { scroll: false })
    } else if (selectedBundle) {
      // Find the original bundle from the list
      const originalBundle = orderBundles.find((b) => b.id === selectedBundle.id)
      if (originalBundle) {
        setSelectedBundle(originalBundle)
      }
      setHasChanges(false)
    }
  }

  // Get status badge
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "Draft":
        return (
          <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-800">
            <FileText className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        )
      case "Estimate":
        return (
          <Badge variant="outline" className="bg-yellow-900/30 text-yellow-300 border-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Estimate
          </Badge>
        )
      case "Ordered":
        return (
          <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Ordered
          </Badge>
        )
    }
  }

  const openSkuInfo = (skuId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveInfoDialog(skuId)
  }

  return (
    <div className="flex h-screen bg-[#0a0a14]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <TopNavbar />
        <main className="flex-1">
          {/* Header */}
          <div className="bg-[#1a1a2e] py-6 px-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <ShoppingCart className="h-6 w-6 text-yellow-300 mr-2" />
                  <h1 className="text-3xl font-bold text-white">Order Bundle</h1>
                </div>
                <p className="text-gray-300">View and manage your order bundles, estimates, and drafts</p>
              </div>
              <div className="flex items-center space-x-3">
                {selectedBundle && !showSearch && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                    onClick={() => {
                      if (hasChanges) {
                        if (confirm("You have unsaved changes. Do you want to discard them?")) {
                          setSelectedBundle(null)
                          setNewBundle(null)
                          setShowSearch(true)
                          setHasChanges(false)
                          router.push("/order-bundle", { scroll: false })
                        }
                      } else {
                        setSelectedBundle(null)
                        setNewBundle(null)
                        setShowSearch(true)
                        router.push("/order-bundle", { scroll: false })
                      }
                    }}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find Another Bundle
                  </Button>
                )}
                {hasChanges && (
                  <>
                    <Button
                      variant="outline"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      onClick={cancelChanges}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-yellow-300 hover:bg-yellow-400 text-black" onClick={() => saveChanges()}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Search Section */}
            {showSearch && (
              <div className="bg-[#1a1a2e] rounded-lg border border-gray-800 mb-6">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Find Order Bundle</h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                      onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {filterMenuOpen ? (
                        <ChevronDown className="h-4 w-4 ml-2" />
                      ) : (
                        <ChevronRight className="h-4 w-4 ml-2" />
                      )}
                    </Button>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search by ID, name, client..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0a0a14] border-gray-700 pl-10 text-gray-300 focus:border-yellow-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Filters */}
                {filterMenuOpen && (
                  <div className="p-4 border-b border-gray-800 bg-[#0a0a14]/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Status</label>
                        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                          <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Estimate">Estimate</SelectItem>
                            <SelectItem value="Ordered">Ordered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Date Range</label>
                        <Select value={dateFilter} onValueChange={setDateFilter}>
                          <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="30days">Last 30 Days</SelectItem>
                            <SelectItem value="90days">Last 90 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Results */}
                <div className="p-4">
                  <div className="text-sm text-gray-400 mb-3">
                    {filteredBundles.length} {filteredBundles.length === 1 ? "result" : "results"} found
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {filteredBundles.map((bundle) => (
                      <div
                        key={bundle.id}
                        className="bg-[#0a0a14] rounded-lg p-4 hover:bg-gray-800/50 cursor-pointer transition-colors"
                        onClick={() => handleSelectBundle(bundle)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <span className="text-white font-medium">{bundle.id}</span>
                              <span className="mx-2 text-gray-500">•</span>
                              <span className="text-gray-300">{bundle.name}</span>
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                              {bundle.clientName} | {bundle.engagementCode}
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {getStatusBadge(bundle.status)}
                            <div className="text-right">
                              <div className="text-yellow-300 font-medium">${bundle.totalCost.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">
                                Last modified:{" "}
                                {bundle.lastModified instanceof Date
                                  ? bundle.lastModified.toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })
                                  : "Unknown"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredBundles.length === 0 && (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400">No order bundles found matching your criteria</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Selected Bundle Details */}
            {selectedBundle && (
              <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
                <div className="p-4 border-b border-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-xl font-bold text-white">{selectedBundle.name}</h2>
                        <span className="ml-3">{getStatusBadge(selectedBundle.status)}</span>
                      </div>
                      <div className="text-gray-400 mt-1">
                        {selectedBundle.id} | {selectedBundle.engagementCode} | {selectedBundle.clientName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-300">
                        ${selectedBundle.totalCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">
                        Created:{" "}
                        {selectedBundle.createdDate instanceof Date
                          ? selectedBundle.createdDate.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Unknown"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bundle Summary */}
                <div className="p-4 border-b border-gray-800 bg-[#0a0a14]/50">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Recurring Costs</div>
                      <div className="text-lg font-medium text-white">
                        ${selectedBundle.recurringCost.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">One-Time Costs</div>
                      <div className="text-lg font-medium text-white">
                        ${selectedBundle.oneTimeCost.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Current Fiscal Year</div>
                      <div className="text-lg font-medium text-white">
                        $
                        {selectedBundle.items
                          ?.reduce((sum, item) => {
                            const { currentFYCost } = calculateFiscalYearCosts(item)
                            return sum + currentFYCost
                          }, 0)
                          ?.toLocaleString() || "0"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Items</div>
                      <div className="text-lg font-medium text-white">{selectedBundle.items.length || 0} SKUs</div>
                    </div>
                  </div>
                </div>

                {/* Bundle Items */}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-white mb-4">Bundle Items</h3>
                  <div className="space-y-4">
                    {selectedBundle.items?.map((item) => {
                      // Calculate fiscal year costs
                      const { currentFYCost, nextFYCost } = calculateFiscalYearCosts(item)
                      const totalItemCost = item.cost * item.quantity * item.increments

                      return (
                        <div key={item.id} className="bg-[#0a0a14] rounded-lg p-4 border border-gray-800">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-white font-medium">{item.skuName}</div>
                              <div className="text-sm text-gray-400 mt-1">
                                {item.skuNumber} | {item.description}
                                <button
                                  className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs bg-yellow-300 text-black hover:bg-yellow-400 focus:outline-none ml-2"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openSkuInfo(item.skuNumber, e)
                                  }}
                                >
                                  <Info className="h-3 w-3 mr-1" />
                                  INFO
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-yellow-300 font-medium">
                                ${item.cost.toLocaleString()}
                                {item.billingFrequency === "Hourly"
                                  ? "/hour"
                                  : item.billingFrequency === "Monthly"
                                    ? "/month"
                                    : ""}
                              </div>
                              <div className="text-xs text-gray-400">
                                {item.billingFrequency}
                                {item.isRecurring ? " (Recurring)" : ""}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-800">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <div className="flex flex-col space-y-4">
                                  <div>
                                    <div className="text-sm text-gray-400 mb-1">Quantity</div>
                                    <div className="flex items-center">
                                      {selectedBundle.status !== "Ordered" ? (
                                        <div className="flex items-center">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                          >
                                            <Minus className="h-4 w-4" />
                                          </Button>
                                          <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => {
                                              const newValue = Number.parseInt(e.target.value) || 1
                                              handleUpdateQuantity(item.id, newValue)
                                            }}
                                            className="mx-1 w-12 bg-gray-800 border border-gray-700 rounded text-center text-white py-1"
                                          />
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                          >
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <span className="text-white">{item.quantity}</span>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <div className="text-sm text-gray-400 mb-1">
                                      {item.billingFrequency === "Monthly"
                                        ? "Months"
                                        : item.billingFrequency === "Weekly"
                                          ? "Weeks"
                                          : item.billingFrequency === "Hourly"
                                            ? "Hours"
                                            : "Increments"}
                                    </div>
                                    <div className="flex items-center">
                                      {selectedBundle.status !== "Ordered" ? (
                                        <div className="flex items-center">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                                            onClick={() => handleIncrementChange(item.id, -1)}
                                          >
                                            <Minus className="h-4 w-4" />
                                          </Button>
                                          <input
                                            type="number"
                                            min="1"
                                            value={item.increments}
                                            onChange={(e) => {
                                              const newValue = Number.parseInt(e.target.value) || 1
                                              handleUpdateIncrements(item.id, newValue)
                                            }}
                                            className="mx-1 w-12 bg-gray-800 border border-gray-700 rounded text-center text-white py-1"
                                          />
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                                            onClick={() => handleIncrementChange(item.id, 1)}
                                          >
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <span className="text-white">{item.increments}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="text-sm text-gray-400 mb-2">Cost Breakdown</div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-300">Base Cost:</span>
                                    <span className="text-sm font-medium text-white">
                                      ${item.cost.toLocaleString()}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                      <span className="text-sm text-gray-300">Quantity:</span>
                                      <div className="w-full bg-gray-700 h-1 mx-2 rounded-full flex-1 max-w-[60px]">
                                        <div
                                          className="bg-yellow-300 h-1 rounded-full"
                                          style={{ width: `${Math.min(100, (item.quantity / 10) * 100)}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                    <span className="text-sm font-medium text-white">× {item.quantity}</span>
                                  </div>

                                  <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center">
                                      <span className="text-sm text-gray-300">Increments:</span>
                                      <div className="w-full bg-gray-700 h-1 mx-2 rounded-full flex-1 max-w-[60px]">
                                        <div
                                          className="bg-green-500 h-1 rounded-full"
                                          style={{ width: `${Math.min(100, (item.increments / 24) * 100)}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                    <span className="text-sm font-medium text-white">× {item.increments}</span>
                                  </div>

                                  <div className="h-px bg-gray-700 mb-3"></div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-300">Total:</span>
                                    <span className="text-base font-bold text-yellow-300">
                                      ${totalItemCost.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="text-sm text-gray-400 mb-1">Fiscal Year Split</div>
                                <div className="text-sm text-white">
                                  <div className="flex justify-between">
                                    <span>Current FY:</span>
                                    <span>${currentFYCost.toLocaleString()}</span>
                                  </div>
                                  {nextFYCost > 0 && (
                                    <div className="flex justify-between">
                                      <span>Next FY:</span>
                                      <span>${nextFYCost.toLocaleString()}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between mt-1 pt-1 border-t border-gray-700">
                                    <span>{item.isRecurring ? "Start/End Date" : "Date"}:</span>
                                    <span>
                                      {item.startDate instanceof Date
                                        ? item.startDate.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          })
                                        : "Invalid date"}
                                      {item.endDate && (
                                        <>
                                          {" "}
                                          -{" "}
                                          {item.endDate instanceof Date
                                            ? item.endDate.toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                              })
                                            : "Invalid date"}
                                        </>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Timeline visualization for recurring items */}
                            {generateTimeline(item)}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* No items message */}
                  {!selectedBundle.items.length && (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">No items in this bundle</p>
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Last modified:{" "}
                    {selectedBundle.lastModified instanceof Date
                      ? selectedBundle.lastModified.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Unknown"}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    {selectedBundle.status !== "Ordered" && (
                      <Button
                        className="bg-yellow-300 hover:bg-yellow-400 text-black"
                        onClick={() => saveChanges(selectedBundle.status === "Draft" ? "Estimate" : "Ordered")}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {selectedBundle.status === "Draft" ? "Submit Estimate" : "Complete Order"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      {activeInfoDialog && (
        <SKUInfoDialog
          isOpen={true}
          onClose={() => setActiveInfoDialog(null)}
          skuData={
            statSkus.find((sku) => sku.id === activeInfoDialog) || {
              id: "",
              name: "",
              description: "",
              returnable: false,
              status: "",
              type: "",
              minIncrements: 0,
              incrementPeriod: "",
            }
          }
        />
      )}
    </div>
  )
}

