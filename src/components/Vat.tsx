import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Vat = () => {
  return (
    <div className="absolute size-full">
      <div className="absolute z-10 size-full bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('/img/services/services-1.jpg')] bg-cover bg-center grayscale filter"></div>
      <div className="relative z-20 size-full p-8">
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-neutral-700/70 to-neutral-700/0">
          <span className="text-brand-orange-500 font-michroma absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90">
            VAT
          </span>
        </div>
        <h4 className="font-michroma mb-4 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-center text-sm text-transparent uppercase">
          Maximize Your VAT Refunds
        </h4>
        <h4 className="font-michroma mb-4 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-center text-sm text-transparent uppercase">
          Today
        </h4>
        <p className="mx-auto max-w-[600px] bg-neutral-700/30 p-6 text-center text-sm capitalize backdrop-blur-sm">
          &quot;Recovering VAT on international shipments can be complex. Inexor
          simplifies the process, maximizing your refunds and minimizing
          administrative burden. Our experts understand the intricacies of VAT
          regulations in various jurisdictions and ensure you receive the full
          refunds you&apos;re entitled to.&quot; 
        </p>
        <div className="mt-4 text-center">
          <Button
            className="font-michroma text-xs tracking-[1px]"
            size={"sm"}
            variant="outline"
          >
            <span className="flex items-center gap-1 py-2">
              <span>Read More</span>
              <ArrowRight size={16} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Vat;
