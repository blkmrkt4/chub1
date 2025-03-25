"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Database,
  Edit,
  Filter,
  Info,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data for assets
const sampleAssets = [
  {
    id: "EMP-12345678",
    name: "Strategic Transaction Accounting Tool",
    description:
      "EY Strategic Transaction Accounting Tool (EY STAT) is a cloud-based digital solution designed to streamline and automate the process for calculating, tracking and reviewing purchase accounting adjustments at a detailed and summarized level.",
    shortDescription: "Cloud-based accounting tool for transaction management",
    commercialDescription:
      "The Strategic Transaction Accounting Tool offers multiple SKUs to accommodate different deployment models and usage patterns. Users can choose between multi-tenant and single-tenant options, with various support and implementation packages available.",
    assetAdvice:
      "Consider the data volume and security requirements when recommending this product. Multi-tenant is suitable for most clients, while single-tenant is recommended for clients with strict data isolation requirements or high transaction volumes.",
    commercialOwner: {
      name: "Sarah Johnson",
      email: "sarah.johnson@ey.com",
      proxyName: "David Williams",
      proxyEmail: "david.williams@ey.com",
    },
    serviceLine: "Consulting",
    tpmName: "Michael Chen",
    tpmEmail: "michael.chen@ey.com",
    demandTeams: "CT Demand Management Teams",
    gscPrimary: ["GSC-1234-5678", "GSC-2345-6789"],
    gscSecondary: ["GSC-3456-7890", "GSC-4567-8901"],
    skus: [
      {
        id: "12345678-MT1-001",
        shortDescription: "Multi-Tenant Monthly License",
        detailedDescription:
          "Multi-tenant deployment with shared infrastructure and dedicated data isolation. Includes standard support package with regular updates.",
        costCategory: "Fixed",
        chargingIncrement: "Monthly",
        commercialStatus: "Active",
        returnable: true,
        minIncrement: 1,
        children: [],
        currency: "USD",
        costMacroCategory: "Operate",
        indexationMultiplier: "1.01%",
      },
      {
        id: "12345678-ST1-002",
        shortDescription: "Single-Tenant Small/Medium Monthly License",
        detailedDescription:
          "Single-tenant deployment with dedicated infrastructure for enhanced security and customization. Recommended for medium-sized organizations with complex requirements.",
        costCategory: "Fixed",
        chargingIncrement: "Monthly",
        commercialStatus: "Active",
        returnable: false,
        minIncrement: 1,
        children: [],
        currency: "USD",
        costMacroCategory: "Operate",
        indexationMultiplier: "1.01%",
      },
      {
        id: "12345678-SET-003",
        shortDescription: "One-Time Setup Fee",
        detailedDescription:
          "Initial implementation, configuration, and deployment of the system. Includes data migration assistance and initial user setup.",
        costCategory: "Fixed",
        chargingIncrement: "One Time",
        commercialStatus: "Active",
        returnable: false,
        minIncrement: 1,
        children: [],
        currency: "USD",
        costMacroCategory: "Invest",
        indexationMultiplier: "0%",
      },
    ],
  },
  {
    id: "EMP-23456789",
    name: "Data Analytics Platform",
    description:
      "Comprehensive solution for data processing, analysis, and visualization to drive business insights and decision-making.",
    shortDescription: "Enterprise data analytics solution",
    commercialDescription:
      "The Data Analytics Platform offers various licensing options based on data volume and user count. Additional modules for specific analytics capabilities can be added as needed.",
    assetAdvice:
      "Assess the client's data maturity and existing tools before recommending. Consider data volume, required integrations, and reporting needs.",
    commercialOwner: {
      name: "Emily Brown",
      email: "emily.brown@ey.com",
      proxyName: "Robert Smith",
      proxyEmail: "robert.smith@ey.com",
    },
    serviceLine: "Consulting",
    tpmName: "Jennifer Lopez",
    tpmEmail: "jennifer.lopez@ey.com",
    demandTeams: "CT Demand Management Teams",
    gscPrimary: ["GSC-5678-9012", "GSC-6789-0123"],
    gscSecondary: ["GSC-7890-1234"],
    skus: [
      {
        id: "23456789-STD-001",
        shortDescription: "Standard License (50 Users)",
        detailedDescription:
          "Standard deployment with up to 50 named users. Includes core analytics capabilities and standard visualizations.",
        costCategory: "Fixed",
        chargingIncrement: "Monthly",
        commercialStatus: "Active",
        returnable: true,
        minIncrement: 1,
        children: [],
        currency: "USD",
        costMacroCategory: "Operate",
        indexationMultiplier: "1.02%",
      },
      {
        id: "23456789-ENT-002",
        shortDescription: "Enterprise License (Unlimited Users)",
        detailedDescription:
          "Enterprise-wide deployment with unlimited users. Includes all analytics modules and premium support.",
        costCategory: "Fixed",
        chargingIncrement: "Monthly",
        commercialStatus: "Active",
        returnable: false,
        minIncrement: 1,
        children: [],
        currency: "USD",
        costMacroCategory: "Operate",
        indexationMultiplier: "1.02%",
      },
    ],
  },
]

