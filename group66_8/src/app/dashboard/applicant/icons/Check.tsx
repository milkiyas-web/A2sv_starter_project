import React from "react";

interface CheckProps {
  completed?: boolean;
  className?: string;
}

const Check: React.FC<CheckProps> = ({ completed = false, className = "" }) => {
  const colorClass = completed ? "text-green-600" : "text-gray-300";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`size-4 ${colorClass} ${className}`}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default Check;
