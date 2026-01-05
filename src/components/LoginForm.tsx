// src/components/LoginForm.tsx

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ... importlar aynı

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        setLoading(false);
      } else {
        // ÇÖZÜM BURADA:
        // router.push("/admin") YERİNE:
        // Tarayıcıyı zorla yönlendiriyoruz. Bu, cookie'nin kesin olarak işlenmesini sağlar.
        window.location.href = "/admin"; 
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };
// ...

  return (
    <div className="w-full max-w-md bg-white p-8 shadow-2xl border border-stone-100 rounded-sm animate-fadeIn">
      <div className="text-center mb-8">
        <span className="text-emerald-800 font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block">
          Authorized Access Only
        </span>
        <h2 className="text-3xl font-serif text-gray-900">Admin Login</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wide text-center">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full bg-stone-50 border border-stone-200 text-stone-900 p-4 rounded-sm focus:outline-none focus:border-emerald-800 focus:bg-white transition-all text-sm"
            placeholder="name@yourmail.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full bg-stone-50 border border-stone-200 text-stone-900 p-4 rounded-sm focus:outline-none focus:border-emerald-800 focus:bg-white transition-all text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1C3A25] hover:bg-[#2C5F2D] text-white font-bold uppercase tracking-[0.15em] py-4 rounded-sm transition-all duration-300 shadow-lg shadow-emerald-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-xs"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Authenticating...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      
      <div className="mt-8 text-center">
         <p className="text-[10px] text-stone-400 font-light">
             &copy; {new Date().getFullYear()} Nexarya Bilişim. All rights reserved.
         </p>
      </div>
    </div>
  );
}