"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

// shadcn/ui's Radix-based tabs, styled with the portfolio's existing tokens.
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className = "", ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={`inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] p-1 ${className}`} {...props} />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-3 py-2 text-xs text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white/10 data-[state=active]:text-white ${className}`} {...props} />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={`mt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`} {...props} />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
