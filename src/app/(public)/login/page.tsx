"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FacebookLoginButton, GoogleLoginButton } from "~/components/AuthButtons";
import PasswordInput from "~/components/form-inputs/PasswordInput";
import Form from "~/components/form/Form";
import { FullPageLoader } from "~/components/full-page-loader";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth-client";
import { passwordSchema } from "~/lib/schemas/auth.schema";

type PageProps = object;

const loginSchema = z.object({
    email: z.email("Enter a valid email address"),
    password: passwordSchema,
});

const Login: FC<PageProps> = ({}) => {
    const [showUnverifiedAlert, setShowUnverifiedAlert] = useState(false);
    const [disableSendVerification, setDisableSendVerification] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const callbackURL = searchParams.get("callbackURL");

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: searchParams.get("email") || "",
            password: "",
        },
    });

    const resendVerificationEmail = async () => {
        const email = form.getValues("email");
        if (!email) {
            return toast(`Please enter your email address first`);
        }
        const res = await authClient.sendVerificationEmail({
            email,
            callbackURL: callbackURL || "/home", // The redirect URL after verification
        });

        if (res.data?.status) {
            setDisableSendVerification(true);
            toast(`Verification email sent. Please check your inbox.`);
        } else {
            toast(res.error?.message || `Failed to send verification email.`);
        }
    };

    const login = async (data: unknown) => {
        const parsed = loginSchema.safeParse(data);

        if (!parsed.success) {
            return toast(`Please fill in the fields correctly`);
        }

        const d = parsed.data;

        const res = await authClient.signIn.email(
            {
                email: d.email,
                password: d.password,
                rememberMe: true,
                callbackURL: callbackURL || undefined,
            },
            {
                onError: (ctx) => {
                    if (ctx.error.status === 403) {
                        setShowUnverifiedAlert(true);
                    }
                },
            },
        );

        if (res.data) {
            toast(`Login successful.`);

            if (callbackURL) {
                window.location.href = callbackURL;
            } else {
                router.push(res.data.redirect ? res.data.url! : "/home");
            }
        } else {
            toast(res.error.message ?? `Some error occurred`);
        }
    };

    const callBackUrl = searchParams.get("callbackURL");
    return (
        <div className="relative grid place-items-center min-h-screen py-10">
            <Card className="max-w-xl w-full py-16 border-none ring-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>Enter your information to log in to OBS Power</CardDescription>
                </CardHeader>
                <CardContent className="px-4 md:px-16">
                    <Dialog open={showUnverifiedAlert} onOpenChange={setShowUnverifiedAlert}>
                        <DialogContent className="sm:max-w-xl" allowOverlayDismiss={false} showCloseButton={false}>
                            <DialogHeader>
                                <DialogTitle>Your email is not verified</DialogTitle>
                            </DialogHeader>
                            <p>
                                You need to verify your email address before logging in. Please check your inbox for a
                                verification email.
                            </p>
                            <p>
                                If you did not receive the email, you can resend the verification email by clicking the
                                button below.
                            </p>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button size={"lg"} variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    size={"lg"}
                                    variant="default"
                                    onClick={resendVerificationEmail}
                                    disabled={disableSendVerification}
                                >
                                    Resend verification email
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Form onFinish={(data) => login(data)} form={form}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <Form.Item name="email" label={`Email`}>
                                    <Input type="email" placeholder="m@exemple.com" />
                                </Form.Item>

                                <div>
                                    <Form.Item name="password" label={`Password`} className="mb`">
                                        <PasswordInput />
                                    </Form.Item>
                                    <Link href="/forgot-password" className="text-xs underline text-right block">
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button size={"lg"} type="submit" className="w-full">
                                    Log in
                                </Button>
                            </div>
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid gap-2">
                                <GoogleLoginButton callbackURL={callBackUrl} />
                                <FacebookLoginButton callbackURL={callBackUrl} />
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href={`/register${
                                        callBackUrl ? `?callbackURL=${encodeURIComponent(callBackUrl)}` : ""
                                    }`}
                                    className="underline underline-offset-4"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

const Page: FC<PageProps> = () => {
    return (
        <Suspense fallback={<FullPageLoader />}>
            <Login />
        </Suspense>
    );
};

export default Page;
