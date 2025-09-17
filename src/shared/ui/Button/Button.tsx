import styles from './Button.module.scss';

import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  isDisabled,
  isActive,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx([
        styles.root,
        isDisabled && styles.disabled,
        isActive && styles.active,
        className,
      ])}
    >
      {children}
    </button>
  );
}
