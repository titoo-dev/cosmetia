"use client";

import { ReactNode } from "react";
import CustomerNavbar from "@/components/customer/navbar";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

interface CustomerLayoutProps {
  children: ReactNode;
}


export default function CustomerLayout({ children }: CustomerLayoutProps) {

  const pathname = usePathname();

  const excludePaths = [
    "/customer/register",
    "/customer/register/verify",
    "/customer/register/last-step",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {!excludePaths.includes(pathname) && <CustomerNavbar />}
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
