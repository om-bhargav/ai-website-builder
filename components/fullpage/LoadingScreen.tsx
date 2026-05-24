"use client"
import { CoreSpinLoader } from "../core-spin-loader"

export default function LoadingScreen() {
  return (
    <div className="relative flex min-h-screen z-[9999] items-center justify-center overflow-hidden bg-sidebar px-6">
        <CoreSpinLoader/>
    </div>
  )
}