import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="bg-white shadow-[0px 1px 7px rgba(0,0,0,0.1)] px-24">
        <Image
          src="/radio-school-logo.png"
          alt="radio school logo"
          width={70}
          height={50}
          loading="lazy"
        />
      </div>
      <section> {children}</section>
    </>
  );
};

export default AuthLayout;
