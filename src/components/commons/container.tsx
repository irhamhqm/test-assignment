import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="max-w-5xl mx-auto my-0">{children}</div>;
}
