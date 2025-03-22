"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SKUInfoDialogProps {
  isOpen: boolean
  onClose: () => void
  skuData: {
    id: string
    name: string
    description: string
    returnable: boolean
    status: string
    type: string
    minIncrements: number
    incrementPeriod: string
  }
}

export function SKUInfoDialog({ isOpen, onClose, skuData }: SKUInfoDialogProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const dialogRef = useRef<HTMLDivElement>(null)

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

  if (!isOpen) return null

  return (
    <div
      ref={dialogRef}
      className={cn(
        "fixed z-50 bg-[#1a1a2e] border border-gray-700 rounded-lg shadow-xl",
        "w-[600px] max-h-[80vh] overflow-auto",
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
        <h2 className="text-xl font-bold text-white">{skuData.name} Details</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Full Description</h3>
          <div className="bg-[#0a0a14] border border-gray-700 rounded-md p-4 text-gray-300">{skuData.description}</div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Returnable */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Returnable</h3>
            <div className="flex items-center">
              <div
                className={`w-11 h-6 flex items-center rounded-full p-1 ${skuData.returnable ? "bg-yellow-300" : "bg-gray-700"}`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${skuData.returnable ? "translate-x-5" : "translate-x-0"}`}
                ></div>
              </div>
              <span className="ml-3 text-gray-300">{skuData.returnable ? "Yes" : "No"}</span>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Status</h3>
            <div className="bg-[#0a0a14] border border-gray-700 rounded-md p-2 text-gray-300">{skuData.status}</div>
          </div>

          {/* Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Type</h3>
            <div className="bg-[#0a0a14] border border-gray-700 rounded-md p-2 text-gray-300">{skuData.type}</div>
          </div>

          {/* Minimum Increments */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Minimum Increments</h3>
            <div className="bg-[#0a0a14] border border-gray-700 rounded-md p-2 text-gray-300">
              {skuData.minIncrements}
            </div>
          </div>

          {/* Increment Period */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Increment Period</h3>
            <div className="bg-[#0a0a14] border border-gray-700 rounded-md p-2 text-gray-300">
              {skuData.incrementPeriod}
            </div>
          </div>

          {/* SKU Name */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">SKU Name</h3>
            <div className="bg-[#0a0a14] border border-gray-700 rounded-md p-2 text-gray-300">{skuData.id}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-700 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

