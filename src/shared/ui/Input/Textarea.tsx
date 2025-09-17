import styles from './Input.module.scss';

import clsx from 'clsx';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function TextArea({ label, ...props }: TextareaProps) {
  return (
    <div className={clsx([styles.root])}>
      {label && <p>{label}</p>}
      <div>
        <textarea {...props} />
      </div>
    </div>
  );
}
