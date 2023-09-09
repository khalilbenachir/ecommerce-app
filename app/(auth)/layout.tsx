import React from "react";

interface ILayout {
  children: React.ReactNode;
}

const layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-full">{children}</div>
  );
};

export default layout;
