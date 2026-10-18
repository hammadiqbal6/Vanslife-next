"use client";

import { Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

function Register() {
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setFormError("");
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setFormError(data.error || "Registration failed");
        return;
      }

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setFormError(result.error);
        return;
      }

      router.replace("/host");
      router.refresh();
    } catch (error) {
      setFormError(error.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wrapper flex flex-col items-center justify-center">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
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
              Create account
            </h1>
            <p className="mt-2 text-center text-sm text-[#4d4d4d]">
              Join #VanLife and list your travel vans.
            </p>
            <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
              {formError && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {formError}
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    className="main-input"
                    value={values.firstName}
                    onChange={(e) => {
                      setFieldValue("firstName", e.target.value);
                      setFormError("");
                    }}
                    onBlur={() => setFieldTouched("firstName")}
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className="main-input"
                    value={values.lastName}
                    onChange={(e) => {
                      setFieldValue("lastName", e.target.value);
                      setFormError("");
                    }}
                    onBlur={() => setFieldTouched("lastName")}
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
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
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  className="main-input"
                  value={values.confirmPassword}
                  onChange={(e) => {
                    setFieldValue("confirmPassword", e.target.value);
                    setFormError("");
                  }}
                  onBlur={() => setFieldTouched("confirmPassword")}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-lg bg-amber-550 px-4 py-3 font-semibold text-white transition hover:bg-[#e67a28] disabled:opacity-60"
              >
                {isSubmitting ? "Creating account…" : "Sign up"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-700">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-amber-550 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Register;
