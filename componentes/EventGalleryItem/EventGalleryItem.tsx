import styles from './EventGalleryItem.module.css';

export interface EventGalleryItemProps {
  /** Miniatura exibida na grade (obrigatório) */
  src: string;
  alt?: string;
  /** Abre a foto (em tamanho cheio) no Lightbox, com navegação entre as demais fotos da grade */
  onClick?: () => void;
}

export function EventGalleryItem({ src, alt = '', onClick }: EventGalleryItemProps) {
  return (
    <button className={styles.eventGalleryItem} type="button" onClick={onClick}>
      <img className={styles.eventGalleryImage} src={src} alt={alt} />
    </button>
  );
}
