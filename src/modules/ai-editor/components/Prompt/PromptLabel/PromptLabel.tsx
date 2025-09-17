import styles from './PromptLabel.module.scss';

import React from 'react';

import clsx from 'clsx';

interface PromptLabelProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export default function PromptLabel({ children, onClick, isActive }: PromptLabelProps) {
  return (
    <div onClick={onClick} className={clsx([styles.root, isActive && styles.active])}>
      {children}
    </div>
  );
}
