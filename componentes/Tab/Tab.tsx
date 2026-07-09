import { ReactNode, useState } from 'react';
import styles from './Tab.module.css';

export interface TabItem { label: string; content: ReactNode; }

export interface TabProps {
  tabs: TabItem[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  /** 'segmented' (default) — abas em caixa, usado no painel-adm.
   *  'underline' — abas simples com sublinhado, usado no site institucional. */
  variant?: 'segmented' | 'underline';
}

function getPositionClass(i: number, total: number, s: typeof styles): string {
  if (i === 0) return s.tabLeft;
  if (i === total - 1) return s.tabRight;
  return s.tabMiddle;
}

export function Tab({ tabs, defaultIndex = 0, onChange, variant = 'segmented' }: TabProps) {
  const [active, setActive] = useState(defaultIndex);

  const select = (i: number) => { setActive(i); onChange?.(i); };

  return (
    <div className={styles.tabWrapper}>
      <div className={[styles.tabList, variant === 'underline' ? styles.tabListUnderline : ''].filter(Boolean).join(' ')} role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            aria-controls={`tabpanel-${i}`}
            className={
              variant === 'underline'
                ? [styles.tabBtnUnderline, active === i ? styles.tabBtnUnderlineActive : ''].filter(Boolean).join(' ')
                : [styles.tabBtn, active === i ? styles.tabBtnActive : '', getPositionClass(i, tabs.length, styles)].filter(Boolean).join(' ')
            }
            onClick={() => select(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div id={`tabpanel-${active}`} role="tabpanel" className={styles.tabPanel}>
        {tabs[active]?.content}
      </div>
    </div>
  );
}
