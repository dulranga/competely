import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import getCurrentPath from "~/lib/getCurrentPathServer";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = await getCurrentPath();

  const session = await auth.api.getSession({
    headers: headersList,
  });
  if (!session) {
    redirect(`/login?callbackURL=${encodeURIComponent(pathname)}`);
  }

  return <>{children}</>;
}
