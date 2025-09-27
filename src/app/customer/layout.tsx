"use client";

import { ReactNode } from "react";
import CustomerNavbar from "@/components/customer/navbar";
import { usePathname } from "next/navigation";
import RenderWhen from "@/components/render-when";

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
      <RenderWhen condition={!excludePaths.includes(pathname)}>
        <CustomerNavbar />
      </RenderWhen>
      <main>{children}</main>
    </div>
  );
}
