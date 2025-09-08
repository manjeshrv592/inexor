import React from "react";
import Image from "next/image";

interface UseCaseStep {
  _key?: string;
  stepNumber?: number;
  title?: string;
  description?: string;
}

interface UseCasesSectionProps {
  title: string;
  steps: UseCaseStep[];
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}

const UseCasesSection: React.FC<UseCasesSectionProps> = ({
  title,
  steps,
  imageUrl,
  imageAlt,
  className = "",
}) => {
  const fallbackImage = "/img/left-image.jpg";
  const safeSteps = Array.isArray(steps)
    ? steps.filter(
        (s) =>
          s && typeof s.stepNumber === "number" && s.title && s.description,
      )
    : [];

  return (
    <div className={`my-8 grid gap-4 text-white xl:grid-cols-2 ${className}`}>
      {/* Image on right (desktop), on top (mobile) */}
      <div className="relative order-1 h-52 w-full overflow-hidden [clip-path:polygon(0_0,calc(100%-20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%-20px))] xl:order-2 xl:h-auto">
        <Image
          src={imageUrl || fallbackImage}
          alt={imageAlt || "use cases image"}
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Use cases content on left (desktop), below (mobile) */}
      <div className="order-2 xl:order-1">
        <h4 className="font-michroma">{title}</h4>

        <div className="mt-4 grid gap-4">
          {safeSteps.map((step, idx) => (
            <div
              key={step._key || `${step.stepNumber}-${idx}`}
              className="text-sm"
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
                  <span className="relative z-10">{`${(step.stepNumber || 0)
                    .toString()
                    .padStart(2, "0")}`}</span>
                </span>
                <h5 className="font-michroma">{step.title as string}</h5>
              </div>
              <p className="pl-20">{step.description as string}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCasesSection;
