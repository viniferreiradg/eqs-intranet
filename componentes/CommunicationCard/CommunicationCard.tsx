import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Calendar } from 'lucide-react';
import cardStyles from '../Card/Card.module.css';
import { Button } from '../Button/Button';
import styles from './CommunicationCard.module.css';

export type CommunicationCardStatus = 'success' | 'error' | 'warning' | 'info' | 'neutral';

export interface CommunicationCardProps {
  /** Ícone Lucide exibido no box tintado */
  icon: LucideIcon;
  /** Define a cor do box do ícone (tokens de status). 'neutral' = cinza */
  status?: CommunicationCardStatus;
  title: string;
  date: string;
  /** Texto completo do comunicado — sempre exibido por inteiro, sem truncar. Use \n\n para separar parágrafos */
  body: string;
  /** Imagem opcional entre o cabeçalho e o texto */
  image?: string;
  /** Exige confirmação de leitura — mostra o botão "Estou ciente" no rodapé */
  requiresAck?: boolean;
}

export function CommunicationCard({ icon: Icon, status = 'neutral', title, date, body, image, requiresAck = false }: CommunicationCardProps) {
  const [acked, setAcked] = useState(false);

  return (
    <div className={`${cardStyles.card} ${styles.commCard}`}>
      <div className={styles.commCardHeader}>
        <span
          className={styles.commCardIcon}
          {...(status !== 'neutral' ? { 'data-status': status } : {})}
        >
          <Icon size={18} />
        </span>
        <div className={styles.commCardHeaderText}>
          <h3 className={styles.commCardTitle}>{title}</h3>
          <span className={styles.commCardDate}>
            <Calendar size={12} />
            {date}
          </span>
        </div>
      </div>

      {image && (
        <div className={styles.commCardImageWrap}>
          <img className={styles.commCardImage} src={image} alt="" />
        </div>
      )}

      <p className={styles.commCardBody}>{body}</p>

      {requiresAck && (
        <Button variant="primary" disabled={acked} onClick={() => setAcked(true)}>
          {acked ? 'Você está ciente' : 'Estou ciente'}
        </Button>
      )}
    </div>
  );
}
