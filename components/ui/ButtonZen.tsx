import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonZenProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export function ButtonZen({
    className,
    label = "Explore Components",
    ...props
}: ButtonZenProps) {
    return (
        <Button
            className={cn(
                "relative h-12 px-8 overflow-hidden bg-primary text-primary-foreground border-0 transition-all duration-300 group rounded-xl",
                className
            )}
            {...props}
        >
            {/* Simple monochrome glow on hover */}
            <div
                className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            {/* Content */}
            <div className="relative flex items-center justify-center gap-2">
                <span className="font-medium">
                    {label}
                </span>
                <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" />
            </div>
        </Button>
    );
}
