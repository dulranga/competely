"use client"

import { Navbar } from "@/components/Navbar"
import { CountdownTimer } from "@/components/CountdownTimer"
import { Timeline } from "@/components/Timeline"
import { PrizeCard } from "@/components/PrizeCard"
import { JudgeCard } from "@/components/JudgeCard"
import { Button } from "@/components/Button"
import Link from "next/link"

export default function CompetitionLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Global Hackathon 2025
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Build the future of technology
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-blue-100">
              Join thousands of developers, designers, and innovators from around the world
              in a 48-hour coding marathon to solve real-world problems and create amazing solutions.
            </p>

            {/* Countdown Timer */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Registration closes in:</h2>
              <CountdownTimer />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Register Now
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Competition Timeline
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow the journey from registration to the grand finale
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prize Pool
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Compete for amazing prizes and recognition
            </p>
            <div className="text-5xl font-bold text-blue-600 mb-4">$50,000</div>
            <p className="text-xl text-gray-700">Total Prize Money</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PrizeCard
              position={1}
              amount="$25,000"
              description="First Place Winner"
            />
            <PrizeCard
              position={2}
              amount="$15,000"
              description="Second Place Winner"
            />
            <PrizeCard
              position={3}
              amount="$10,000"
              description="Third Place Winner"
            />
          </div>
        </div>
      </section>

      {/* Judges Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Judges
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Industry experts and thought leaders evaluating your innovations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <JudgeCard
              name="Sarah Chen"
              role="CTO at TechCorp"
              company="TechCorp"
            />
            <JudgeCard
              name="Marcus Johnson"
              role="VP Engineering"
              company="InnovateLabs"
            />
            <JudgeCard
              name="Dr. Emily Rodriguez"
              role="AI Research Lead"
              company="FutureAI"
            />
          </div>
        </div>
      </section>

      {/* Organizing Committee Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Organizing Committee
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the team behind Global Hackathon 2025
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                👤
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Alex Thompson</h3>
              <p className="text-blue-600 font-medium mb-2">Event Director</p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-gray-600">🐦</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">💼</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">📧</a>
              </div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                👤
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Lisa Park</h3>
              <p className="text-blue-600 font-medium mb-2">Technical Lead</p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-gray-600">🐦</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">💼</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">📧</a>
              </div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                👤
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">David Kim</h3>
              <p className="text-blue-600 font-medium mb-2">Sponsorship Manager</p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-gray-600">🐦</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">💼</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">📧</a>
              </div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                👤
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Maria Garcia</h3>
              <p className="text-blue-600 font-medium mb-2">Community Manager</p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-gray-600">🐦</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">💼</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">📧</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the Challenge?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't miss your chance to be part of the next big innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Register Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Global Hackathon 2025</h3>
            <p className="text-gray-400 mb-4">
              Building the future, one line of code at a time.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white">Discord</a>
              <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}