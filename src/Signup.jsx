
import { useState } from "react";

export default function signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "The backend returned an invalid response. Check your backend server."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Registration failed."
        );
      }

      setMessage("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Make sure your backend is running."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`${
        dark ? "bg-black text-white" : "bg-gray-100 text-black"
      } min-h-screen flex items-center justify-center p-4 transition-colors`}
    >
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl md:grid-cols-2">

        {/* Branding section */}
        <div className="hidden bg-black p-12 text-white md:flex md:flex-col md:justify-between">
          <h2 className="text-2xl font-bold">
            Portfolio<span className="font-light"> Generator</span>
          </h2>

          <div>
            <h1 className="mb-4 text-4xl font-bold leading-tight">
              Build a portfolio that speaks for you.
            </h1>

            <p className="text-gray-400">
              Create a professional portfolio, showcase your
              skills, and share your work with the world.
            </p>

            <div className="mt-8 space-y-4 text-sm text-gray-300">
              <p>✓ Simple portfolio creation</p>
              <p>✓ Modern, responsive designs</p>
              <p>✓ Showcase your projects and skills</p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Your skills. Your story. Your portfolio.
          </p>
        </div>

        {/* Signup form */}
        <div
          className={`${
            dark ? "bg-zinc-900" : "bg-white"
          } p-7 sm:p-12`}
        >
          <div className="mb-10 flex justify-end">
            <button
              type="button"
              onClick={() => setDark(!dark)}
              className="rounded-full border border-gray-400 px-4 py-2 text-sm hover:bg-gray-200 hover:text-black"
            >
              {dark ? "☀ Light mode" : "☾ Dark mode"}
            </button>
          </div>

          <h1 className="text-3xl font-bold">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Get started with your professional portfolio.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <div className="flex items-center rounded-lg border border-gray-300 focus-within:border-black">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="w-full bg-transparent px-4 py-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-sm text-gray-500"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className=".break-words text-sm"
              >
                {message}
              </p>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}