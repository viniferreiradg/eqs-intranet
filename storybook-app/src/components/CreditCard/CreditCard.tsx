import styles from './CreditCard.module.css';

interface CreditCardProps {
  number: string;
  holderName: string;
  brand: string;
  onDelete?: () => void;
}

export function CreditCard({ number, holderName, brand, onDelete }: CreditCardProps) {
  return (
    <div className={styles.creditCard}>
      <div className={styles.creditCard__wave} />
      <div className={styles.creditCard__top}>
        <span className={styles.creditCard__number}>{number}</span>
        {onDelete && (
          <button className={styles.creditCard__delete} onClick={onDelete} aria-label="Remover cartão">
            🗑
          </button>
        )}
      </div>
      <div className={styles.creditCard__footer}>
        <div className={styles.creditCard__holder}>
          <span className={styles.creditCard__holderLabel}>Titular</span>
          <span className={styles.creditCard__holderName}>{holderName}</span>
        </div>
        <span className={styles.creditCard__brand}>{brand}</span>
      </div>
    </div>
  );
}
