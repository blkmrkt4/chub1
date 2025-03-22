"use client"

import { useEffect, useState } from "react"
import { X, Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { OrderItemDetailsDialog } from "@/components/order-item-details-dialog"

interface OrderBundlePanelProps {
  isOpen: boolean
  onClose: () => void
}

// Extended order item type with more details
interface OrderItem {
  id: number
  name: string
  sku: string
  cost: number
  frequency: string
  quantity: number
  description?: string
  type?: string
  minIncrements?: number
}

export function OrderBundlePanel({ isOpen, onClose }: OrderBundlePanelProps) {
  // Sample order items data with extended information
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: 1,
      name: "Single Tenant Small/Medium",
      sku: "CT-EYSTAT-STSM02",
      cost: 2000,
      frequency: "Monthly",
      quantity: 1,
      description:
        "The Single-Tenant Small/Medium solution provides dedicated infrastructure for organizations requiring enhanced security, customization options, and performance.",
      type: "Fixed Monthly Charge",
      minIncrements: 1,
    },
    {
      id: 2,
      name: "Implementation Services",
      sku: "CT-EYSTAT-IMP01",
      cost: 5000,
      frequency: "One Time",
      quantity: 1,
      description:
        "Professional services for implementation, configuration, and deployment of the Strategic Transaction Accounting Tool in your environment.",
      type: "Fixed, One Time",
    },
    {
      id: 3,
      name: "Training Package",
      sku: "CT-EYSTAT-TRN01",
      cost: 1500,
      frequency: "One Time",
      quantity: 1,
      description:
        "Comprehensive training program for all user levels, from basic operation to advanced administration.",
      type: "Fixed, One Time",
    },
  ])

  const [activeItemDetails, setActiveItemDetails] = useState<OrderItem | null>(null)

  // Prevent scrolling when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Close panel when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !activeItemDetails) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose, activeItemDetails])

  // Handle quantity changes
  const updateQuantity = (id: number, delta: number) => {
    setOrderItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(item.minIncrements || 1, item.quantity + delta)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  // Handle item removal
  const removeItem = (id: number) => {
    setOrderItems((items) => items.filter((item) => item.id !== id))
  }

  // Handle quantity update from details dialog
  const handleUpdateQuantity = (id: number, quantity: number) => {
    setOrderItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity }
        }
        return item
      }),
    )
  }

  // Open item details
  const openItemDetails = (item: OrderItem) => {
    setActiveItemDetails(item)
  }

  // Calculate totals
  const recurringTotal = orderItems
    .filter((item) => item.frequency === "Monthly")
    .reduce((sum, item) => sum + item.cost * item.quantity, 0)

  const oneTimeTotal = orderItems
    .filter((item) => item.frequency === "One Time")
    .reduce((sum, item) => sum + item.cost * item.quantity, 0)

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-96 bg-[#0a0a14] z-50 shadow-xl transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Order Bundle
              <span className="ml-2 bg-yellow-300 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {orderItems.length}
              </span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white focus:outline-none"
              aria-label="Close panel"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {/* Order Items */}
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800/30 rounded-lg p-3 text-sm hover:bg-gray-700/30 transition-colors cursor-pointer"
                  onClick={() => openItemDetails(item)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-yellow-300 font-bold">${item.cost.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between text-gray-400 text-xs mb-2">
                    <div>SKU: {item.sku}</div>
                    <div>{item.frequency}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {item.frequency !== "One Time" ? (
                        <>
                          <button
                            className="text-gray-400 hover:text-white p-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              updateQuantity(item.id, -1)
                            }}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-2 text-white">{item.quantity}</span>
                          <button
                            className="text-gray-400 hover:text-white p-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              updateQuantity(item.id, 1)
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400">Fixed</span>
                      )}
                    </div>
                    <button
                      className="text-gray-400 hover:text-red-500 text-xs"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeItem(item.id)
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 space-y-3 border-t border-gray-800 pt-4">
              {oneTimeTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">One-time charges:</span>
                  <span className="font-medium">${oneTimeTotal.toLocaleString()}</span>
                </div>
              )}
              {recurringTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Monthly charges:</span>
                  <span className="font-medium">${recurringTotal.toLocaleString()}/month</span>
                </div>
              )}
              <div className="flex justify-between text-base pt-2 border-t border-gray-800 mt-2">
                <span className="text-white font-medium">Total:</span>
                <div className="text-right">
                  {oneTimeTotal > 0 && (
                    <div className="font-bold">
                      ${oneTimeTotal.toLocaleString()}{" "}
                      <span className="text-xs font-normal text-gray-400">one-time</span>
                    </div>
                  )}
                  {recurringTotal > 0 && (
                    <div className="font-bold">
                      ${recurringTotal.toLocaleString()}{" "}
                      <span className="text-xs font-normal text-gray-400">per month</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gray-800/30 rounded-lg text-xs text-gray-300">
              <p>
                Your subscription will begin immediately upon completion of the order. The first billing cycle will be
                prorated based on the current date.
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800">
            <Button className="w-full bg-yellow-300 hover:bg-yellow-400 text-black">Proceed to Checkout</Button>
            <Button variant="outline" className="w-full mt-2" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      {/* Item Details Dialog */}
      {activeItemDetails && (
        <OrderItemDetailsDialog
          isOpen={true}
          onClose={() => setActiveItemDetails(null)}
          item={activeItemDetails}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </>
  )
}

