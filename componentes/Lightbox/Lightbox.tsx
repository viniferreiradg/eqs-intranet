import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Lightbox.module.css';

export interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div className={styles.lightboxOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <button className={styles.lightboxClose} type="button" aria-label="Fechar" onClick={onClose}>
        <X size={20} />
      </button>
      <button
        className={`${styles.lightboxNavBtn} ${styles.lightboxPrev}`}
        type="button"
        aria-label="Foto anterior"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <ChevronLeft size={24} />
      </button>
      <div className={styles.lightboxImageWrap} onClick={(e) => e.stopPropagation()}>
        <img className={styles.lightboxImage} src={images[index]} alt="" />
        <span className={styles.lightboxCounter}>{index + 1} / {images.length}</span>
      </div>
      <button
        className={`${styles.lightboxNavBtn} ${styles.lightboxNext}`}
        type="button"
        aria-label="Próxima foto"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
