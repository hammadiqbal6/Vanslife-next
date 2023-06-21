// import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   console.log(request.headers);
//   // localStorage.getItem("isLoggedIn");
//   // return NextResponse.redirect(new URL("/", request.url));
// }

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/host(.*)",
};
