"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Form from "~/components/form/Form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { requestPasswordReset } from "~/data-access/requestPasswordReset";

type PageProps = object;

const forgotPasswordSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

const Page: FC<PageProps> = ({}) => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async (formData: unknown) => {
        try {
            const parsed = forgotPasswordSchema.safeParse(formData);

            if (!parsed.success) {
                return toast("Please enter a valid email address");
            }

            const d = parsed.data;

            const { success, message } = await requestPasswordReset(d.email, "/reset-password");
            form.reset();

            if (!success) {
                return toast.error(message || "Something went wrong");
            }

            toast("We just sent a reset link to your inbox.");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative grid place-items-center min-h-screen py-10">
            <Card className="max-w-xl w-full py-16 border-none ring-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Reset your password</CardTitle>
                    <CardDescription className="text-balance">
                        Enter your email address and we will send you a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-4 md:px-16 w-full">
                    <Form onFinish={(data) => handleSubmit(data)} form={form}>
                        <div className="grid gap-6">
                            <Form.Item name="email" label="Email">
                                <Input type="email" placeholder="you@example.com" />
                            </Form.Item>

                            <Button size={"lg"} type="submit" className="w-full">
                                Send reset link
                            </Button>
                            <Button
                                size={"lg"}
                                type="button"
                                variant={"outline"}
                                className="w-full"
                                onClick={() => router.back()}
                            >
                                Go back
                            </Button>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
