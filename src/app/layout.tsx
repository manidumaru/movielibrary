import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "../../modules/movie/styles/similar-movie-styles.css"

const inter = Poppins({weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Library",
  description: "Find Movies to watch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
