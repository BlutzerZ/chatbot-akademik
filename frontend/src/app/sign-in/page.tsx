import Logo from "@/components/Logo";
import ToggleTheme from "@/components/ToggleTheme";

export default function LoginPage() {
  return (
    <div className="flex w-full flex-col items-center gap-8 p-4 pt-16">
      <ToggleTheme />
      <Logo />
      <div className="card w-full md:w-2/3 lg:w-2/5">
        <form className="flex flex-col gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Nomor Induk Mahasiswa</span>
            </div>
            <input
              name="nim"
              type="text"
              placeholder="NIM"
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
            />
          </label>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
          <button type="button" className="btn btn-ghost btn-secondary w-full">
            Lupa password?
          </button>
        </form>
      </div>
    </div>
  );
}
