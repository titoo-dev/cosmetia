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

  const isRegisterPathName = pathname === "/customer/register";

  return (
    <div className="min-h-screen bg-gray-50">
      {!isRegisterPathName && <CustomerNavbar />}
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
