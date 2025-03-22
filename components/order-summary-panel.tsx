"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface OrderSummaryPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function OrderSummaryPanel({ isOpen, onClose }: OrderSummaryPanelProps) {
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
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

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
            <h2 className="text-xl font-bold text-white">Order Summary</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white focus:outline-none"
              aria-label="Close panel"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4 text-white">
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-gray-300">Selected Product:</span>
                <span className="font-medium">Single Tenant Small/Medium</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-gray-300">SKU:</span>
                <span className="font-medium">CT-EYSTAT-STSM02</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-gray-300">Cost:</span>
                <span className="font-medium">$2000</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-gray-300">Billing Frequency:</span>
                <span className="font-medium">Monthly</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-300 font-medium">Total:</span>
                <span className="font-bold text-xl">$2000 / month</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
              <h3 className="font-semibold mb-2">Order Notes</h3>
              <p className="text-gray-300 text-sm">
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
    </>
  )
}

