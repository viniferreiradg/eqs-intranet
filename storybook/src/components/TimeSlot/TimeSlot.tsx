import styles from './TimeSlot.module.css';

export type TimeSlotState = 'available' | 'selected' | 'unavailable';

export interface TimeSlotProps {
  /** Horário exibido (ex: "09:00") */
  time: string;
  /** Estado visual do slot */
  state?: TimeSlotState;
  /** Callback ao clicar (não dispara em unavailable) */
  onClick?: () => void;
}

export function TimeSlot({ time, state = 'available', onClick }: TimeSlotProps) {
  const isUnavailable = state === 'unavailable';
  return (
    <button
      className={`${styles.timeSlot}${state === 'selected' ? ` ${styles.selected}` : ''}${isUnavailable ? ` ${styles.unavailable}` : ''}`}
      type="button"
      disabled={isUnavailable}
      onClick={isUnavailable ? undefined : onClick}
      aria-pressed={state === 'selected'}
      aria-disabled={isUnavailable}
    >
      {time}
    </button>
  );
}
