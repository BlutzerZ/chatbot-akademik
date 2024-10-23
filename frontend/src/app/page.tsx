import Link from "next/link";

export default function Page() {
  // Temporary for development only.
  return (
    <>
      <ul className="menu w-56 rounded-box bg-base-200">
        <li>
          <Link href="/sign-in">Sign in</Link>
        </li>
        <li>
          <Link href="/chat/0">Chat</Link>
        </li>
      </ul>
    </>
  );
}
