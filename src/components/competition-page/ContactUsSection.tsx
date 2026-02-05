"use client"

import { Phone, Mail } from "lucide-react"
import { Button } from "~/components/ui/button"

export function ContactUsSection() {
    const contacts = [
        {
            name: "Jhonas Khanwald",
            role: "President",
            org: "Tec Dev Club",
            phone: "0123456789",
            email: "jhonas@gmail.com",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
        },
        {
            name: "Martha Nielsen",
            role: "Event Co-chair",
            org: "Tec Dev Club",
            phone: "0123456789",
            email: "martha@gmail.com",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
        },
        {
            name: "Mikkel Nielsen",
            role: "Event Co-chair",
            org: "Tec Dev Club",
            phone: "0123456789",
            email: "mikkel@gmail.com",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww"
        }
    ]

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl font-black text-foreground mb-4 uppercase tracking-tight">CONTACT US</h2>
                    <p className="text-xl text-muted-foreground">Need a hand? We're just a message away.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contacts.map((contact, index) => (
                        <div key={index} className="bg-card rounded-3xl p-8 flex flex-col items-center text-center shadow-sm border border-border hover:border-primary/50 transition-colors duration-300">
                            {/* Avatar */}
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-muted mb-6 shrink-0 bg-muted">
                                <img
                                    src={contact.image}
                                    alt={contact.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Info */}
                            <h3 className="text-xl font-bold text-foreground mb-1">{contact.name}</h3>
                            <div className="text-muted-foreground font-medium">{contact.role}</div>
                            <div className="text-muted-foreground/60 text-sm mb-8">{contact.org}</div>

                            {/* Buttons */}
                            <div className="w-full space-y-3 mt-auto">
                                <Button variant="secondary" className="w-full rounded-full gap-2" asChild>
                                    <a href={`tel:${contact.phone}`}>
                                        <Phone className="w-4 h-4" />
                                        {contact.phone}
                                    </a>
                                </Button>
                                <Button variant="outline" className="w-full rounded-full gap-2" asChild>
                                    <a href={`mailto:${contact.email}`}>
                                        <Mail className="w-4 h-4" />
                                        {contact.email}
                                    </a>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
