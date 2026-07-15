import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { ImagePlus, Eye, Upload, Trash2, CircleX } from 'lucide-react';
import styles from './ImageUpload.module.css';

export interface ImageUploadProps {
  label?: string;
  helperText?: string;
  error?: string;
  hint?: string;
  /** URL de imagem já existente — abre no estado preenchido com ações de visualizar/alterar/remover */
  value?: string | null;
  onChange?: (file: File | null, previewUrl: string | null) => void;
  /** 'contain' para logos/artes que não podem ser cortadas (padrão: 'cover') */
  fit?: 'cover' | 'contain';
}

export function ImageUpload({
  label,
  helperText,
  error,
  hint = 'PNG ou JPG, até 5MB',
  value,
  onChange,
  fit = 'cover',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [dragOver, setDragOver] = useState(false);

  function handleFile(file: File | null) {
    if (!file) {
      setPreview(null);
      onChange?.(null, null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file, url);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    handleFile(e.target.files?.[0] ?? null);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  }

  function onRemove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = '';
    handleFile(null);
  }

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}

      <label
        className={[styles.dropzone, dragOver ? styles.dragOver : ''].filter(Boolean).join(' ')}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className={styles.hiddenInput}
          onChange={onInputChange}
        />
        {preview ? (
          <div className={[styles.preview, fit === 'contain' ? styles.previewContain : ''].filter(Boolean).join(' ')}>
            <img className={styles.previewImg} src={preview} alt="Pré-visualização da imagem" />
            <div className={styles.previewActions}>
              <button
                className={styles.previewAction}
                type="button"
                aria-label="Visualizar imagem"
                title="Visualizar"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(preview, '_blank'); }}
              >
                <Eye size={14} />
              </button>
              <button
                className={styles.previewAction}
                type="button"
                aria-label="Alterar imagem"
                title="Alterar"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); inputRef.current?.click(); }}
              >
                <Upload size={14} />
              </button>
              <button
                className={styles.previewAction}
                type="button"
                aria-label="Remover imagem"
                title="Remover"
                onClick={onRemove}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}><ImagePlus size={24} /></span>
            <span className={styles.emptyText}>Clique ou arraste uma imagem</span>
            <span className={styles.emptyHint}>{hint}</span>
          </div>
        )}
      </label>

      {error && (
        <span className={styles.errorText}>
          <span className={styles.msgIcon}><CircleX size={14} /></span>
          {error}
        </span>
      )}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
}
