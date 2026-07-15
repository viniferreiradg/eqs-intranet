import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check, Search } from 'lucide-react';
import styles from './MultiSelect.module.css';

function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export interface MultiSelectOption {
  label: string;
  value: string;
  /** URL da foto — exibe avatar redondo na opção e no chip */
  avatar?: string;
}

export interface MultiSelectProps {
  /** Lista de opções disponíveis */
  options: MultiSelectOption[];
  /** Valores selecionados */
  value?: string[];
  /** Callback disparado ao alterar a seleção */
  onChange?: (value: string[]) => void;
  /** Label acima do campo */
  label?: string;
  /** Placeholder quando nenhum item selecionado */
  placeholder?: string;
  /** Desabilita interação */
  disabled?: boolean;
  /** Texto auxiliar abaixo do campo */
  helperText?: string;
  /** Mensagem de erro (mostra borda vermelha) */
  error?: string;
  /** Abre o menu para cima — usar quando o campo fica perto do fim da página */
  dropUp?: boolean;
  /** Exibe campo de busca no topo do menu — usar quando a lista de opções é grande */
  searchable?: boolean;
  /** Placeholder do campo de busca (só com searchable) */
  searchPlaceholder?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  label,
  placeholder = 'Selecione...',
  disabled = false,
  helperText,
  error,
  dropUp = false,
  searchable = false,
  searchPlaceholder = 'Buscar...',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open && searchable) searchRef.current?.focus();
    if (!open) setSearch('');
  }, [open, searchable]);

  const filteredOptions = searchable && search
    ? options.filter(opt => normalize(opt.label).includes(normalize(search)))
    : options;

  const toggle = (val: string) => {
    if (!onChange) return;
    onChange(value.includes(val) ? value.filter(v => v !== val) : [...value, val]);
  };

  const remove = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(value.filter(v => v !== val));
  };

  const fieldClasses = [
    styles.msField,
    open        ? styles.msOpen     : '',
    disabled    ? styles.msDisabled : '',
    error       ? styles.msError    : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={styles.multiSelect}>
      {label && <span className={styles.msLabel}>{label}</span>}

      <div
        className={fieldClasses}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => !disabled && setOpen(o => !o)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !disabled && setOpen(o => !o); }
          if (e.key === 'Escape') setOpen(false);
        }}
      >
        <div className={styles.msInner}>
          {value.length === 0 ? (
            <span className={styles.msPlaceholder}>{placeholder}</span>
          ) : (
            value.map(val => {
              const opt = options.find(o => o.value === val);
              return opt ? (
                <span key={val} className={styles.msChip}>
                  {opt.avatar && <img className={styles.msAvatar} src={opt.avatar} alt="" />}
                  <span className={styles.msChipLabel}>{opt.label}</span>
                  <button
                    className={styles.msChipRemove}
                    type="button"
                    aria-label={`Remover ${opt.label}`}
                    onClick={e => remove(val, e)}
                  >
                    <X size={10} />
                  </button>
                </span>
              ) : null;
            })
          )}
        </div>
        <span className={styles.msChevron}>
          <ChevronDown size={14} />
        </span>
      </div>

      {open && (
        <div
          className={[styles.msMenu, dropUp ? styles.msMenuUp : ''].filter(Boolean).join(' ')}
          role="listbox"
          aria-multiselectable="true"
        >
          {searchable && (
            <div className={styles.msSearchWrap}>
              <span className={styles.msSearchIcon}><Search size={14} /></span>
              <input
                ref={searchRef}
                className={styles.msSearchInput}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onClick={e => e.stopPropagation()}
                onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}
                placeholder={searchPlaceholder}
              />
            </div>
          )}
          {filteredOptions.length === 0 ? (
            <div className={styles.msEmpty}>Nenhum resultado encontrado.</div>
          ) : (
            filteredOptions.map(opt => {
              const isSelected = value.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  className={[styles.msOption, isSelected ? styles.msSelected : ''].filter(Boolean).join(' ')}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => toggle(opt.value)}
                >
                  <span className={styles.msCheck}>
                    {isSelected && <Check size={10} />}
                  </span>
                  {opt.avatar && <img className={styles.msAvatar} src={opt.avatar} alt="" />}
                  <span className={styles.msOptionLabel}>{opt.label}</span>
                </div>
              );
            })
          )}
        </div>
      )}

      {helperText && !error && <span className={styles.msHelperText}>{helperText}</span>}
      {error && <span className={styles.msErrorText}>{error}</span>}
    </div>
  );
}
