"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ShoppingCart, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { OrderBundlePanel } from "@/components/order-bundle-panel"
import { SKUInfoDialog } from "@/components/sku-info-dialog"

// Sample SKU data
const skuInfoData = {
  "option-1": {
    id: "CT-EYSTAT-MT01",
    name: "Multi Tenant",
    description:
      "The Multi-Tenant solution for EY STAT provides a cost-effective way to leverage our Strategic Transaction Accounting Tool. This shared infrastructure model maintains strict data isolation between clients while offering all core functionalities needed for transaction accounting. The solution includes our standard support package with regular updates to ensure you always have access to the latest features and compliance requirements. Ideal for small to medium businesses that need powerful accounting tools without the overhead of dedicated infrastructure.",
    returnable: true,
    status: "Active for Engagement Billing",
    type: "GigaBytes",
    minIncrements: 5,
    incrementPeriod: "Monthly",
  },
  "option-2": {
    id: "CT-EYSTAT-STSM02",
    name: "Single Tenant Small/Medium",
    description:
      "The Single-Tenant Small/Medium solution provides dedicated infrastructure for organizations requiring enhanced security, customization options, and performance. This package includes priority support with faster response times and a dedicated account manager to help with any issues. The dedicated environment allows for more extensive customization to meet specific business requirements and integration with your existing systems. This option is recommended for medium-sized organizations with complex transaction accounting needs or those in regulated industries with specific compliance requirements.",
    returnable: false,
    status: "Active for Regional Billing Only",
    type: "Fixed",
    minIncrements: 1,
    incrementPeriod: "Monthly",
  },
  "option-3": {
    id: "CT-EYSTAT-SETUP01",
    name: "One-time Setup Cost",
    description:
      "The One-time Setup Cost covers the initial implementation, configuration, and deployment of the Strategic Transaction Accounting Tool in your environment. This includes data migration assistance, initial user setup, and configuration of the system to match your specific accounting workflows and requirements. Our implementation team will work closely with your stakeholders to ensure a smooth transition and proper knowledge transfer. This is a mandatory one-time fee for all new implementations regardless of which tenant option you select.",
    returnable: false,
    status: "Active but not billed",
    type: "Hours",
    minIncrements: 40,
    incrementPeriod: "One Time",
  },
}