// Cost category options
const costCategoryOptions = [
  "Fixed",
  "Units",
  "Hours",
  "Storage",
  "Tokens",
  "Consumption",
  "Data",
  "Packaged Labour",
  "BOTS",
  "Variable License",
]

// Charging increment options
const chargingIncrementOptions = ["One Time", "Weekly", "Monthly", "Quarterly", "Annually"]

// Commercial status options
const commercialStatusOptions = [
  "Draft",
  "Engagement Billing Active",
  "Country Billing Active only",
  "Active but not Billed",
  "Retiring",
  "Retired",
]

// Cost macro category options
const costMacroCategoryOptions = ["Operate", "Invest", "Equity recovery"]

export default function SKUDatabasePage() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const [selectedSKU, setSelectedSKU] = useState<string | null>(null)
  const [isEditingAsset, setIsEditingAsset] = useState(false)
  const [isEditingSKU, setIsEditingSKU] = useState(false)
  const [isCreatingNewSKU, setIsCreatingNewSKU] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("assets")
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null)

  // Add this useEffect to handle URL parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      setSearchParams(params)

      // If there's a product parameter, search for it and select it
      const productParam = params.get("product")
      if (productParam === "STAT") {
        // Find the STAT product in the sample data
        const statAsset = sampleAssets.find(
          (asset) => asset.name.includes("Strategic Transaction Accounting Tool") || asset.name.includes("STAT"),
        )

        if (statAsset) {
          setSelectedAsset(statAsset.id)
          setActiveTab("asset-details")
        }
      }
    }
  }, [])

  // Get the selected asset data
  const assetData = selectedAsset ? sampleAssets.find((asset) => asset.id === selectedAsset) : null

  // Get the selected SKU data
  const skuData = selectedSKU && assetData ? assetData.skus.find((sku) => sku.id === selectedSKU) : null

  // Filter assets based on search query
  const filteredAssets = sampleAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle asset selection
  const handleAssetSelect = (assetId: string) => {
    setSelectedAsset(assetId)
    setSelectedSKU(null)
    setIsEditingAsset(false)
    setIsEditingSKU(false)
    setIsCreatingNewSKU(false)
    setActiveTab("asset-details")
  }

  // Handle SKU selection
  const handleSKUSelect = (skuId: string) => {
    setSelectedSKU(skuId)
    setIsEditingSKU(false)
    setIsCreatingNewSKU(false)
    setActiveTab("sku-details")
  }

  // Handle creating a new SKU
  const handleCreateNewSKU = () => {
    setSelectedSKU(null)
    setIsEditingSKU(true)
    setIsCreatingNewSKU(true)
    setActiveTab("sku-details")
  }

  // Render the asset list
  const renderAssetList = () => (
    <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Technology Assets</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {filterMenuOpen ? <ChevronDown className="h-4 w-4 ml-2" /> : <ChevronRight className="h-4 w-4 ml-2" />}
          </Button>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a14] border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
            />
          </div>
        </div>
      </div>

      {filterMenuOpen && (
        <div className="p-4 border-b border-gray-800 bg-[#0a0a14]/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Service Line</label>
              <select className="w-full bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-yellow-300">
                <option value="">All Service Lines</option>
                <option value="consulting">Consulting</option>
                <option value="tax">Tax</option>
                <option value="assurance">Assurance</option>
                <option value="strategy">Strategy and Transactions</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Commercial Owner</label>
              <input
                type="text"
                placeholder="Search by name"
                className="w-full bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Global Service Code</label>
              <input
                type="text"
                placeholder="Enter GSC"
                className="w-full bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
              />
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

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#0a0a14] text-left">
            <tr>
              <th className="px-4 py-3 text-gray-300">EMPIRE ID</th>
              <th className="px-4 py-3 text-gray-300">Product Name</th>
              <th className="px-4 py-3 text-gray-300">Service Line</th>
              <th className="px-4 py-3 text-gray-300">Commercial Owner</th>
              <th className="px-4 py-3 text-gray-300">SKUs</th>
              <th className="px-4 py-3 text-gray-300 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr
                key={asset.id}
                className={cn(
                  "border-t border-gray-800 hover:bg-gray-800/30 cursor-pointer",
                  selectedAsset === asset.id && "bg-gray-800/50",
                )}
                onClick={() => handleAssetSelect(asset.id)}
              >
                <td className="px-4 py-4 text-gray-300">{asset.id}</td>
                <td className="px-4 py-4">
                  <div className="font-medium text-white">{asset.name}</div>
                  <div className="text-sm text-gray-400">{asset.shortDescription}</div>
                </td>
                <td className="px-4 py-4 text-gray-300">{asset.serviceLine}</td>
                <td className="px-4 py-4">
                  <div className="text-gray-300">{asset.commercialOwner.name}</div>
                  <div className="text-sm text-gray-400">{asset.commercialOwner.email}</div>
                </td>
                <td className="px-4 py-4 text-gray-300">{asset.skus.length}</td>
                <td className="px-4 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAssetSelect(asset.id)
                    }}
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
        <div className="text-sm text-gray-400">Showing {filteredAssets.length} assets</div>
        <Button className="bg-yellow-300 hover:bg-yellow-400 text-black">
          <Plus className="h-4 w-4 mr-2" />
          Create New Asset
        </Button>
      </div>
    </div>
  )

  // Render the asset details
  const renderAssetDetails = () => {
    if (!assetData) return null

    return (
      <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
              onClick={() => {
                setSelectedAsset(null)
                setActiveTab("assets")
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold text-white">{assetData.name}</h2>
          </div>
          <div className="flex items-center space-x-2">
            {isEditingAsset ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                  onClick={() => setIsEditingAsset(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-yellow-300 hover:bg-yellow-400 text-black">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button className="bg-yellow-300 hover:bg-yellow-400 text-black" onClick={() => setIsEditingAsset(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Asset
              </Button>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Asset details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Asset Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">EMPIRE ID</label>
                    <Input
                      value={assetData.id}
                      disabled={true}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">Lookup for valid EMPIRE record</p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Product Name</label>
                    <Input
                      value={assetData.name}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">Name of the product pulled from EMPIRE</p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Product Short Description</label>
                    <Input
                      value={assetData.shortDescription}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">A short version of the asset level Product description</p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Product Description</label>
                    <Textarea
                      value={assetData.description}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300 min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Detailed description about the product</p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Commercial Description</label>
                    <Textarea
                      value={assetData.commercialDescription}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300 min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Describe the way the SKU's are structured for this asset to help a user choose the right SKU
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Asset Advice</label>
                    <Textarea
                      value={assetData.assetAdvice}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300 min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Other items to take into account when understanding this asset
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Commercial owner details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Commercial Owner Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Commercial Owner Name</label>
                    <Input
                      value={assetData.commercialOwner.name}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Commercial Owner Email</label>
                    <Input
                      value={assetData.commercialOwner.email}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Commercial Owner Proxy Name</label>
                    <Input
                      value={assetData.commercialOwner.proxyName}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Commercial Owner Proxy Email</label>
                    <Input
                      value={assetData.commercialOwner.proxyEmail}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Service Line/Domain Owner</label>
                    <Select disabled={!isEditingAsset} defaultValue={assetData.serviceLine}>
                      <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                        <SelectValue placeholder="Select service line" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tax">Tax</SelectItem>
                        <SelectItem value="Assurance">Assurance</SelectItem>
                        <SelectItem value="Consulting">Consulting</SelectItem>
                        <SelectItem value="SaT">Strategy and Transactions</SelectItem>
                        <SelectItem value="Markets">Markets</SelectItem>
                        <SelectItem value="Managed Services">Managed Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">CT TPM Name</label>
                    <Input
                      value={assetData.tpmName}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">CT TPM Email Address</label>
                    <Input
                      value={assetData.tpmEmail}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Demand and Advice Contact Teams</label>
                    <Input
                      value={assetData.demandTeams}
                      disabled={!isEditingAsset}
                      className="bg-[#0a0a14] border-gray-700 text-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">Global Service Codes</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Primary GSCs</label>
                    <div className="flex flex-wrap gap-2">
                      {assetData.gscPrimary.map((gsc, index) => (
                        <div
                          key={index}
                          className="bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-1 text-sm text-gray-300 flex items-center"
                        >
                          {gsc}
                          {isEditingAsset && (
                            <button className="ml-2 text-gray-500 hover:text-gray-300">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditingAsset && (
                        <button className="bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-1 text-sm text-gray-300 hover:border-yellow-300">
                          <Plus className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Global Service Codes directly related to this asset</p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Secondary GSCs</label>
                    <div className="flex flex-wrap gap-2">
                      {assetData.gscSecondary.map((gsc, index) => (
                        <div
                          key={index}
                          className="bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-1 text-sm text-gray-300 flex items-center"
                        >
                          {gsc}
                          {isEditingAsset && (
                            <button className="ml-2 text-gray-500 hover:text-gray-300">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditingAsset && (
                        <button className="bg-[#0a0a14] border border-gray-700 rounded-md px-3 py-1 text-sm text-gray-300 hover:border-yellow-300">
                          <Plus className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Global Service Codes that might or are sometimes related to this Asset
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SKUs section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">SKUs</h3>
              <Button className="bg-yellow-300 hover:bg-yellow-400 text-black" onClick={handleCreateNewSKU}>
                <Plus className="h-4 w-4 mr-2" />
                Add New SKU
              </Button>
            </div>

            <div className="bg-[#0a0a14] rounded-lg border border-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-[#0a0a14]/50 text-left">
                    <tr>
                      <th className="px-4 py-3 text-gray-300">SKU Number</th>
                      <th className="px-4 py-3 text-gray-300">Short Description</th>
                      <th className="px-4 py-3 text-gray-300">Cost Category</th>
                      <th className="px-4 py-3 text-gray-300">Charging Increment</th>
                      <th className="px-4 py-3 text-gray-300">Commercial Status</th>
                      <th className="px-4 py-3 text-gray-300">Returnable</th>
                      <th className="px-4 py-3 text-gray-300 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetData.skus.map((sku) => (
                      <tr
                        key={sku.id}
                        className={cn(
                          "border-t border-gray-800 hover:bg-gray-800/30 cursor-pointer",
                          selectedSKU === sku.id && "bg-gray-800/50",
                        )}
                        onClick={() => handleSKUSelect(sku.id)}
                      >
                        <td className="px-4 py-4 text-gray-300">{sku.id}</td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-white">{sku.shortDescription}</div>
                        </td>
                        <td className="px-4 py-4 text-gray-300">{sku.costCategory}</td>
                        <td className="px-4 py-4 text-gray-300">{sku.chargingIncrement}</td>
                        <td className="px-4 py-4">
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs",
                              sku.commercialStatus === "Active" && "bg-green-900/50 text-green-300",
                              sku.commercialStatus === "Draft" && "bg-yellow-900/50 text-yellow-300",
                              sku.commercialStatus === "Retiring" && "bg-orange-900/50 text-orange-300",
                              sku.commercialStatus === "Retired" && "bg-red-900/50 text-red-300",
                            )}
                          >
                            {sku.commercialStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className={sku.returnable ? "text-green-300" : "text-gray-500"}>
                            {sku.returnable ? "Yes" : "No"}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSKUSelect(sku.id)
                            }}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render the SKU details
  const renderSKUDetails = () => {
    if (!assetData) return null

    const newSKU = {
      id: isCreatingNewSKU
        ? `${assetData.id.split("-")[1]}-NEW-${(assetData.skus.length + 1).toString().padStart(3, "0")}`
        : "",
      shortDescription: "",
      detailedDescription: "",
      costCategory: "Fixed",
      chargingIncrement: "Monthly",
      commercialStatus: "Draft",
      returnable: false,
      minIncrement: 1,
      children: [],
      currency: "USD",
      costMacroCategory: "Operate",
      indexationMultiplier: "1.00%",
    }

    const currentSKU = isCreatingNewSKU ? newSKU : skuData || newSKU

    return (
      <div className="bg-[#1a1a2e] rounded-lg border border-gray-800">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
              onClick={() => {
                setSelectedSKU(null)
                setIsEditingSKU(false)
                setIsCreatingNewSKU(false)
                setActiveTab("asset-details")
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold text-white">
              {isCreatingNewSKU
                ? "Create New SKU"
                : isEditingSKU
                  ? `Edit SKU: ${currentSKU.shortDescription}`
                  : `SKU: ${currentSKU.shortDescription}`}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            {isEditingSKU || isCreatingNewSKU ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                  onClick={() => {
                    setIsEditingSKU(false)
                    setIsCreatingNewSKU(false)
                    if (!skuData) {
                      setActiveTab("asset-details")
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button className="bg-yellow-300 hover:bg-yellow-400 text-black">
                  <Save className="h-4 w-4 mr-2" />
                  {isCreatingNewSKU ? "Create SKU" : "Save Changes"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button className="bg-yellow-300 hover:bg-yellow-400 text-black" onClick={() => setIsEditingSKU(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit SKU
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Basic SKU details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">SKU Number</label>
                    <div className="flex">
                      <Input
                        value={currentSKU.id}
                        disabled={!isCreatingNewSKU}
                        className="bg-[#0a0a14] border-gray-700 text-gray-300"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md">
                            <p>
                              Unique number to identify the SKU. The system fills in the EMPIRE number, allows you to
                              fill in the next 3 numbers and append the last 3 numbers indicating the number of the SKU.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">SKU Short Description</label>
                    <div className="flex">
                      <Input
                        value={currentSKU.shortDescription}
                        disabled={!isEditingSKU && !isCreatingNewSKU}
                        className="bg-[#0a0a14] border-gray-700 text-gray-300"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md">
                            <p>
                              Short description of the SKU and its purpose. Should be less than 100 characters. This is
                              where country, number of tenants, type of cost can be specified.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">SKU Detailed Description</label>
                    <div className="flex">
                      <Textarea
                        value={currentSKU.detailedDescription}
                        disabled={!isEditingSKU && !isCreatingNewSKU}
                        className="bg-[#0a0a14] border-gray-700 text-gray-300 min-h-[100px]"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2 self-start">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md">
                            <p>
                              Detailed description of the SKU. A longer detail that explains the types of engagements
                              this SKU would be use for, maybe countries it is not permitted, any dependencies.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Cost Category</label>
                    <div className="flex">
                      <Select disabled={!isEditingSKU && !isCreatingNewSKU} defaultValue={currentSKU.costCategory}>
                        <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                          <SelectValue placeholder="Select cost category" />
                        </SelectTrigger>
                        <SelectContent>
                          {costCategoryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md">
                            <p>
                              The type of cost category this SKU represents. This helps engagement teams understand what
                              the charges relate to.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Charging Increment</label>
                    <div className="flex">
                      <Select disabled={!isEditingSKU && !isCreatingNewSKU} defaultValue={currentSKU.chargingIncrement}>
                        <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                          <SelectValue placeholder="Select charging increment" />
                        </SelectTrigger>
                        <SelectContent>
                          {chargingIncrementOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The frequency at which this SKU is charged.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Additional SKU details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Commercial Status</label>
                    <div className="flex">
                      <Select disabled={!isEditingSKU && !isCreatingNewSKU} defaultValue={currentSKU.commercialStatus}>
                        <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {commercialStatusOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md">
                            <p>
                              Drafts are to provide time for the commercial owner to iterate in crafting the SKU. Active
                              and billed means that you can see it in the commercial hub and it can be chosen.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-400">Returnable</label>
                      <div className="flex items-center">
                        <Switch
                          checked={currentSKU.returnable}
                          disabled={!isEditingSKU && !isCreatingNewSKU}
                          className="data-[state=checked]:bg-yellow-300"
                        />
                        <Label className="ml-2 text-gray-300">{currentSKU.returnable ? "Yes" : "No"}</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-2">
                                <Info className="h-4 w-4 text-gray-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-md">
                              <p>
                                This means that the cost of the SKU can't be stopped halfway through an increment. This
                                is where we have true costs like Service Now Licenses that can't be returned mid-year.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Minimum Selectable Increment</label>
                    <div className="flex">
                      <Input
                        type="number"
                        value={currentSKU.minIncrement}
                        disabled={!isEditingSKU && !isCreatingNewSKU}
                        className="bg-[#0a0a14] border-gray-700 text-gray-300"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md">
                            <p>
                              If the cost requires some reasonable activity to be chosen, this would be an integer and
                              would work with the charging increment field.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">SKU Children</label>
                    <div className="flex">
                      <Input
                        value={currentSKU.children.join(", ")}
                        disabled={!isEditingSKU && !isCreatingNewSKU}
                        className="bg-[#0a0a14] border-gray-700 text-gray-300"
                        placeholder="e.g., 12345678-000-001"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md">
                            <p>
                              Another SKU number that is the child of this SKU. This field should support multiple
                              SKU's.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Cost Currency</label>
                    <div className="flex">
                      <Select disabled={!isEditingSKU && !isCreatingNewSKU} defaultValue={currentSKU.currency}>
                        <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="AUD">AUD</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                        </SelectContent>
                      </Select>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The currency in which this SKU is priced.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Cost Macro Category</label>
                    <div className="flex">
                      <Select disabled={!isEditingSKU && !isCreatingNewSKU} defaultValue={currentSKU.costMacroCategory}>
                        <SelectTrigger className="bg-[#0a0a14] border-gray-700 text-gray-300">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {costMacroCategoryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The macro category for this cost.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Indexation Multiplier</label>
                    <div className="flex">
                      <Input
                        value={currentSKU.indexationMultiplier}
                        disabled={!isEditingSKU && !isCreatingNewSKU}
                        className="bg-[#0a0a14] border-gray-700 text-gray-300"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The annual indexation multiplier for this SKU.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
              <Database className="h-6 w-6 text-yellow-300 mr-2" />
              <h1 className="text-3xl font-bold text-white">SKU Database</h1>
            </div>
            <p className="text-gray-300">
              Manage technology assets and their associated SKUs. Create, edit, and maintain SKU information for the
              commercial hub.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="p-6">
            <Tabs defaultValue="assets" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-[#1a1a2e] mb-4">
                <TabsTrigger
                  value="assets"
                  className="data-[state=active]:bg-yellow-300 data-[state=active]:text-black"
                >
                  Assets
                </TabsTrigger>
                {selectedAsset && (
                  <TabsTrigger
                    value="asset-details"
                    className="data-[state=active]:bg-yellow-300 data-[state=active]:text-black"
                  >
                    Asset Details
                  </TabsTrigger>
                )}
                {(selectedSKU || isCreatingNewSKU) && (
                  <TabsTrigger
                    value="sku-details"
                    className="data-[state=active]:bg-yellow-300 data-[state=active]:text-black"
                  >
                    SKU Details
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="assets" className="mt-0">
                {renderAssetList()}
              </TabsContent>

              <TabsContent value="asset-details" className="mt-0">
                {renderAssetDetails()}
              </TabsContent>

              <TabsContent value="sku-details" className="mt-0">
                {renderSKUDetails()}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

