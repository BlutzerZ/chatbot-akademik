import "@/styles/globals.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
