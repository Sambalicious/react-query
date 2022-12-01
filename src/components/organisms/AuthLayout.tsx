import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <section> {children}</section>
    </div>
  );
};

export default AuthLayout;
