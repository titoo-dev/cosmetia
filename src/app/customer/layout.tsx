import { ReactNode } from "react";
import CustomerNavbar from "@/components/customer/navbar";

interface CustomerLayoutProps {
  children: ReactNode;
}


export default function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />
      <main>{children}</main>
    </div>
  );
}
