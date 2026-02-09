"use client"

import { Phone, Mail } from "lucide-react"
import { Button } from "~/components/ui/button"

export type Contact = {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string | null;
    imageUrl: string | null;
}

interface ContactUsSectionProps {
    contacts: Contact[];
}

export function ContactUsSection({ contacts }: ContactUsSectionProps) {
    if (!contacts || contacts.length === 0) {
        return null;
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl font-black text-foreground mb-4 uppercase tracking-tight">CONTACT US</h2>
                    <p className="text-xl text-muted-foreground">Need a hand? We're just a message away.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="bg-card rounded-3xl p-8 flex flex-col items-center text-center shadow-sm border border-border hover:border-primary/50 transition-colors duration-300">
                            {/* Avatar */}
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-muted mb-6 shrink-0 bg-muted flex items-center justify-center">
                                {contact.imageUrl ? (
                                    <img
                                        src={contact.imageUrl}
                                        alt={contact.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl font-bold text-muted-foreground">
                                        {contact.name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>

                            {/* Info */}
                            <h3 className="text-xl font-bold text-foreground mb-1">{contact.name}</h3>
                            <div className="text-muted-foreground font-medium">{contact.role}</div>

                            {/* Buttons */}
                            <div className="w-full space-y-3 mt-8">
                                {contact.phone && (
                                    <Button variant="secondary" className="w-full rounded-full gap-2" asChild>
                                        <a href={`tel:${contact.phone}`}>
                                            <Phone className="w-4 h-4" />
                                            {contact.phone}
                                        </a>
                                    </Button>
                                )}
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
