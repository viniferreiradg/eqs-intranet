import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { ImagePlus, X, CircleX } from 'lucide-react';
import styles from './ImageUpload.module.css';

export interface ImageUploadProps {
  label?: string;
  helperText?: string;
  error?: string;
  hint?: string;
  value?: string | null;
  onChange?: (file: File | null, previewUrl: string | null) => void;
}

export function ImageUpload({
  label,
  helperText,
  error,
  hint = 'PNG ou JPG, até 5MB',
  value,
  onChange,
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
          <div className={styles.preview}>
            <img className={styles.previewImg} src={preview} alt="Pré-visualização da imagem de capa" />
            <button className={styles.previewRemove} type="button" onClick={onRemove} aria-label="Remover imagem">
              <X size={14} />
            </button>
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
