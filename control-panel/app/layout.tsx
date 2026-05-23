import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";

export const metadata: Metadata = {
  title: "GROZ Automation",
  description: "Control Panel pentru sistemul multi-agent GROZ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body>
        <BackgroundOrbs />
        <div className="relative z-10 flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
