import React, { ReactNode } from "react";

interface StatusIconProps {
  condition: boolean;
  positiveIcon: React.ReactNode;
  negativeIcon: React.ReactNode;
  label: ReactNode;
}

export const StatusIcon = ({
  condition,
  positiveIcon,
  negativeIcon,
  label,
}: StatusIconProps) => {
  return (
    <div className="flex items-center space-x-1">
      {condition ? positiveIcon : negativeIcon}
      <span>{label}</span>
    </div>
  );
};
