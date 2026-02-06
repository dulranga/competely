"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PasswordInput from "~/components/form-inputs/PasswordInput";
import Form from "~/components/form/Form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { authClient } from "~/lib/auth-client";
import { passwordSchema } from "~/lib/schemas/auth.schema";

type PageProps = object;

const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const Page: FC<PageProps> = ({}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const handleSubmit = async (formData: unknown) => {
        if (!token) {
            return toast("Missing or invalid reset token");
        }

        const parsed = resetPasswordSchema.safeParse(formData);

        if (!parsed.success) {
            return toast("Please fill in the fields correctly");
        }

        const { error } = await authClient.resetPassword({
            newPassword: parsed.data.password,
            token,
        });
        if (error) {
            return toast.error("An error occurred while resetting your password");
        }

        toast("Password reset successfully");
        router.push("/login");
    };

    if (!token) {
        return (
            <div className="relative grid place-items-center min-h-screen py-10">
                <Card className="max-w-xl w-full py-16 border-none ring-0">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Invalid link</CardTitle>
                        <CardDescription>
                            The reset link is missing or has expired. Please request a new link.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 md:px-16">
                        <div className="text-center">
                            <Link href="/forgot-password" className="underline underline-offset-4">
                                Request a new link
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="relative grid place-items-center min-h-screen py-10">
            <Card className="max-w-xl w-full py-16 border-none ring-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Reset your password</CardTitle>
                    <CardDescription>Enter your new password below</CardDescription>
                </CardHeader>
                <CardContent className="px-4 md:px-16">
                    <Form onFinish={(data) => handleSubmit(data)} form={form}>
                        <div className="grid gap-6">
                            <Form.Item name="password" label="New Password">
                                <PasswordInput />
                            </Form.Item>

                            <Form.Item name="confirmPassword" label="Confirm Password">
                                <PasswordInput />
                            </Form.Item>

                            <Button size={"lg"} type="submit" className="w-full">
                                Reset password
                            </Button>

                            <div className="text-center text-sm">
                                Remember your password?{" "}
                                <Link href="/login" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
