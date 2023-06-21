"use client";
import { Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(5).required(),
});

function Login() {
  const [formError, setFormError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result.error) setFormError(result.error);
      else {
        const redirect = searchParams.get("callbackUrl") ?? "/";
        router.replace(redirect);
        router.refresh();
      }
    } catch (error) {
      setFormError(error.response.data.error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setFormError(searchParams.get("message"));
  }, [searchParams]);

  const onKeyDown = (event, submit) => {
    if (event.which === 13) {
      submit();
    }
  };

  return (
    <div className="wrapper flex flex-col items-center justify-center overflow-hidden">
      <Formik
        initialValues={{ email: "", password: "" }}
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
        }) => (
          <>
            <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl lg:max-w-xl">
              <h1 className="text-center text-3xl font-semibold uppercase text-amber-550">
                Sign in
              </h1>
              <div className="mt-6">
                {formError && (
                  <div className="mb-2 text-red-600">{formError}</div>
                )}
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="main-input"
                    name="email"
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                      setFormError("");
                    }}
                    onKeyDown={(e) => {
                      onKeyDown(e, handleSubmit);
                    }}
                    onBlur={() => setFieldTouched("email")}
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="text-red-600">{errors.email}</div>
                )}
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="main-input"
                    name="password"
                    onChange={(e) => {
                      setFieldValue("password", e.target.value);
                      setFormError("");
                    }}
                    onKeyDown={(e) => {
                      onKeyDown(e, handleSubmit);
                    }}
                    onBlur={() => setFieldTouched("password")}
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-600">{errors.password}</div>
                )}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="hover:bg-amber500 w-full transform rounded-md bg-amber-550 px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:bg-amber-550 focus:outline-none"
                  >
                    {isSubmitting ? "Please wait..." : "Login"}
                  </button>
                </div>
              </div>
              <div className="relative mt-6 flex w-full items-center justify-center border border-t">
                <div className="absolute bg-white px-5">Or</div>
              </div>

              <p className="mt-8 text-center text-xs font-light text-gray-700">
                {" "}
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-amber-550 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}

export default Login;
