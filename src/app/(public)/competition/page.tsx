"use client"


import { CountdownTimer } from "~/components/CountdownTimer"
import { Timeline } from "~/components/Timeline"
import { PrizeCard } from "~/components/PrizeCard"
import { JudgeCard } from "~/components/JudgeCard"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function CompetitionLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)'}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Build the future of technology
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-blue-100">
              Join thousands of developers, designers, and innovators from around the world
              in a 48-hour coding marathon to solve real-world problems and create amazing solutions.
            </p>

            {/* Countdown Timer */}
            <div className="mb-8 flex justify-center animate-pulse">
              <div className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4">Registration closes in:</h2>
                <CountdownTimer />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 animate-bounce">
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
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
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
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prize Pool
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Compete for amazing prizes and recognition
            </p>
            <div className="text-5xl font-bold text-blue-600 mb-4">$50,000</div>
            <p className="text-xl text-gray-700 mb-8">Total Prize Money</p>
            <div className="h-64 w-full max-w-2xl mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: '1st Place', amount: 25000, color: '#FFD700' },
                  { name: '2nd Place', amount: 15000, color: '#C0C0C0' },
                  { name: '3rd Place', amount: 10000, color: '#CD7F32' },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Prize']} />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Organizing Committee Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
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
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg animate-spin">
                👨‍💻
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
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg animate-spin">
                👩‍💻
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
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg animate-spin">
                👨‍🎨
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
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg animate-spin">
                👩‍🎤
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