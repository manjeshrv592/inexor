"use client";

import React, { useRef, useEffect, useState } from "react";
import { Button } from "./button";
import Link from "next/link";

interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  title: string;
  description?: string;
  steps: ProcessStep[];
  className?: string;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({
  title,
  description,
  steps,
  className = "",
}) => {
  const lastStepRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<string>("calc(100% - 25px)");

  useEffect(() => {
    const calculateLineHeight = () => {
      if (lastStepRef.current && containerRef.current) {
        // Get the position of the last step's orange label
        const lastStepRect = lastStepRef.current.querySelector('span')?.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        if (lastStepRect && containerRect) {
          // Calculate the relative position of the center of the last step's label
          const lastStepCenter = lastStepRect.top + (lastStepRect.height / 2) - containerRect.top;
          // Add a small offset to end the line at the center of the orange label
          setLineHeight(`${lastStepCenter}px`);
        }
      }
    };

    // Calculate on mount and when steps change
    calculateLineHeight();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateLineHeight);
    
    // Use setTimeout to ensure DOM is fully rendered
    const timeoutId = setTimeout(calculateLineHeight, 100);

    return () => {
      window.removeEventListener('resize', calculateLineHeight);
      clearTimeout(timeoutId);
    };
  }, [steps]);

  return (
    <div className={`my-8 grid gap-4 text-white xl:grid-cols-2 ${className}`}>
      <div>
        <h4 className="font-michroma">{title}</h4>
        {description && <p className="my-4 text-sm">{description}</p>}
        <Link href="/contact">
          <Button 
            variant="default" 
            className="font-michroma text-xs tracking-[1px]"
          >
            Contact Us
          </Button>
        </Link>
      </div>
      <div 
        ref={containerRef}
        className="relative grid gap-4"
        style={{
          position: 'relative',
        }}
      >
        {/* Dynamic dotted line */}
        <div
          className="absolute left-[21px] top-0 w-0.5 border-l-2 border-dashed border-brand-orange-500"
          style={{
            height: lineHeight,
          }}
        />
        {steps.map((step, index) => (
          <div 
            key={step.stepNumber} 
            className="text-sm"
            ref={index === steps.length - 1 ? lastStepRef : null}
          >
            <div className="flex items-center gap-8">
              <span className="font-michroma relative inline-flex min-h-[32px] min-w-[40px] items-center justify-center px-3 py-0.5 text-[10px] font-medium text-white">
                <svg
                  width="100%"
                  height="100%"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0"
                  viewBox="0 0 40 32"
                >
                  <path
                    d="M0.5 0.5L32 0.5L39.5 8L39.5 31.5L8 31.5L0.5 24L0.5 0.5Z"
                    fill="#F65009"
                    stroke="#4A4A4A"
                    strokeWidth="1"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="relative z-10">
                  {step.stepNumber.toString().padStart(2, "0")}
                </span>
              </span>
              <h5 className="font-michroma">{step.title}</h5>
            </div>
            <p className="pl-20">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
