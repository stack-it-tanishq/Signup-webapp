import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeading({ 
  title, 
  subtitle, 
  className, 
  centered = true 
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-12 animate-on-scroll",
      centered && "text-center",
      className
    )}>
      <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-6">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
