"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface UserDropdownProps {
    user: {
        id: string;
        name: string;
        email: string;
        image?: string | null;
    };
}

export default function UserDropdown({ user }: UserDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [isPasswordMode, setIsPasswordMode] = useState(false);

    const handleSave = async () => {
        // Save Profile Info
        if (formData.name !== user.name) {
            console.log("Saving profile data:", formData);
            const { updateProfile } = await import("~/data-access/update-profile");
            const result = await updateProfile({ name: formData.name });
            if (result.success) {
                console.log("Profile updated successfully");
            }
        }

        // Save Password if in password mode and fields are filled
        if (isPasswordMode && passwordData.currentPassword && passwordData.newPassword) {
            const { updatePassword } = await import("~/data-access/update-password");
            const result = await updatePassword(passwordData.currentPassword, passwordData.newPassword);
            if (result.success) {
                console.log("Password updated successfully");
                setIsPasswordMode(false);
                setPasswordData({ currentPassword: "", newPassword: "" });
            } else {
                console.error("Failed to update password:", result.error);
                // In a real app, show a toast here
            }
        }

        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({ name: user.name, email: user.email });
        setIsEditing(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar size="lg">
                        <AvatarImage src={user.image ?? undefined} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4" align="end">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border">
                            <AvatarImage src={user.image ?? undefined} alt={user.name} />
                            <AvatarFallback>
                                <User className="h-8 w-8 text-muted-foreground" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-semibold text-lg">{formData.name}</h4>
                            <p className="text-sm text-muted-foreground break-all">{formData.email}</p>
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="space-y-3 pt-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            {isPasswordMode ? (
                                <>
                                    <div className="space-y-1">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) =>
                                                setPasswordData({ ...passwordData, currentPassword: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) =>
                                                setPasswordData({ ...passwordData, newPassword: e.target.value })
                                            }
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="pt-2">
                                    <Label>Password</Label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full mt-1"
                                        onClick={() => setIsPasswordMode(true)}
                                    >
                                        Change Password
                                    </Button>
                                </div>
                            )}

                            <div className="flex gap-2 pt-2">
                                <Button onClick={handleSave} className="flex-1">
                                    Save Changes
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setIsPasswordMode(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-2">
                            <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </Button>
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
