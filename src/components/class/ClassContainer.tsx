import React, { type ReactNode } from 'react';

interface ClassContainerBarProps {
  children: ReactNode;
}

const ClassContainer: React.FC<ClassContainerBarProps> = ({ children }) => {
  return <div className="relative w-full ">{children}</div>;
};

export default ClassContainer;
