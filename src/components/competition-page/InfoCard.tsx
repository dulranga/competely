"use client"

import { MapPin, FileText, Clock, Users, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Card } from "~/components/ui/card"

export function InfoCard() {
    return (
        <Card className="rounded-3xl border-border shadow-sm p-8">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-gray-400" />
                <span>Info</span>
            </h3>
            <p className="text-gray-500 text-sm mb-6 pl-9">
                See more details about this competition
            </p>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-gray-700 mt-1" />
                    <div>
                        <span className="text-gray-900 font-semibold block">BMICH</span>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <FileText className="w-5 h-5 text-gray-700 mt-1" />
                    <div>
                        <span className="text-gray-900 font-semibold block">Guidelines</span>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-gray-700 mt-1" />
                    <div>
                        <span className="text-gray-900 font-semibold block">Registration Deadline - 2026/01/29 - 11.59 PM</span>
                    </div>
                </div>

                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                    <Users className="w-5 h-5 text-gray-700 mt-1" />
                    <div>
                        <span className="text-gray-900 font-semibold block">Participants - 100+</span>
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Follow us</p>
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 hover:scale-110 transition-transform cursor-pointer">
                            <Facebook className="w-4 h-4" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 hover:scale-110 transition-transform cursor-pointer">
                            <Twitter className="w-4 h-4" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 hover:scale-110 transition-transform cursor-pointer">
                            <Instagram className="w-4 h-4" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 hover:scale-110 transition-transform cursor-pointer">
                            <Youtube className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
