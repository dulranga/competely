"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/Button"

const interests = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "AI",
  "Blockchain",
  "IoT",
  "Cybersecurity",
  "Game Development",
  "DevOps",
  "UI/UX Design",
  "Product Management",
]

export default function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock API call
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
    }, 1000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Interests Saved!
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Your profile has been set up successfully
              </p>
              <div className="mt-6">
                <Link href="/">
                  <Button className="w-full">
                    Start Exploring
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          What are you interested in?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select your areas of interest to personalize your experience
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 text-sm font-medium rounded-md border transition-colors ${
                      selectedInterests.includes(interest)
                        ? "bg-blue-100 border-blue-500 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || selectedInterests.length === 0}
                >
                  {isLoading ? "Saving..." : "Save Interests"}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Skip for now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}