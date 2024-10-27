"use client";

import Logo from "@/components/Logo";
import NoSsr from "@/components/NoSsr";
import ToggleTheme from "@/components/ToggleTheme";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      setLoading(false);

      if (response.ok) {
        const res = await response.json();
        const token = res.data.token;
        localStorage.setItem("token", token);

        router.push("/chat/0");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      setError("Error");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
      <Logo />
      <div className="card w-full sm:w-1/3">
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Nomor Induk Mahasiswa</span>
              </div>
              <input
                name="nim"
                type="text"
                placeholder="NIM"
                className="input input-bordered w-full focus:outline-primary-400"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full focus:outline-primary-400"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="space-y-3">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {/* {loading ? "Memproses.." : "Login"} */}
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Memproses
                </>
              ) : (
                "Login"
              )}
            </button>
            {error && <p className="font-bold text-error">{error}</p>}
            <Link
              href={"/"}
              type="button"
              className="btn btn-ghost btn-secondary w-full"
            >
              Lupa password?
            </Link>
          </div>
        </form>

        <NoSsr>
          <ToggleTheme />
        </NoSsr>
      </div>
    </div>
  );
}
