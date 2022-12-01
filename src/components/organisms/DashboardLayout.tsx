import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <section> {children}</section>
    </div>
  );
};

export default DashboardLayout;
