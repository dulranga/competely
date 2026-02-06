"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FacebookLoginButton, GoogleLoginButton } from "~/components/common/AuthButtons";
import { CheckboxInput } from "~/components/form-inputs/Checkbox";
import PasswordInput from "~/components/form-inputs/PasswordInput";
import Form from "~/components/form/Form";
import { FullPageLoader } from "~/components/common/FullPageLoader";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth-client";
import { passwordSchema } from "~/lib/schemas/auth.schema";

type PageProps = object;

const registerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: passwordSchema,
    is_agreed: z.boolean(),
});

const Register: FC<PageProps> = ({}) => {
    const [disableButton, setDisableButton] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: searchParams.get("email") || "",
            password: "",
            is_agreed: false,
        },
    });

    useEffect(() => {
        const email = searchParams.get("email");
        if (email) {
            form.setValue("email", email);
        }
    }, [searchParams, form]);

    const register = async (data: unknown) => {
        try {
            setDisableButton(true);
            const parsed = registerSchema.safeParse(data);

            if (!parsed.success) {
                return toast(`Please fill in with valid data`);
            }

            const d = parsed.data;

            if (!d.is_agreed) return toast(`Please accept our Terms of Use and Privacy Policy`);

            const callbackURL = searchParams.get("callbackURL");

            const res = await authClient.signUp.email({
                name: `${d.firstName} ${d.lastName}`,
                email: d.email,
                password: d.password,
                callbackURL: callbackURL || undefined,
            });

            if (res.data) {
                toast(`Successfully Registered`);

                router.push(callbackURL || "/home");

                // toast(`Verification email sent. Please check your inbox.`);
            } else {
                toast(`Registration failed. Please try again later.`);
            }
        } catch {
            toast(`Registration failed. Please try again later.`);
        } finally {
            setDisableButton(false);
        }
    };

    const callBackUrl = searchParams.get("callbackURL");
    return (
        <div className="relative grid place-items-center min-h-screen py-10">
            <Card className="max-w-xl w-full py-16 border-none ring-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>Enter your information to create an OBS Power account</CardDescription>
                </CardHeader>
                <CardContent className="px-4 md:px-16">
                    <Form form={form} onFinish={(data) => register(data)}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <Form.Item name="firstName" label={`First Name`}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="lastName" label={`Last Name`}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="email" label={`Email`}>
                                    <Input type="email" placeholder="m@exemple.com" />
                                </Form.Item>

                                <Form.Item name="password" label={`Password`}>
                                    <PasswordInput />
                                </Form.Item>

                                <Controller
                                    name="is_agreed"
                                    control={form.control}
                                    render={({ field }) => (
                                        <CheckboxInput
                                            field={field}
                                            label={
                                                <div className="text-muted-foreground *:[a]:hover:text-primary text-xs *:[a]:underline *:[a]:underline-offset-4">
                                                    By clicking continue, you agree to our{" "}
                                                    <Link href="/terms">Terms of Use</Link> and{" "}
                                                    <Link href="/privacy-policy">Privacy Policy</Link>.
                                                </div>
                                            }
                                        />
                                    )}
                                />

                                <Button size={"lg"} type="submit" className="w-full" disabled={disableButton}>
                                    Create an account
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
                                Already have an account?{" "}
                                <Link
                                    href={`/login${
                                        callBackUrl ? `?callbackURL=${encodeURIComponent(callBackUrl)}` : ""
                                    }`}
                                    className="underline underline-offset-4"
                                >
                                    Log in here
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
            <Register />
        </Suspense>
    );
};

export default Page;
