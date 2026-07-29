"use client";

import { RegisterationProvider } from "../../lib/hooks/useRegistration";

function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RegisterationProvider>
      {children}
    </RegisterationProvider>
  );
}
export default Layout