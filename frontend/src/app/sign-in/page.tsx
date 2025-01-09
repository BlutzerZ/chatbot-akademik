"use client";

import client from "@/api/backend-client";
import Logo from "@/components/Logo";
import NoSsr from "@/components/NoSsr";
import ToggleTheme from "@/components/ToggleTheme";
import Head from "next/head";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "bngky - Sign In";
  }, []);

  const handleLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result.token;
        localStorage.setItem("token", token);
        router.push("/chat/new");
      } else {
        // alert("wrong pass");
        setError("Username atau password salah");
      }

      setLoading(false);
    } catch {
      setLoading(false);
      setError("Username atau password salah");
    }
  };

  const handleLoginByGoogle = async () => {
    try {
      const response = await client.GET("/auth/sign-in/google", {
        params: {
          query: {
            callback_url: `${process.env.NEXT_PUBLIC_HOST}/callback`,
          },
        },
        headers: {
          accept: "application/json",
        },
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        setError("Error saat melakukan login dengan Google");
      }
    } catch {
      setError("Error saat melakukan login dengan Google");
    }
  };

  return (
    <>
      <Head>
        <title>Login - bngky.</title>
      </Head>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
        <Logo width={150} />
        <div className="card w-3/5 sm:w-3/12">
          <form className="flex flex-col gap-10" onSubmit={handleLogin}>
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
            <div className="flex flex-col gap-5">
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
              {/* <Link
                href={"/"}
                type="button"
                className="btn btn-ghost btn-secondary w-full"
                >
                Lupa password?
                </Link> */}
            </div>
          </form>

          <div className="mt-5 flex flex-col gap-5">
            <p className="w-full text-center">atau</p>
            <button
              onClick={handleLoginByGoogle}
              className="btn mx-auto mb-4 flex h-14 w-full items-center justify-center"
              disabled={loading}
            >
              {/* {loading ? "Memproses.." : "Login"} */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Login dengan Google
            </button>
          </div>

          <NoSsr>
            <ToggleTheme />
          </NoSsr>
        </div>
      </div>
    </>
  );
}
