"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Filter,
  LayoutDashboard,
  Package,
  RefreshCw,
  Search,
  ShoppingBag,
  Star,
  User,
  Users,
  Zap,
  Check,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function MyWorkspacePage() {
  const [activeTab, setActiveTab] = useState("orders")
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [timePeriod, setTimePeriod] = useState("running-month")

  // Sample user data
  const userData = {
    name: "Ashleigh Franklin",
    email: "ashleigh.franklin@ey.com",
    role: "Senior Manager",
    sector: "Financial Services",
    country: "United States",
    globalServiceCodes: ["GSC-1234-5678", "GSC-2345-6789"],
    totalSpend: 45750,
    activeOrders: 3,
    pendingApprovals: 2,
    recentActivity: [
      {
        id: "act-001",
        type: "order_created",
        description: "Created order for Strategic Transaction Accounting Tool",
        date: new Date("2023-11-20T14:30:00"),
      },
      {
        id: "act-002",
        type: "approval_received",
        description: "Received approval for Data Analytics Platform",
        date: new Date("2023-11-18T09:15:00"),
      },
      {
        id: "act-003",
        type: "estimate_created",
        description: "Created estimate for Cloud Security Services",
        date: new Date("2023-11-15T16:45:00"),
      },
    ],
  }

  // Sample orders data
  const ordersData = [
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
    },
  ]

  // Sample drafts data
  const draftsData = [
    {
      id: "DFT-2023-0001",
      name: "Data Analytics Platform",
      skuNumber: "CT-DATANA-ENT01",
      skuDescription: "Enterprise License",
      createdDate: new Date("2023-11-18"),
      lastModified: new Date("2023-11-19"),
      estimatedCost: 3500,
      billingFrequency: "Monthly",
      engagementCode: "ENERGY-2023-8888",
    },
    {
      id: "DFT-2023-0002",
      name: "Cloud Security Services",
      skuNumber: "CT-CLOUDSEC-PRO01",
      skuDescription: "Professional License",
      createdDate: new Date("2023-11-15"),
      lastModified: new Date("2023-11-15"),
      estimatedCost: 3000,
      billingFrequency: "Monthly",
      engagementCode: "TECH-2023-7777",
    },
  ]

  // Sample estimates data
  const estimatesData = [
    {
      id: "EST-2023-0001",
      name: "Enterprise Integration Platform",
      skuNumber: "CT-INTEG-ENT01",
      skuDescription: "Enterprise License",
      createdDate: new Date("2023-11-10"),
      expiryDate: new Date("2023-12-10"),
      estimatedCost: 3500,
      billingFrequency: "Monthly",
      engagementCode: "MANUF-2023-7890",
      status: "Pending Approval",
    },
    {
      id: "EST-2023-0002",
      name: "Blockchain Solutions",
      skuNumber: "CT-BLOCK-STD01",
      skuDescription: "Standard License",
      createdDate: new Date("2023-11-05"),
      expiryDate: new Date("2023-12-05"),
      estimatedCost: 5000,
      billingFrequency: "Monthly",
      engagementCode: "FINTECH-2023-2468",
      status: "Pending Client Approval",
    },
  ]

  // Sample recommended products based on user profile
  const recommendedProducts = [
    {
      id: "rec-001",
      name: "Intelligent Document Processing",
      description: "AI-powered document analysis and extraction",
      relevance: "Based on your Financial Services sector",
      type: "Agentic Tool",
      icon: <Zap className="h-8 w-8 text-purple-400" />,
    },
    {
      id: "rec-002",
      name: "Predictive Analytics Agent",
      description: "Forecast trends and identify opportunities",
      relevance: "Recommended for your current projects",
      type: "Agentic Tool",
      icon: <BarChart3 className="h-8 w-8 text-blue-400" />,
    },
    {
      id: "rec-003",
      name: "Multi-Agent Collaboration Platform",
      description: "Coordinate AI agents across your organization",
      relevance: "Popular in Financial Services",
      type: "Technology Product",
      icon: <Users className="h-8 w-8 text-green-400" />,
    },
  ]

  return (
    <div className="flex h-screen bg-[#0a0a14]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <TopNavbar />
        <main className="flex-1">
          {/* Personalized Header */}
          <div className="bg-gradient-to-r from-[#0a0a14] to-[#1a237e] py-8 px-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <User className="h-6 w-6 text-yellow-300 mr-2" />
                  <h1 className="text-3xl font-bold text-white">My Workspace</h1>
                </div>
                <p className="text-gray-300">
                  Welcome back, <span className="text-white font-medium">{userData.name}</span>. Here's an overview of
                  your technology products and services.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button className="bg-yellow-300 hover:bg-yellow-400 text-black">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Products
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-[#1a1a2e] rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Monthly Spend</span>
                  <BarChart3 className="h-5 w-5 text-yellow-300" />
                </div>
                <div className="text-2xl font-bold text-white">${userData.totalSpend.toLocaleString()}</div>
                <div className="text-xs text-gray-400 mt-1">Across all active products</div>
              </div>
              <div className="bg-[#1a1a2e] rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Active Orders</span>
                  <Package className="h-5 w-5 text-yellow-300" />
                </div>
                <div className="text-2xl font-bold text-white">{userData.activeOrders}</div>
                <div className="text-xs text-gray-400 mt-1">Products currently in use</div>
              </div>
              <div className="bg-[#1a1a2e] rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Pending Approvals</span>
                  <Clock className="h-5 w-5 text-yellow-300" />
                </div>
                <div className="text-2xl font-bold text-white">{userData.pendingApprovals}</div>
                <div className="text-xs text-gray-400 mt-1">Awaiting action</div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6">
            <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList className="bg-[#1a1a2e]">
                  <TabsTrigger
                    value="orders"
                    className="data-[state=active]:bg-yellow-300 data-[state=active]:text-black"
                  >
                    My Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="drafts"
                    className="data-[state=active]:bg-yellow-300 data-[state=active]:text-black"
                  >
                    My Drafts
                  </TabsTrigger>
                  <TabsTrigger
                    value="estimates"
                    className="data-[state=active]:bg-yellow-300 data-[state=active]:text-black"
                  >
                    My Estimates
                  </TabsTrigger>
                </TabsList>

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
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full bg-[#0a0a14] border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
                    />
                  </div>
                </div>
              </div>

              {/* Filters */}
              {filterMenuOpen && (
                <div className="mb-6 p-4 bg-[#1a1a2e] rounded-lg border border-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Time Period</label>
                      <select
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                        className="w-full bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
                      >
                        <option value="month">This Month</option>
                        <option value="running-month">Last 30 Days</option>
                        <option value="quarter">This Quarter</option>
                        <option value="ytd">Year to Date</option>
                        <option value="running-year">Last 365 Days</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Engagement Code</label>
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="w-full bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Status</label>
                      <select className="w-full bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-yellow-300">
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="expired">Expired</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600 mr-2"
                    >
                      Reset
                    </Button>
                    <Button className="bg-yellow-300 hover:bg-yellow-400 text-black">Apply Filters</Button>
                  </div>
                </div>
              )}

              {/* Orders Tab Content */}
              <TabsContent value="orders" className="mt-0">
                <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
                  <div className="p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">My Active Orders</h2>
                    <p className="text-gray-400 text-sm mt-1">
                      Products and services you're currently using across your engagements
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead className="bg-[#0a0a14] text-left">
                        <tr>
                          <th className="px-4 py-3 text-gray-300">Order ID / Name</th>
                          <th className="px-4 py-3 text-gray-300">SKU / Description</th>
                          <th className="px-4 py-3 text-gray-300">Status</th>
                          <th className="px-4 py-3 text-gray-300">Cost</th>
                          <th className="px-4 py-3 text-gray-300">Next Billing</th>
                          <th className="px-4 py-3 text-gray-300">Engagement</th>
                          <th className="px-4 py-3 text-gray-300 w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersData.map((order) => (
                          <tr key={order.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                            <td className="px-4 py-4">
                              <div className="font-medium text-white">{order.id}</div>
                              <div className="text-sm text-gray-400">{order.name}</div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-300">{order.skuNumber}</div>
                              <div className="text-sm text-gray-400">{order.skuDescription}</div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="px-2 py-1 rounded-full text-xs bg-green-900/50 text-green-300">
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-yellow-300 font-medium">${order.cost.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">{order.billingFrequency}</div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-300">
                                {order.nextBillingDate.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-300">{order.engagementCode}</div>
                            </td>
                            <td className="px-4 py-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                              >
                                <ChevronRight className="h-5 w-5" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                    <div className="text-sm text-gray-400">Showing {ordersData.length} orders</div>
                    <Link href="/order-pipeline" className="text-yellow-300 text-sm hover:underline flex items-center">
                      View all in Order Pipeline
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </TabsContent>

              {/* Drafts Tab Content */}
              <TabsContent value="drafts" className="mt-0">
                <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
                  <div className="p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">My Drafts</h2>
                    <p className="text-gray-400 text-sm mt-1">Orders you've started but haven't submitted yet</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead className="bg-[#0a0a14] text-left">
                        <tr>
                          <th className="px-4 py-3 text-gray-300">Draft ID / Name</th>
                          <th className="px-4 py-3 text-gray-300">SKU / Description</th>
                          <th className="px-4 py-3 text-gray-300">Created</th>
                          <th className="px-4 py-3 text-gray-300">Last Modified</th>
                          <th className="px-4 py-3 text-gray-300">Est. Cost</th>
                          <th className="px-4 py-3 text-gray-300">Engagement</th>
                          <th className="px-4 py-3 text-gray-300 w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {draftsData.map((draft) => (
                          <tr key={draft.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                            <td className="px-4 py-4">
                              <div className="font-medium text-white">{draft.id}</div>
                              <div className="text-sm text-gray-400">{draft.name}</div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-300">{draft.skuNumber}</div>
                              <div className="text-sm text-gray-400">{draft.skuDescription}</div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-300">
                                {draft.createdDate.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-300">
                                {draft.lastModified.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-yellow-300 font-medium">${draft.estimatedCost.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">{draft.billingFrequency}</div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-300">{draft.engagementCode}</div>
                            </td>
                            <td className="px-4 py-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                              >
                                <ChevronRight className="h-5 w-5" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                    <div className="text-sm text-gray-400">Showing {draftsData.length} drafts</div>
                    <Button className="bg-yellow-300 hover:bg-yellow-400 text-black">
                      <FileText className="h-4 w-4 mr-2" />
                      Create New Draft
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Estimates Tab Content */}
              <TabsContent value="estimates" className="mt-0">
                <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
                  <div className="p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">My Estimates</h2>
                    <p className="text-gray-400 text-sm mt-1">Estimates you've created that are awaiting approval</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead className="bg-[#0a0a14] text-left">
                        <tr>
                          <th className="px-4 py-3 text-gray-300">Estimate ID / Name</th>
                          <th className="px-4 py-3 text-gray-300">SKU / Description</th>
                          <th className="px-4 py-3 text-gray-300">Created</th>
                          <th className="px-4 py-3 text-gray-300">Expires</th>
                          <th className="px-4 py-3 text-gray-300">Est. Cost</th>
                          <th className="px-4 py-3 text-gray-300">Status</th>
                          <th className="px-4 py-3 text-gray-300 w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {estimatesData.map((estimate) => (
                          <tr key={estimate.id} className="border-t border-gray-800 hover:bg-gray-800/30">
                            <td className="px-4 py-4">
                              <div className="font-medium text-white">{estimate.id}</div>
                              <div className="text-sm text-gray-400">{estimate.name}</div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-300">{estimate.skuNumber}</div>
                              <div className="text-sm text-gray-400">{estimate.skuDescription}</div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-300">
                                {estimate.createdDate.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-300">
                                {estimate.expiryDate.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-yellow-300 font-medium">
                                ${estimate.estimatedCost.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-400">{estimate.billingFrequency}</div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/50 text-yellow-300">
                                {estimate.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                              >
                                <ChevronRight className="h-5 w-5" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 border-t border-gray-800 flex justify-between items-center">
                    <div className="text-sm text-gray-400">Showing {estimatesData.length} estimates</div>
                    <Button className="bg-yellow-300 hover:bg-yellow-400 text-black">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Status
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Recommendations Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Star className="h-5 w-5 text-yellow-300 mr-2" />
                  Recommended for You
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                >
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#1a1a2e] rounded-lg border border-gray-800 p-4 hover:border-yellow-300/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-[#0a0a14] p-2 rounded-md">{product.icon}</div>
                      <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">{product.type}</span>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-300 mb-3">{product.description}</p>
                    <div className="text-xs text-yellow-300/80 mb-3">{product.relevance}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
                    >
                      Learn More
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Calendar className="h-5 w-5 text-yellow-300 mr-2" />
                  Recent Activity
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                >
                  View All
                </Button>
              </div>

              <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
                <div className="p-4 border-b border-gray-800">
                  <div className="flex items-center">
                    <LayoutDashboard className="h-5 w-5 text-yellow-300 mr-2" />
                    <h3 className="text-lg font-medium text-white">Activity Timeline</h3>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    {userData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex">
                        <div className="mr-4 relative">
                          <div
                            className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center",
                              activity.type === "order_created"
                                ? "bg-blue-900/50 text-blue-300"
                                : activity.type === "approval_received"
                                  ? "bg-green-900/50 text-green-300"
                                  : "bg-purple-900/50 text-purple-300",
                            )}
                          >
                            {activity.type === "order_created" ? (
                              <ShoppingBag className="h-4 w-4" />
                            ) : activity.type === "approval_received" ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </div>
                          <div className="absolute top-8 bottom-0 left-1/2 w-0.5 bg-gray-700 -translate-x-1/2"></div>
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="text-white font-medium">{activity.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {activity.date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}{" "}
                            at{" "}
                            {activity.date.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

