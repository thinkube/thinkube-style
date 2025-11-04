"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { Button } from "@/components/ui/button"
import { Cpu } from "lucide-react"

export default function TestComponent() {
  const [cpuCores] = useState(8)

  function handleClick() {
    // Removed console.log as per CODE_QUALITY_RULES.md
    // Use proper logging if needed
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>Test Component</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">This is a test React component with shadcn/ui components</p>
        <StatCard
          title="CPU"
          value={cpuCores}
          description="cores"
          icon={Cpu}
          variant="primary"
        />
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleClick}>Click Me</Button>
      </CardFooter>
    </Card>
  )
}
