import React, { type ReactNode } from 'react';

interface ClassContainerBarProps {
  children: ReactNode;
}

const BodyContainer: React.FC<ClassContainerBarProps> = ({ children }) => {
  return <div className="w-full box-border p-[20px]">{children}</div>;
};

export default BodyContainer;
