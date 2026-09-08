import { AuthGuard } from "@/components/auth/auth-guard";

export default function ProtectedLayout({
    children,
}) {
    return <AuthGuard>{children}</AuthGuard>;
}