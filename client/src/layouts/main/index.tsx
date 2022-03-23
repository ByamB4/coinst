import { NextHead } from "components";
import { FC, ReactElement, ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
  title?: string | ReactNode;
}

const MainLayout: FC<Props> = ({
  className = "",
  children,
  title,
}): ReactElement => {
  return (
    <div
      className={`text-xl w-full min-h-screen text-white p-20 ${className}`}
      style={{
        backgroundColor: "rgb(15, 23, 42)",
      }}
    >
      <NextHead title={title} />
      {children}
    </div>
  );
};

export default MainLayout;
