"use client"

import { useState } from "react"

interface TimelineStage {
  id: string
  title: string
  date: string
  description: string
  isActive: boolean
  isCompleted: boolean
}

const stages: TimelineStage[] = [
  {
    id: "registration",
    title: "Registration",
    date: "Jan 15 - Feb 15",
    description: "Team registration and project submission",
    isActive: false,
    isCompleted: true,
  },
  {
    id: "qualifiers",
    title: "Qualifiers",
    date: "Feb 20 - Feb 25",
    description: "Initial screening and evaluation",
    isActive: true,
    isCompleted: false,
  },
  {
    id: "semifinals",
    title: "Semi-finals",
    date: "Mar 1 - Mar 5",
    description: "Top teams compete for finals",
    isActive: false,
    isCompleted: false,
  },
  {
    id: "finals",
    title: "Finals",
    date: "Mar 10",
    description: "Grand finale and winner announcement",
    isActive: false,
    isCompleted: false,
  },
]

export function Timeline() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200"></div>

        <div className="flex justify-between">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex flex-col items-center relative">
              {/* Timeline dot */}
              <div
                className={`w-4 h-4 rounded-full border-4 ${
                  stage.isCompleted
                    ? "bg-green-500 border-green-500"
                    : stage.isActive
                    ? "bg-blue-500 border-blue-500"
                    : "bg-gray-300 border-gray-300"
                }`}
              ></div>

              {/* Content */}
              <div className="mt-4 text-center max-w-[200px]">
                <h3 className="font-semibold text-gray-900">{stage.title}</h3>
                <p className="text-sm text-blue-600 font-medium">{stage.date}</p>
                <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}