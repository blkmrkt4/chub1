"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Search,
  ShoppingBag,
  User,
  FileText,
  Database,
  BarChart3,
  Code,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  Calendar,
  Globe,
  MapPin,
  Building,
  Tag,
  Hash,
  Briefcase,
} from "lucide-react"

export default function CTMarketplacePage() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const router = useRouter()

  // Sample product names for type-ahead functionality
  const productNames = [
    "Strategic Transaction Accounting Tool",
    "Data Analytics Platform",
    "Cloud Security Services",
    "AI Development Framework",
    "Enterprise Integration Platform",
    "DevOps Automation Suite",
    "Blockchain Solutions",
    "IoT Management Suite",
    "Intelligent Document Processing",
    "Autonomous Data Agent",
    "Conversational Process Automation",
    "Predictive Analytics Agent",
    "Autonomous Security Monitor",
    "Multi-Agent Collaboration Platform",
    "Autonomous Code Assistant",
    "Cognitive Process Automation",
  ]

  // Handle type-ahead functionality
  const handleNameSearch = (value: string) => {
    setSearchQuery(value)
    if (value.length > 1) {
      const filtered = productNames.filter((name) => name.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#0a0a14] border-b border-gray-800">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-10">
              <span className="font-bold text-yellow-300 text-2xl">EY</span>
              <span className="ml-2 text-white hidden md:inline-block">Client Technology Commercial Hub</span>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-auto px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Simple Keyword search, for more advanced options see the Advanced Search below"
                className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 pl-4 pr-10 text-sm text-gray-300 focus:outline-none focus:border-yellow-300"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-[#2d2d3d] rounded-full p-1">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-600 text-white">
                <span>AF</span>
              </div>
              <div className="ml-2 mr-4 hidden md:block">
                <div className="text-sm text-white">Ashleigh Franklin</div>
                <div className="text-xs text-gray-400">ashleigh.franklin@ey.com</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pl-6 pr-6">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#0a0a14] to-[#1a237e] py-8 -mx-6 px-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">CT Commercial Hub</h1>
            <p className="text-lg text-gray-300">Select technology products to super charge your engagement</p>
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {/* CT Marketplace */}
            <Link
              href="/ct-marketplace"
              className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-yellow-300 h-[220px] flex flex-col justify-between hover:bg-gray-700/50 transition-colors"
            >
              <div>
                <ShoppingCart className="h-8 w-8 mb-4 text-gray-300" />
                <h2 className="text-xl font-bold mb-4">CT Marketplace</h2>
                <p className="text-sm text-gray-300">
                  Browse and purchase technology products and services from our comprehensive marketplace.
                </p>
              </div>
              <span className="text-sm text-yellow-300 hover:underline">Overview</span>
            </Link>

            {/* My Workspace */}
            <Link
              href="/my-workspace"
              className="bg-gray-800/50 p-6 rounded-lg h-[220px] flex flex-col justify-between hover:bg-gray-700/50 transition-colors"
            >
              <div>
                <ShoppingBag className="h-8 w-8 mb-4 text-gray-300" />
                <h2 className="text-xl font-bold mb-4">My Workspace</h2>
                <p className="text-sm text-gray-300">
                  Access your personalized dashboard with your orders, favorites, and recommended products.
                </p>
              </div>
              <span className="text-sm text-yellow-300 hover:underline">Learn more</span>
            </Link>

            {/* Order Pipeline */}
            <Link
              href="/order-pipeline"
              className="bg-gray-800/50 p-6 rounded-lg h-[220px] flex flex-col justify-between hover:bg-gray-700/50 transition-colors"
            >
              <div>
                <User className="h-8 w-8 mb-4 text-gray-300" />
                <h2 className="text-xl font-bold mb-4">Order Pipeline</h2>
                <p className="text-sm text-gray-300">
                  Track and manage your current orders, approvals, and delivery status in real-time.
                </p>
              </div>
              <span className="text-sm text-yellow-300 hover:underline">Learn more</span>
            </Link>

            {/* Reporting */}
            <Link
              href="/reporting"
              className="bg-gray-800/50 p-6 rounded-lg h-[220px] flex flex-col justify-between hover:bg-gray-700/50 transition-colors"
            >
              <div>
                <FileText className="h-8 w-8 mb-4 text-gray-300" />
                <h2 className="text-xl font-bold mb-4">Reporting</h2>
                <p className="text-sm text-gray-300">
                  Access detailed analytics and reports on usage, spending, and technology adoption across your
                  organization.
                </p>
              </div>
              <span className="text-sm text-yellow-300 hover:underline">Learn more</span>
            </Link>

            {/* SKU Database */}
            <Link
              href="/sku-database"
              className="bg-gray-800/50 p-6 rounded-lg h-[220px] flex flex-col justify-between hover:bg-gray-700/50 transition-colors"
            >
              <div>
                <Database className="h-8 w-8 mb-4 text-gray-300" />
                <h2 className="text-xl font-bold mb-4">SKU Database</h2>
                <p className="text-sm text-gray-300">
                  Search and browse our comprehensive database of all available SKUs and product specifications.
                </p>
              </div>
              <span className="text-sm text-yellow-300 hover:underline">Learn more</span>
            </Link>

            {/* Billing Hub */}
            <Link
              href="/billing-hub"
              className="bg-gray-800/50 p-6 rounded-lg h-[220px] flex flex-col justify-between hover:bg-gray-700/50 transition-colors"
            >
              <div>
                <BarChart3 className="h-8 w-8 mb-4 text-gray-300" />
                <h2 className="text-xl font-bold mb-4">Billing Hub</h2>
                <p className="text-sm text-gray-300">
                  Manage invoices, payment methods, and view billing history for all your technology purchases.
                </p>
              </div>
              <span className="text-sm text-yellow-300 hover:underline">Learn more</span>
            </Link>

            {/* Admin Features & API Instructions */}
            <Link
              href="/admin-features"
              className="bg-gray-800/50 p-6 rounded-lg h-[220px] flex flex-col justify-between hover:bg-gray-700/50 transition-colors"
            >
              <div>
                <Code className="h-8 w-8 mb-4 text-gray-300" />
                <h2 className="text-xl font-bold mb-4">Admin Features & API</h2>
                <p className="text-sm text-gray-300">
                  Access administrative tools and documentation for integrating with our platform APIs.
                </p>
              </div>
              <span className="text-sm text-yellow-300 hover:underline">Learn more</span>
            </Link>
          </div>
        </div>

        {/* Advanced Search Section */}
        <div className="py-6 border-t border-gray-800">
          <button
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="flex items-center justify-between w-full bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="font-medium">Advanced Search & AI Assistant</span>
            </div>
            {isSearchExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {isSearchExpanded && (
            <div className="mt-4 bg-gray-800/30 p-6 rounded-lg border border-gray-700 transition-all">
              {/* Filter Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Global Service Code */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                    <Hash className="h-4 w-4 mr-1" />
                    Global Service Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:border-yellow-300"
                  />
                </div>

                {/* Engagement Code */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                    <Hash className="h-4 w-4 mr-1" />
                    Engagement Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:border-yellow-300"
                  />
                </div>

                {/* Sector */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                    <Building className="h-4 w-4 mr-1" />
                    Sector
                  </label>
                  <select className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:border-yellow-300">
                    <option value="">Select sector</option>
                    <option value="oil-gas">Oil and Gas</option>
                    <option value="power-utilities">Power and Utilities</option>
                    <option value="banking">Banking</option>
                    <option value="insurance">Insurance</option>
                    <option value="private-equity">Private Equity</option>
                    <option value="mining-metals">Mining and Metals</option>
                    <option value="consumer-products">Consumer Products</option>
                    <option value="real-estate">Real Estate</option>
                  </select>
                </div>

                {/* Date Added */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    Date Added
                  </label>
                  <input
                    type="date"
                    className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:border-yellow-300"
                  />
                </div>

                {/* Service Line Creator */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Service Line Creator
                  </label>
                  <input
                    type="text"
                    placeholder="Enter service line"
                    className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:border-yellow-300"
                  />
                </div>

                {/* Region Focused */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                    <Globe className="h-4 w-4 mr-1" />
                    Region Focused
                  </label>
                  <input
                    type="text"
                    placeholder="Enter region"
                    className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:border-yellow-300"
                  />
                </div>

                {/* Country Focused */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    Country Focused
                  </label>
                  <input
                    type="text"
                    placeholder="Enter country"
                    className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:border-yellow-300"
                  />
                </div>

                {/* Name (Type-ahead) */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                    <Tag className="h-4 w-4 mr-1" />
                    Product Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleNameSearch(e.target.value)}
                      placeholder="Type to search products"
                      className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:border-yellow-300"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("")
                          setSuggestions([])
                        }}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}

                    {/* Suggestions dropdown */}
                    {suggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-[#1a1a2e] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setSearchQuery(suggestion)
                              setSuggestions([])
                            }}
                            className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm text-gray-300"
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Assistant Field - Moved to bottom and enhanced */}
              <div className="mt-8 mb-4">
                <div className="flex items-center text-sm font-medium text-gray-300 mb-3">
                  <div className="flex items-center bg-yellow-300/10 rounded-full p-1 mr-2">
                    <span className="text-yellow-300 text-xs font-bold">AI</span>
                  </div>
                  AI Search Assistant
                  <span className="ml-2 text-xs text-gray-500">(Search the entire product and agentic catalog)</span>
                </div>
                <div className="relative">
                  <textarea
                    placeholder="This AI search agent knows our technology and agentic inventory and can also understand any fields you've entered above"
                    className="w-full bg-gradient-to-r from-[#0a0a14] to-[#1a1a2e] border-2 border-yellow-300/30 rounded-lg py-4 px-4 text-gray-300 focus:outline-none focus:border-yellow-300 min-h-[100px] resize-y"
                  ></textarea>
                  <button className="absolute right-3 bottom-3 bg-yellow-300 hover:bg-yellow-400 text-black rounded-md px-4 py-2 flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-2 flex justify-end space-x-3">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">Reset Filters</button>
                <button className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black rounded-md flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Technology Products Section */}
        <div className="py-12 border-t border-gray-800">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Technology Products</h2>
            <Link href="#" className="text-sm text-yellow-300 hover:underline">
              View all
            </Link>
          </div>
          <p className="text-gray-300 mb-8">Explore technology products that you can use to power your engagements.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Strategic Transaction Accounting Tool */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">Strategic Transaction Accounting Tool (STAT)</h3>
                  <span className="bg-yellow-300 text-black text-xs font-medium px-2 py-1 rounded">Featured</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Deploy a Storage Account as part of the Easy Build Experience. Easy Build builds basic and complex
                  components comprised of resources
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>

            {/* Data Analytics Platform */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">Data Analytics Platform</h3>
                  <span className="bg-yellow-300 text-black text-xs font-medium px-2 py-1 rounded">Featured</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  A comprehensive solution for data processing, analysis, and visualization to drive business insights
                  and decision-making.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>

            {/* Cloud Security Services */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">Cloud Security Services</h3>
                  <span className="bg-green-400 text-black text-xs font-medium px-2 py-1 rounded">New</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Protect your cloud infrastructure with advanced security monitoring, threat detection, and compliance
                  management tools.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>

            {/* AI Development Framework */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">AI Development Framework</h3>
                  <span className="bg-blue-400 text-black text-xs font-medium px-2 py-1 rounded">
                    Service Code Aligned
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Accelerate AI solution development with pre-built models, tools, and infrastructure designed for
                  enterprise-scale deployment.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>

            {/* Enterprise Integration Platform */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">Enterprise Integration Platform</h3>
                  <span className="bg-purple-400 text-black text-xs font-medium px-2 py-1 rounded">Sector Aligned</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Connect and integrate your enterprise applications and data sources with this comprehensive platform
                  solution.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>

            {/* DevOps Automation Suite */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">DevOps Automation Suite</h3>
                  <span className="bg-green-400 text-black text-xs font-medium px-2 py-1 rounded">New</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Streamline your development and operations workflows with automated CI/CD pipelines and infrastructure
                  as code.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>

            {/* Blockchain Solutions */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">Blockchain Solutions</h3>
                  <span className="bg-blue-400 text-black text-xs font-medium px-2 py-1 rounded">
                    Service Code Aligned
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Implement secure, transparent, and immutable blockchain solutions for your enterprise needs and use
                  cases.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>

            {/* IoT Management Suite */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">IoT Management Suite</h3>
                  <span className="bg-purple-400 text-black text-xs font-medium px-2 py-1 rounded">Sector Aligned</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Manage, monitor, and analyze your IoT devices and data with this comprehensive management platform.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agentic Tools Section */}
        <div className="py-12 border-t border-gray-800">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Agentic Tools</h2>
            <Link href="#" className="text-sm text-yellow-300 hover:underline">
              View all
            </Link>
          </div>
          <p className="text-gray-300 mb-8">
            Explore our collection of AI-powered agentic tools designed to automate complex tasks and workflows across
            your organization.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Intelligent Document Processing */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">Intelligent Document Processing</h3>
                  <span className="bg-yellow-300 text-black text-xs font-medium px-2 py-1 rounded">Featured</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Automate document analysis, extraction, and classification with advanced AI capabilities.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>

            {/* Autonomous Data Agent */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">Autonomous Data Agent</h3>
                  <span className="bg-yellow-300 text-black text-xs font-medium px-2 py-1 rounded">Featured</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Deploy intelligent agents that continuously monitor, analyze, and optimize your data pipelines.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>

            {/* Conversational Process Automation */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">Conversational Process Automation</h3>
                  <span className="bg-green-400 text-black text-xs font-medium px-2 py-1 rounded">New</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Streamline business processes through natural language interfaces and automated workflows.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>

            {/* Predictive Analytics Agent */}
            <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">Predictive Analytics Agent</h3>
                  <span className="bg-blue-400 text-black text-xs font-medium px-2 py-1 rounded">
                    Service Code Aligned
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Leverage AI to forecast trends, identify opportunities, and mitigate risks across your business.
                </p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => router.push("/")} className="text-sm text-gray-300 hover:text-white">
                    View more
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                  >
                    Start Estimate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

