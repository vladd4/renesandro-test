import styles from './Input.module.scss';

import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  divClassName?: string;
  isNotValid?: boolean;
}

export default function Input({ label, divClassName, isNotValid, ...props }: InputProps) {
  return (
    <div className={clsx([styles.root, divClassName])}>
      {label && (
        <p>
          {label} {props.required && <b>*</b>}
        </p>
      )}
      <div>
        <input {...props} style={isNotValid ? { borderColor: 'red' } : {}} />
      </div>
    </div>
  );
}
