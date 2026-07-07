import { TextareaHTMLAttributes } from 'react';
import { CircleX, CircleCheck } from 'lucide-react';
import styles from './Textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
}

export function Textarea({ label, helperText, error, success, id, className, ...props }: TextareaProps) {
  return (
    <div className={[styles.wrapper, error ? styles.error : '', className].filter(Boolean).join(' ')}>
      {label && <label className={styles.label} htmlFor={id}>{label}</label>}
      <textarea className={styles.textarea} id={id} {...props} />
      {error && (
        <span className={styles.errorText}>
          <span className={styles.msgIcon}><CircleX size={14} /></span>
          {error}
        </span>
      )}
      {!error && success && (
        <span className={styles.successText}>
          <span className={styles.msgIcon}><CircleCheck size={14} /></span>
          {success}
        </span>
      )}
      {!error && !success && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
}
