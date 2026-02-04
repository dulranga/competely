"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { FileText } from "lucide-react"

export function RegistrationCard() {
    return (
        <Card className="rounded-3xl border-border shadow-sm text-center overflow-hidden">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Ready to Win? Register Now</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                    Join the competition today and show what you're capable of. Register now to lock in your spot, challenge yourself, and compete for exciting prizes alongside others just like you.
                </p>

                <div className="space-y-3">
                    <Button className="w-full font-bold" size="lg">
                        Register →
                    </Button>

                    <Button variant="outline" className="w-full font-bold" size="lg">
                        <FileText className="w-4 h-4 mr-2" /> Get guidelines
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
