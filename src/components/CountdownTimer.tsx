"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Mock countdown - 7 days from now
    const targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex space-x-4">
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-md p-4 min-w-[80px]">
          <div className="text-2xl font-bold text-blue-600">{timeLeft.days}</div>
          <div className="text-sm text-gray-600">Days</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-md p-4 min-w-[80px]">
          <div className="text-2xl font-bold text-blue-600">{timeLeft.hours}</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-md p-4 min-w-[80px]">
          <div className="text-2xl font-bold text-blue-600">{timeLeft.minutes}</div>
          <div className="text-sm text-gray-600">Minutes</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-md p-4 min-w-[80px]">
          <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</div>
          <div className="text-sm text-gray-600">Seconds</div>
        </div>
      </div>
    </div>
  )
}