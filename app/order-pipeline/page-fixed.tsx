"use client"
import { useState } from "react"
import {
  FileText,
  Calculator,
  ShoppingBag,
  CheckCircle,
  CheckSquare,
  XCircle,
  Archive,
  Download,
  RefreshCw,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"

// Define approval status types
type ApprovalStatus = "required" | "approved" | "rejected" | "not_required"

// Define approval types
interface Approval {
  type: "product" | "deployment" | "local_risk" | "global_risk" | "engagement"
  status: ApprovalStatus
  approver?: string
  email?: string
  date?: string
  comments?: string
}

export default function OrderPipelinePage() {
  // Sample data for orders with updated SKU format and approval information
  const sampleOrders = [
    // DRAFTS - All approvals pending
    {
      id: "DFT-2023-0001",
      name: "STAT Implementation - Draft",
      engagementCode: "GBFSI-2023-9999",
      country: "United States",
      skuNumber: "1001039-001-aaa",
      skuDescription: "Single Tenant Small/Medium",
      orderDate: new Date("2023-10-20T14:30:00-04:00"),
      commercialOwner: "Sarah Johnson",
      productApprovalRequired: true,
      engagementPartner: "Michael Chen",
      orderedBy: "Alex Johnson",
      stage: "draft",
      // All approvals required (pending)
      approvals: [
        { type: "product", status: "required", approver: "Product Team", email: "product.review@ey.com" },
        { type: "deployment", status: "required", approver: "Technical Team", email: "tech.deploy@ey.com" },
        { type: "local_risk", status: "required", approver: "Local Risk", email: "risk.local@us.ey.com" },
        { type: "global_risk", status: "required", approver: "Global Risk", email: "risk.global@ey.com" },
        { type: "engagement", status: "required", approver: "Michael Chen", email: "michael.chen@ey.com" },
      ],
      // Additional data for expanded views
      globalServiceCode: "GSC-1234-5678",
      engagementTeam: [
        { role: "Engagement Partner", name: "Michael Chen" },
        { role: "Senior Manager", name: "Jessica Wong" },
        { role: "Manager", name: "David Smith" },
        { role: "Associate", name: "Robert Johnson" },
      ],
      skuDetails: {
        fullDescription:
          "The Single-Tenant Small/Medium solution provides dedicated infrastructure for organizations requiring enhanced security, customization options, and performance.",
        increments: "Monthly",
        minIncrements: 1,
        cost: "$2,000 per month",
      },
      orderItems: [
        { name: "STAT Implementation Services", quantity: 1, cost: "$5,000" },
        { name: "Single Tenant Small/Medium License", quantity: 1, cost: "$2,000/month" },
        { name: "Training Package", quantity: 1, cost: "$1,500" },
      ],
    },
    // ... rest of the sample data
  ]

  // Sample data for recoveries (billing)
  const sampleRecoveries = [
    // ... sample recoveries data
  ]

  // Sample data for returns (refunds)
  const sampleReturns = [
    // ... sample returns data
  ]

  const [activeStep, setActiveStep] = useState(0)
  const [sortField, setSortField] = useState("id")
  const [sortDirection, setSortDirection] = useState("desc")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [timePeriod, setTimePeriod] = useState("ytd")
  const [recoverySort, setRecoverySort] = useState({ field: "dateBilled", direction: "desc" })
  const [returnSort, setReturnSort] = useState({ field: "dateRequested", direction: "desc" })

  // Track expanded rows
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [expandedSkuId, setExpandedSkuId] = useState<string | null>(null)
  const [expandedEngagementId, setExpandedEngagementId] = useState<string | null>(null)

  // Track active approval popup
  const [activeApprovalPopup, setActiveApprovalPopup] = useState<{
    orderId: string
    approvalType: string
  } | null>(null)

  const steps = [
    { id: 0, name: "Drafts", icon: FileText },
    { id: 1, name: "Estimates", icon: Calculator },
    { id: 2, name: "Orders", icon: ShoppingBag },
    { id: 3, name: "Product Side Approved", icon: CheckCircle },
    { id: 4, name: "Engagement Approved", icon: CheckSquare },
    { id: 5, name: "Cancelled Orders", icon: XCircle },
    { id: 6, name: "Past Orders", icon: Archive },
    { id: 7, name: "Recoveries", icon: Download },
    { id: 8, name: "Returns", icon: RefreshCw },
  ]

  // Helper functions and other code...

  return (
    <div className="flex h-screen bg-[#0a0a14]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <TopNavbar />
        <main className="flex-1">
          {/* Order Pipeline Navigation */}
          <div className="bg-[#1a1a2e] py-8 px-6 border-b border-gray-800">
            <h1 className="text-3xl font-bold text-white mb-8">Order Pipeline</h1>

            <div className="overflow-x-auto">
              <div className="flex min-w-max">
                {/* First 7 steps (0-6) */}
                {steps.slice(0, 7).map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    {/* Step button */}
                    <button
                      onClick={() => setActiveStep(step.id)}
                      className={`flex flex-col items-center relative group ${
                        activeStep === step.id ? "opacity-100" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      {/* Circle with number and icon */}
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${
                          activeStep === step.id
                            ? "bg-yellow-300 text-black"
                            : "bg-gray-800 text-gray-300 group-hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <StepIcon className="h-6 w-6" />
                          <span className="text-xs font-bold mt-1">{step.id}</span>
                        </div>
                      </div>

                      {/* Step name */}
                      <span
                        className={`text-sm font-medium whitespace-nowrap max-w-[120px] text-center ${
                          activeStep === step.id ? "text-yellow-300" : "text-gray-400 group-hover:text-white"
                        }`}
                      >
                        {step.name}
                      </span>

                      {/* Active indicator */}
                      {activeStep === step.id && (
                        <div className="absolute -bottom-4 w-full h-1 bg-yellow-300 rounded-full"></div>
                      )}
                    </button>

                    {/* Connector line between steps (except after Past Orders) */}
                    {index < 6 && (
                      <div
                        className={`w-12 h-[2px] mx-2 ${index < activeStep ? "bg-yellow-300" : "bg-gray-700"}`}
                      ></div>
                    )}
                  </div>
                ))}

                {/* Gap between Past Orders and Financial section */}
                <div className="ml-24 flex items-center">
                  {/* Recoveries (step 7) */}
                  <button
                    onClick={() => setActiveStep(7)}
                    className={`flex flex-col items-center relative group ${
                      activeStep === 7 ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${
                        activeStep === 7
                          ? "bg-yellow-300 text-black"
                          : "bg-purple-900 text-purple-200 group-hover:bg-purple-800"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <Download className="h-6 w-6" />
                        <span className="text-xs font-bold mt-1">7</span>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium whitespace-nowrap max-w-[120px] text-center ${
                        activeStep === 7 ? "text-yellow-300" : "text-purple-200 group-hover:text-purple-100"
                      }`}
                    >
                      Recoveries
                    </span>
                    {activeStep === 7 && (
                      <div className="absolute -bottom-4 w-full h-1 bg-yellow-300 rounded-full"></div>
                    )}
                  </button>

                  {/* Connector between Recoveries and Returns */}
                  <div className={`w-12 h-[2px] mx-2 ${activeStep > 7 ? "bg-yellow-300" : "bg-purple-600"}`}></div>

                  {/* Returns (step 8) */}
                  <button
                    onClick={() => setActiveStep(8)}
                    className={`flex flex-col items-center relative group ${
                      activeStep === 8 ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${
                        activeStep === 8
                          ? "bg-yellow-300 text-black"
                          : "bg-purple-900 text-purple-200 group-hover:bg-purple-800"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <RefreshCw className="h-6 w-6" />
                        <span className="text-xs font-bold mt-1">8</span>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium whitespace-nowrap max-w-[120px] text-center ${
                        activeStep === 8 ? "text-yellow-300" : "text-purple-200 group-hover:text-purple-100"
                      }`}
                    >
                      Returns
                    </span>
                    {activeStep === 8 && (
                      <div className="absolute -bottom-4 w-full h-1 bg-yellow-300 rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the content... */}
        </main>
      </div>
    </div>
  )
}

