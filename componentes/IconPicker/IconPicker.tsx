import { useEffect, useRef, useState } from 'react';
import {
  BadgeDollarSign, Bell, Briefcase, Building2, Bus, CalendarClock, CarFront,
  ChevronDown, Droplets, Gift, HeartPulse, Info, Key, Laptop, Mail, Megaphone,
  Package, Phone, Plane, ShieldCheck, TriangleAlert, Users, UtensilsCrossed,
  Wrench, Zap, type LucideIcon,
} from 'lucide-react';
import inputStyles from '../Input/Input.module.css';
import styles from './IconPicker.module.css';

/** Ícones principais oferecidos no picker — nomes no formato kebab do Lucide
    (mesmo valor usado em `data-lucide` nas telas HTML). */
export const ICON_PICKER_OPTIONS: { name: string; icon: LucideIcon }[] = [
  { name: 'megaphone', icon: Megaphone },
  { name: 'bell', icon: Bell },
  { name: 'info', icon: Info },
  { name: 'triangle-alert', icon: TriangleAlert },
  { name: 'calendar-clock', icon: CalendarClock },
  { name: 'users', icon: Users },
  { name: 'heart-pulse', icon: HeartPulse },
  { name: 'shield-check', icon: ShieldCheck },
  { name: 'badge-dollar-sign', icon: BadgeDollarSign },
  { name: 'briefcase', icon: Briefcase },
  { name: 'laptop', icon: Laptop },
  { name: 'wrench', icon: Wrench },
  { name: 'building-2', icon: Building2 },
  { name: 'car-front', icon: CarFront },
  { name: 'bus', icon: Bus },
  { name: 'plane', icon: Plane },
  { name: 'utensils-crossed', icon: UtensilsCrossed },
  { name: 'package', icon: Package },
  { name: 'zap', icon: Zap },
  { name: 'droplets', icon: Droplets },
  { name: 'key', icon: Key },
  { name: 'mail', icon: Mail },
  { name: 'phone', icon: Phone },
  { name: 'gift', icon: Gift },
];

export interface IconPickerProps {
  /** Nome do ícone selecionado (formato kebab do Lucide, ex: "megaphone") */
  value?: string;
  onChange?: (name: string) => void;
  label?: string;
  placeholder?: string;
}

export function IconPicker({ value, onChange, label, placeholder = 'Selecionar ícone' }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const selected = ICON_PICKER_OPTIONS.find((o) => o.name === value);
  const SelectedIcon = selected?.icon;

  return (
    <div className={[styles.iconPickerRoot, open ? styles.open : ''].join(' ')} ref={rootRef}>
      {label && <span className={inputStyles.label}>{label}</span>}
      <button
        type="button"
        className={styles.iconPickerTrigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.iconPickerPreview}>{SelectedIcon && <SelectedIcon size={14} />}</span>
        {selected
          ? <span className={styles.iconPickerValue}>{selected.name}</span>
          : <span className={`${styles.iconPickerValue} ${styles.iconPickerPlaceholder}`}>{placeholder}</span>}
        <span className={styles.iconPickerChevron}><ChevronDown size={14} /></span>
      </button>
      <div className={styles.iconPickerMenu} role="listbox" aria-label={label ?? 'Ícones'}>
        {ICON_PICKER_OPTIONS.map(({ name, icon: Icon }) => (
          <button
            key={name}
            type="button"
            role="option"
            aria-selected={name === value}
            title={name}
            className={[styles.iconPickerOption, name === value ? styles.selected : ''].join(' ')}
            onClick={() => { onChange?.(name); setOpen(false); }}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}
