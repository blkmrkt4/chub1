"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderItemDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  item: {
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
  onUpdateQuantity: (id: number, quantity: number) => void
}

export function OrderItemDetailsDialog({ isOpen, onClose, item, onUpdateQuantity }: OrderItemDetailsDialogProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [quantity, setQuantity] = useState(item.quantity)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Update local quantity when item changes
  useEffect(() => {
    setQuantity(item.quantity)
  }, [item.quantity])

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dialogRef.current && e.target === e.currentTarget) {
      setIsDragging(true)
      const rect = dialogRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle quantity change
  const handleQuantityChange = (value: string) => {
    const numValue = Number.parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= (item.minIncrements || 1)) {
      setQuantity(numValue)
    }
  }

  // Save changes on close
  const handleSave = () => {
    onUpdateQuantity(item.id, quantity)
    onClose()
  }

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSave()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, quantity])

  if (!isOpen) return null

  const isOneTime = item.frequency === "One Time"

  return (
    <div
      ref={dialogRef}
      className={cn(
        "fixed z-50 bg-[#1a1a2e] border border-gray-700 rounded-lg shadow-xl",
        "w-[500px] max-h-[80vh] overflow-auto",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Header - Draggable area */}
      <div
        className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#0a0a14]"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-xl font-bold text-white">{item.name}</h2>
        <button
          onClick={handleSave}
          className="text-gray-400 hover:text-white focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* SKU Info */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">SKU</h3>
            <div className="text-gray-300">{item.sku}</div>
          </div>
          <div className="text-right">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Cost</h3>
            <div className="text-yellow-300 font-bold text-lg">
              ${item.cost.toLocaleString()}
              {!isOneTime && <span className="text-xs text-gray-400 ml-1">/ {item.frequency.toLowerCase()}</span>}
            </div>
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
            <div className="bg-[#0a0a14] border border-gray-700 rounded-md p-4 text-gray-300 text-sm">
              {item.description}
            </div>
          </div>
        )}

        {/* Quantity/Increments */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-400">
              {isOneTime ? "Quantity" : "Increments"}
              {item.minIncrements && !isOneTime && (
                <span className="text-xs text-gray-500 ml-2">(Min: {item.minIncrements})</span>
              )}
            </h3>
            <div className="flex items-center">
              {!isOneTime ? (
                <input
                  type="number"
                  min={item.minIncrements || 1}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="w-20 bg-[#0a0a14] border border-gray-700 rounded px-2 py-1 text-white text-center"
                />
              ) : (
                <div className="text-gray-300">1 (Fixed)</div>
              )}
            </div>
          </div>
        </div>

        {/* Type */}
        {item.type && (
          <div className="flex justify-between items-center border-t border-gray-700 pt-4">
            <h3 className="text-sm font-medium text-gray-400">Type</h3>
            <div className="text-gray-300">{item.type}</div>
          </div>
        )}

        {/* Billing Frequency */}
        <div className="flex justify-between items-center border-t border-gray-700 pt-4">
          <h3 className="text-sm font-medium text-gray-400">Billing Frequency</h3>
          <div className="text-gray-300">{item.frequency}</div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t border-gray-700 pt-4 font-bold">
          <h3 className="text-sm font-medium text-white">Total</h3>
          <div className="text-yellow-300 text-lg">
            ${(item.cost * quantity).toLocaleString()}
            {!isOneTime && <span className="text-xs text-gray-400 ml-1">/ {item.frequency.toLowerCase()}</span>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 flex justify-end">
        <button onClick={handleSave} className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black rounded-md">
          Update Cart
        </button>
      </div>
    </div>
  )
}

