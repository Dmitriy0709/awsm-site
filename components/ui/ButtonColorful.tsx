import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    variant?: 'dark' | 'light';
    solid?: boolean;
}

export function ButtonColorful({
    className,
    label = "Explore Components",
    variant,
    ...props
}: ButtonColorfulProps) {
    return (
        <Button
            className={cn(
                "relative h-11 px-6 overflow-hidden !bg-black !text-white border-0 transition-all duration-300 group",
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
