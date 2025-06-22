import React from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  message?: string;
  title?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  message = "Something went wrong. Please try again.",
  title = "Oops! An error occurred",
}) => {
  return (
    <div className="flex flex-col items-center h-full py-48 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
