"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  ListTodo,
  Activity,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GrozLogo } from "./GrozLogo";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 glass-strong flex flex-col m-3 rounded-2xl">
      <div className="p-5 border-b border-white/5">
        <Link href="/" className="block">
          <GrozLogo size="md" className="text-red-500" />
          <div className="text-[11px] text-groz-muted mt-1 tracking-wider uppercase">
            Automation
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-link", active && "nav-link-active")}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 m-3 rounded-xl glass text-[11px] text-groz-muted">
        <div className="flex items-center justify-between">
          <span>System</span>
          <span className="flex items-center gap-1.5 text-red-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
            Online
          </span>
        </div>
        <div className="mt-2 text-groz-muted">GROZ team · 2 members</div>
      </div>
    </aside>
  );
}
