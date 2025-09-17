import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      duration={4000}
      className="toaster group"
      style={
        {
          '--normal-bg': 'oklch(0.3 0 0)',
          '--normal-text': 'oklch(0.985 0 0)',
          '--normal-border': 'oklch(1 0 0 / 10%)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
