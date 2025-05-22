import { cn } from "@/lib/utils";

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export default function Card({
  title,
  description,
  children,
  className,
  footer,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200",
        className
      )}
    >
      {(title || description) && (
        <div className="px-5 py-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="px-5 py-5">{children}</div>
      {footer && (
        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
}
