"use client"

import Link from "next/link"

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a14] border-b border-gray-800">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-10">
            <span className="font-bold text-yellow-300 text-2xl">EY</span>
            <span className="ml-2 text-white hidden md:inline-block">Client Technology Commercial Hub</span>
          </Link>
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
  )
}

