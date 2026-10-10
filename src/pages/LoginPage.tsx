import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, type Location } from "react-router-dom";

import { useLogin } from "@/features/auth/use-login";
import { loginSchema, type LoginFormValues } from "@/features/auth/auth.schema";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn, errorMessage, reset } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const location = useLocation();

  const from = (location.state as { from?: Location } | null)?.from;

  const redirectTo =
    from?.pathname?.startsWith("/") && !from.pathname.startsWith("//") && from.pathname !== "/login"
      ? `${from.pathname}${from.search}${from.hash}`
      : "/";

  async function onSubmit(values: LoginFormValues) {
    reset();

    try {
      await login(values);
      navigate(redirectTo, { replace: true });
    } catch {
      // The mutation exposes a user-friendly error message.
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section
        aria-labelledby="login-heading"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <Link to="/" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
          Web application
        </Link>

        <h1 id="login-heading" className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h1>

        <p className="mt-2 text-sm text-slate-600">Enter your credentials to continue.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email address
            </label>

            <input
              {...register("email")}
              id="email"
              type="email"
              autoComplete="username"
              autoFocus
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="you@example.com"
            />

            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              {...register("password")}
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter your password"
            />

            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingIn ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
