'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GradientBackgroundProps = React.ComponentProps<'div'> & {
	// Animation customization
	gradients?: string[];
	animationDuration?: number;
	animationDelay?: number;

	// Layout customization
	enableCenterContent?: boolean;

	// Visual customization
	overlay?: boolean;
	overlayOpacity?: number;
};

const Default_Gradients = [
    "#FFFFFF",
    "#F8F8F8",
    "#F2F2F2",
  ]

export function GradientBackground({
	children,
	className = '',
	gradients = Default_Gradients,
	animationDuration = 8,
	animationDelay = 0.5,
	overlay = false,
	overlayOpacity = 0.3,
}: GradientBackgroundProps) {
	return (
		<div className={cn('w-full relative min-h-screen overflow-hidden', className)}>
			{/* Animated gradient background */}
			<motion.div
				className="absolute inset-0"
				style={{ background: gradients[0] }}
				animate={{ background: gradients }}
				transition={{
					delay: animationDelay,
					duration: animationDuration,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'easeInOut',
				}}
			/>

			{/* Optional overlay */}
			{overlay && (
				<div
					className="absolute inset-0 bg-black"
					style={{ opacity: overlayOpacity }}
				/>
			)}

			{/* Content wrapper */}
			{children && (
				<div
					className={cn(
						'relative z-10 flex min-h-screen items-center justify-center',
					)}
				>
					{children}
				</div>
			)}
		</div>
	);
}
