import React from "react";
import ContactUsButton from "./ContactUsButton";

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
  return (
    <div className={`my-8 grid gap-4 text-white xl:grid-cols-2 ${className}`}>
      <div>
        <h4 className="font-michroma">{title}</h4>
        {description && <p className="my-4 text-sm">{description}</p>}
        <ContactUsButton className="font-michroma text-[10px] tracking-[1px]" />
      </div>
      <div className="after:border-brand-orange-500 relative grid gap-4 after:absolute after:top-0 after:left-[21px] after:h-[calc(100%-25px)] after:w-0.5 after:border-l-2 after:border-dashed after:content-['']">
        {steps.map((step) => (
          <div key={step.stepNumber} className="text-sm">
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
