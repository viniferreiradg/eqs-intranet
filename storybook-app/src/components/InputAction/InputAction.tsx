import { InputHTMLAttributes } from 'react';
import styles from './InputAction.module.css';

export interface InputActionProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  actionLabel: string;
  actionSent?: boolean;
  onAction?: () => void;
  onChange?: (value: string) => void;
}

export function InputAction({
  label,
  actionLabel,
  actionSent = false,
  onAction,
  onChange,
  placeholder,
  value,
  disabled,
  type = 'tel',
  ...rest
}: InputActionProps) {
  return (
    <div className={styles.iaWrapper}>
      {label && <span className={styles.iaLabel}>{label}</span>}
      <div className={[styles.iaInputWrap, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
        <input
          className={styles.iaInput}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          {...rest}
        />
        <button
          type="button"
          className={[styles.iaActionBtn, actionSent ? styles.sent : ''].filter(Boolean).join(' ')}
          onClick={onAction}
          disabled={disabled || actionSent}
        >
          {actionSent ? 'Código enviado' : actionLabel}
        </button>
      </div>
    </div>
  );
}
