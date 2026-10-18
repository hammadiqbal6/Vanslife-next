"use client";

import { Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import * as Yup from "yup";
import Loader from "@/components/Loader";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

function LoginForm() {
  const [formError, setFormError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setFormError("");
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (result?.error) {
        setFormError(result.error);
        return;
      }
      const redirectTo = searchParams.get("callbackUrl") ?? "/host";
      router.replace(redirectTo);
      router.refresh();
    } catch (error) {
      setFormError(error.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) setFormError(message);
  }, [searchParams]);

  return (
    <div className="wrapper flex flex-col items-center justify-center">
      <Formik
        initialValues={{ email: "bob@example.com", password: "password123" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          setFieldTouched,
          setFieldValue,
          isSubmitting,
          handleSubmit,
          touched,
          values,
        }) => (
          <div className="m-auto w-full max-w-xl rounded-2xl border border-[#e7d7c5] bg-white/90 p-6 shadow-sm backdrop-blur">
            <h1 className="text-center font-display text-3xl font-semibold text-amber-550">
              Sign in
            </h1>
            <p className="mt-2 text-center text-sm text-[#4d4d4d]">
              Demo host: bob@example.com / password123
            </p>
            <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
              {formError && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {formError}
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="main-input"
                  value={values.email}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                    setFormError("");
                  }}
                  onBlur={() => setFieldTouched("email")}
                />
                {errors.email && touched.email && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="main-input"
                  value={values.password}
                  onChange={(e) => {
                    setFieldValue("password", e.target.value);
                    setFormError("");
                  }}
                  onBlur={() => setFieldTouched("password")}
                />
                {errors.password && touched.password && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.password}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-lg bg-amber-550 px-4 py-3 font-semibold text-white transition hover:bg-[#e67a28] disabled:opacity-60"
              >
                {isSubmitting ? "Please wait…" : "Login"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-700">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-amber-550 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        )}
      </Formik>
    </div>
  );
}

function Login() {
  return (
    <Suspense fallback={<Loader />}>
      <LoginForm />
    </Suspense>
  );
}

export default Login;
