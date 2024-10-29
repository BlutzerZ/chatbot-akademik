"use client";

import client from "@/api/backend-client";
import Logo from "@/components/Logo";
import NoSsr from "@/components/NoSsr";
import ToggleTheme from "@/components/ToggleTheme";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await client.POST("/auth/sign-in", {
        body: {
          username,
          password,
        },
      });

      setLoading(false);

      if (!result.error) {
        const res = result.data;
        const token = res.data.token;
        localStorage.setItem("token", token);

        router.push("/chat/new");
      } else {
        // TODO: Change this later
        setError(JSON.stringify(result.error));
      }
    } catch {
      setLoading(false);
      setError("Error");
    }
  };

  return (
    <>
      <Head>
        <title>Login - bngky.</title>
      </Head>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
        <Logo />
        <div className="card w-3/5 sm:w-1/3">
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
    </>
  );
}
