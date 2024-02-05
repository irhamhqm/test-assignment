import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex max-w-[1140px] mx-auto my-0 px-[15px] pb-12">
      {children}
    </div>
  );
}
