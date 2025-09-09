declare module '@/components/ui/input-otp' {
  import * as React from 'react';

  export interface InputOTPProps extends React.HTMLAttributes<HTMLDivElement> {
    maxLength: number;
    value: string;
    onChange: (value: string) => void;
    render: (props: { slots: Array<{ char: string; isActive: boolean }> }) => React.ReactNode;
  }

  export const InputOTP: React.FC<InputOTPProps>;
  export const InputOTPGroup: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const InputOTPSlot: React.FC<React.HTMLAttributes<HTMLDivElement> & { index: number }>;
}