export function ProductDetails() {
  const [activeTab, setActiveTab] = useState("description")
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [isOrderBundleOpen, setIsOrderBundleOpen] = useState(false)
  const [selectedSkus, setSelectedSkus] = useState<string[]>(["option-2"]) // Default to the middle option
  const [activeInfoDialog, setActiveInfoDialog] = useState<string | null>(null)

  // Add a new state to track increment values for each SKU
  const [incrementValues, setIncrementValues] = useState<Record<string, number>>({
    "option-1": 5, // Initialize with minimum values from skuInfoData
    "option-2": 1,
    "option-3": 40,
  })

  // Add a function to handle increment changes
  const handleIncrementChange = (skuId: string, value: string) => {
    const numValue = Number.parseInt(value, 10)
    const minValue = skuInfoData[skuId as keyof typeof skuInfoData].minIncrements

    // Ensure the value is not less than the minimum
    if (!isNaN(numValue) && numValue >= minValue) {
      setIncrementValues((prev) => ({
        ...prev,
        [skuId]: numValue,
      }))
    }
  }

  // Add functions to increment and decrement values
  const incrementValue = (skuId: string) => {
    setIncrementValues((prev) => ({
      ...prev,
      [skuId]: prev[skuId] + 1,
    }))
  }

  const decrementValue = (skuId: string) => {
    const minValue = skuInfoData[skuId as keyof typeof skuInfoData].minIncrements
    setIncrementValues((prev) => ({
      ...prev,
      [skuId]: Math.max(prev[skuId] - 1, minValue),
    }))
  }

  // Add scroll-margin-top to all sections when component mounts
  useEffect(() => {
    // Add scroll-margin-top to all sections
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      ;(section as HTMLElement).style.scrollMarginTop = "120px"
    })

    // Hide the scroll hint after 5 seconds
    const timer = setTimeout(() => {
      setShowScrollHint(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)

    // Simple direct scrolling using scrollIntoView
    const element = document.getElementById(tabId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Toggle SKU selection
  const toggleSkuSelection = (skuId: string) => {
    setSelectedSkus((prev) => {
      // If already selected, remove it
      if (prev.includes(skuId)) {
        return prev.filter((id) => id !== skuId)
      }
      // Otherwise add it
      else {
        return [...prev, skuId]
      }
    })
  }

  // Open SKU info dialog
  const openSkuInfo = (skuId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveInfoDialog(skuId)
  }

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150

      const sections = document.querySelectorAll("section[id]")

      // Find the current active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement
        const sectionId = section.id
        const offsetTop = section.offsetTop

        if (scrollPosition >= offsetTop - 150) {
          if (activeTab !== sectionId && sectionId !== "order") {
            setActiveTab(sectionId)
          }
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Set initial active tab

    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeTab])

  return (
    <div className="text-white">
      {/* Hero section with gradient background */}
      <div className="relative bg-gradient-to-r from-[#0a0a14] to-[#1a237e] py-12 px-4">
        <div className="max-w-full mx-0">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/ct-marketplace" className="hover:text-white">
              CT Marketplace
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Strategic Transaction Accounting Tool (STAT)</span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Strategic Transaction Accounting Tool (STAT)</h1>
            <p className="text-gray-400">EY Strategic Transaction Accounting Tool</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-40 bg-[#0a0a14] border-b border-gray-800">
        <div className="max-w-full mx-0 relative">
          {/* Scroll hint overlay */}
          {showScrollHint && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14]/80 to-transparent flex items-center justify-center pointer-events-none z-10">
              <div className="bg-yellow-300 text-black px-4 py-2 rounded-full flex items-center animate-pulse">
                <ChevronDown className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Click tabs to navigate sections</span>
              </div>
            </div>
          )}

          <TooltipProvider>
            <div className="flex overflow-x-auto justify-between">
              <div className="flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleTabClick("description")}
                      className={cn(
                        "px-6 py-4 text-gray-300 hover:text-white focus:outline-none whitespace-nowrap group relative",
                        activeTab === "description"
                          ? "border-b-2 border-yellow-300 text-white"
                          : "hover:bg-gray-800/50",
                      )}
                    >
                      Description
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 ml-1 inline-block transition-transform",
                          activeTab === "description"
                            ? "rotate-180 text-[rgb(255,230,0)]"
                            : "group-hover:-translate-y-1 group-hover:translate-x-1",
                        )}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Scroll to Description section</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleTabClick("offerings")}
                      className={cn(
                        "px-6 py-4 text-gray-300 hover:text-white focus:outline-none whitespace-nowrap group relative",
                        activeTab === "offerings" ? "border-b-2 border-yellow-300 text-white" : "hover:bg-gray-800/50",
                      )}
                    >
                      Product SKUs
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 ml-1 inline-block transition-transform",
                          activeTab === "offerings"
                            ? "rotate-180 text-[rgb(255,230,0)]"
                            : "group-hover:-translate-y-1 group-hover:translate-x-1",
                        )}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Scroll to Product SKUs section</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleTabClick("advice")}
                      className={cn(
                        "px-6 py-4 text-gray-300 hover:text-white focus:outline-none whitespace-nowrap group relative",
                        activeTab === "advice" ? "border-b-2 border-yellow-300 text-white" : "hover:bg-gray-800/50",
                      )}
                    >
                      Advice
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 ml-1 inline-block transition-transform",
                          activeTab === "advice"
                            ? "rotate-180 text-[rgb(255,230,0)]"
                            : "group-hover:-translate-y-1 group-hover:translate-x-1",
                        )}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Scroll to Advice section</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleTabClick("contacts")}
                      className={cn(
                        "px-6 py-4 text-gray-300 hover:text-white focus:outline-none whitespace-nowrap group relative",
                        activeTab === "contacts" ? "border-b-2 border-yellow-300 text-white" : "hover:bg-gray-800/50",
                      )}
                    >
                      Contacts
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 ml-1 inline-block transition-transform",
                          activeTab === "contacts"
                            ? "rotate-180 text-[rgb(255,230,0)]"
                            : "group-hover:-translate-y-1 group-hover:translate-x-1",
                        )}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Scroll to Contacts section</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Order Bundle Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsOrderBundleOpen(true)}
                    className="px-6 py-4 text-gray-300 hover:text-white focus:outline-none whitespace-nowrap group relative hover:bg-gray-800/50 flex items-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Order Bundle
                    <span className="ml-2 bg-yellow-300 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {3 + selectedSkus.length - 1}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View your order bundle</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>

      {/* Order Bundle Panel */}
      <OrderBundlePanel isOpen={isOrderBundleOpen} onClose={() => setIsOrderBundleOpen(false)} />

      {/* SKU Info Dialogs */}
      {activeInfoDialog && (
        <SKUInfoDialog
          isOpen={true}
          onClose={() => setActiveInfoDialog(null)}
          skuData={skuInfoData[activeInfoDialog as keyof typeof skuInfoData]}
        />
      )}

      {/* Content Sections */}
      <div className="max-w-full mx-0">
        {/* Description Section */}
        <section id="description" className="px-4 py-8">
          <div className="space-y-8">
            <p className="text-gray-300">
              EY Strategic Transaction Accounting Tool (EY STAT) is a cloud-based digital solution designed to
              streamline and automate the process for calculating, tracking and reviewing purchase accounting
              adjustments at a detailed and summarized level.
            </p>

            <div className="border-t border-gray-800 pt-8">
              <h2 className="text-xl font-bold text-yellow-300 mb-4">Commercial Description of the SKUs</h2>
              <p className="text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <h2 className="text-xl font-bold text-yellow-300 mb-4">Select SKUs</h2>
              <p className="text-gray-300 mb-6">
                Select multiple SKUs to add to your Order Bundle. Click on the circles to select or deselect items.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0a0a14] text-left">
                    <tr>
                      <th className="px-3 py-3 text-gray-300 w-16"></th>
                      <th className="px-3 py-3 text-gray-300 w-16 whitespace-nowrap overflow-hidden">SKU#</th>
                      <th className="pl-16 py-3 text-gray-300">SKU Description</th>
                      <th className="px-3 py-3 text-gray-300">Cost Basis</th>
                      <th className="px-3 py-3 text-gray-300">Units/Fixed</th>
                      <th className="px-3 py-3 text-gray-300">Increments</th>
                      <th className="px-3 py-3 text-gray-300">Frequency</th>
                      <th className="px-3 py-3 text-gray-300 w-16">Select</th>
                      <th className="px-3 py-3 text-gray-300">SKU Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-800">
                      <td className="px-3 py-4 align-middle">
                        <button
                          className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs bg-[rgb(255,230,0)] text-black hover:bg-yellow-400 focus:outline-none"
                          onClick={(e) => openSkuInfo("option-1", e)}
                        >
                          <Info className="h-3 w-3 mr-1" />
                          INFO
                        </button>
                      </td>
                      <td className="px-3 py-4 text-gray-300 w-16 whitespace-nowrap overflow-hidden text-ellipsis">
                        1001039-001-aaa
                      </td>
                      <td className="pl-16 py-4 text-gray-300">CT-EYSTAT-MT01</td>
                      <td className="px-3 py-4 text-gray-300">$1500</td>
                      <td className="px-3 py-4 text-gray-300">Fixed Monthly Charge</td>
                      <td className="px-3 py-4 text-gray-300">
                        <input
                          type="number"
                          min={skuInfoData["option-1"].minIncrements}
                          value={incrementValues["option-1"]}
                          onChange={(e) => handleIncrementChange("option-1", e.target.value)}
                          className="w-16 bg-[#0a0a14] border border-gray-700 rounded px-2 py-1 text-white text-center"
                        />
                      </td>
                      <td className="px-3 py-4 text-gray-300">Monthly</td>
                      <td className="px-3 py-4 text-center">
                        <button
                          onClick={() => toggleSkuSelection("option-1")}
                          className={`h-5 w-5 rounded-full border ${selectedSkus.includes("option-1") ? "border-yellow-300" : "border-gray-500"} flex items-center justify-center`}
                        >
                          {selectedSkus.includes("option-1") && (
                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-300"></div>
                          )}
                        </button>
                      </td>
                      <td
                        className={`px-3 py-4 ${selectedSkus.includes("option-1") ? "text-yellow-300" : "text-gray-300"}`}
                      >
                        Multi Tenant
                      </td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="px-3 py-4 align-middle">
                        <button
                          className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs bg-[rgb(255,230,0)] text-black hover:bg-yellow-400 focus:outline-none"
                          onClick={(e) => openSkuInfo("option-2", e)}
                        >
                          <Info className="h-3 w-3 mr-1" />
                          INFO
                        </button>
                      </td>
                      <td className="px-3 py-4 text-gray-300 w-16 whitespace-nowrap overflow-hidden text-ellipsis">
                        1001039-002-bbb
                      </td>
                      <td className="pl-16 py-4 text-gray-300">CT-EYSTAT-STSM02</td>
                      <td className="px-3 py-4 text-gray-300">$2000</td>
                      <td className="px-3 py-4 text-gray-300">Fixed Monthly Charge</td>
                      <td className="px-3 py-4 text-gray-300">
                        <input
                          type="number"
                          min={skuInfoData["option-2"].minIncrements}
                          value={incrementValues["option-2"]}
                          onChange={(e) => handleIncrementChange("option-2", e.target.value)}
                          className="w-16 bg-[#0a0a14] border border-gray-700 rounded px-2 py-1 text-white text-center"
                        />
                      </td>
                      <td className="px-3 py-4 text-gray-300">Monthly</td>
                      <td className="px-3 py-4 text-center">
                        <button
                          onClick={() => toggleSkuSelection("option-2")}
                          className={`h-5 w-5 rounded-full border ${selectedSkus.includes("option-2") ? "border-yellow-300" : "border-gray-500"} flex items-center justify-center`}
                        >
                          {selectedSkus.includes("option-2") && (
                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-300"></div>
                          )}
                        </button>
                      </td>
                      <td
                        className={`px-3 py-4 ${selectedSkus.includes("option-2") ? "text-yellow-300" : "text-gray-300"}`}
                      >
                        Single Tenant Small/Medium
                      </td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="px-3 py-4 align-middle">
                        <button
                          className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs bg-[rgb(255,230,0)] text-black hover:bg-yellow-400 focus:outline-none"
                          onClick={(e) => openSkuInfo("option-3", e)}
                        >
                          <Info className="h-3 w-3 mr-1" />
                          INFO
                        </button>
                      </td>
                      <td className="px-3 py-4 text-gray-300 w-16 whitespace-nowrap overflow-hidden text-ellipsis">
                        1001039-003-ccc
                      </td>
                      <td className="pl-16 py-4 text-gray-300">CT-EYSTAT-SETUP01</td>
                      <td className="px-3 py-4 text-gray-300">$5000</td>
                      <td className="px-3 py-4 text-gray-300">Fixed, One Time</td>
                      <td className="px-3 py-4 text-gray-300">
                        <span className="text-gray-500">Not Applicable</span>
                      </td>
                      <td className="px-3 py-4 text-gray-300">One Time</td>
                      <td className="px-3 py-4 text-center">
                        <button
                          onClick={() => toggleSkuSelection("option-3")}
                          className={`h-5 w-5 rounded-full border ${selectedSkus.includes("option-3") ? "border-yellow-300" : "border-gray-500"} flex items-center justify-center`}
                        >
                          {selectedSkus.includes("option-3") && (
                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-300"></div>
                          )}
                        </button>
                      </td>
                      <td
                        className={`px-3 py-4 ${selectedSkus.includes("option-3") ? "text-yellow-300" : "text-gray-300"}`}
                      >
                        One-time Setup Cost
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="text-gray-300">
                  <span className="font-medium">{selectedSkus.length}</span> SKU{selectedSkus.length !== 1 ? "s" : ""}{" "}
                  selected
                </div>
                <Button
                  className="bg-yellow-300 hover:bg-yellow-400 text-black flex items-center"
                  onClick={() => setIsOrderBundleOpen(true)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Order Bundle
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Product SKUs Section */}
        <section id="offerings" className="px-4 py-8 min-h-[400px] border-t border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Product SKUs</h2>
          <p className="text-gray-300">
            Our Strategic Transaction Accounting Tool offers various packages tailored to your business needs. From
            multi-tenant solutions for smaller businesses to dedicated single-tenant environments for large enterprises,
            we have options to suit every requirement.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Multi-Tenant Solution</h3>
              <p className="text-gray-300 mb-4">
                Ideal for small to medium businesses looking for cost-effective solutions with all essential features.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Shared infrastructure with dedicated data isolation</li>
                <li>• Monthly subscription model</li>
                <li>• Standard support package</li>
                <li>• Regular feature updates</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Single-Tenant Solution</h3>
              <p className="text-gray-300 mb-4">
                Perfect for larger organizations requiring dedicated resources and enhanced customization.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Dedicated infrastructure</li>
                <li>• Enhanced security features</li>
                <li>• Priority support</li>
                <li>• Custom integration options</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Advice Section */}
        <section id="advice" className="px-4 py-8 min-h-[400px] border-t border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Advice</h2>
          <p className="text-gray-300">
            Our team of experts is available to provide guidance on implementing and maximizing the value of the
            Strategic Transaction Accounting Tool in your organization.
          </p>
          <div className="mt-8 space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Implementation Best Practices</h3>
              <p className="text-gray-300">
                For optimal results, we recommend a phased implementation approach, starting with core modules before
                expanding to more advanced features. This allows your team to adapt gradually and ensures a smoother
                transition.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Training Resources</h3>
              <p className="text-gray-300">
                We offer comprehensive training programs for all user levels, from basic operation to advanced
                administration. Contact our training team to schedule sessions tailored to your organization's needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section id="contacts" className="px-4 py-8 min-h-[400px] border-t border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Contacts</h2>
          <p className="text-gray-300 mb-8">
            Reach out to our dedicated team for more information about the Strategic Transaction Accounting Tool.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Commercial Team</h3>
              <div className="space-y-3">
                <p className="text-gray-300">
                  <span className="font-medium">Contact:</span> John Smith
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Email:</span> john.smith@example.com
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Phone:</span> +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Technical Advice</h3>
              <div className="space-y-3">
                <p className="text-gray-300">
                  <span className="font-medium">Contact:</span> Demand Management
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Email:</span> support@example.com
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Phone:</span> +1 (555) 987-6543
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Hours:</span> 24/7 Support Available
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

