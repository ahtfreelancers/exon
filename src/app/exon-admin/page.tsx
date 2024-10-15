import { auth } from "../../../auth";
import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";

const LoginPage = async () => {
    const session = await auth()

    if (session) {
        return redirect('/dashboard')
    }

    return (
        <LoginForm />
    );
}

export default LoginPage
