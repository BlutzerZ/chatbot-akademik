import "@/styles/globals.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=account_circle,arrow_upward,chevron_left,edit_square,history,menu,refresh,smart_toy,thumb_down,thumb_up" />
        <style>
          {`.material-symbols-rounded {
              font-variation-settings:
              'FILL' 0,
              'wght' 400,
              'GRAD' 0,
              'opsz' 24
              }`}
        </style>
      </head>
      <body>{children}</body>
    </html>
  );
}
