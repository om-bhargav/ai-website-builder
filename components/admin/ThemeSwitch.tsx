"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import {Sun,Moon, LucideIcon} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"

function ThemeSwitch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  const {theme,setTheme} = useTheme();
    const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      onClick={()=>setTheme((prev)=>prev==="light"?"dark":"light")}
      className={cn(
        "peer data-[state=checked]:bg-border mx-1 my-1 shadow-lg data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background text-gray-800 dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block rounded-full ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      >
        {theme==="dark" ? <CustomIcon Icon={Moon}/>:<CustomIcon Icon={Sun}/>}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export default ThemeSwitch;


function CustomIcon({
    Icon
}:{Icon:LucideIcon}){
    return <Icon size={10} strokeWidth={2}/>
}