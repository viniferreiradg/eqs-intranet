import type { Meta, StoryObj } from '@storybook/react';
import { ChevronLeft, ChevronRight, Calendar, X, CornerDownLeft } from 'lucide-react';
import styles from './DatePicker.module.css';

/* ── Static render helper — no logic, just layout ── */
function DatePickerDemo({ hasValue = false }: { hasValue?: boolean }) {
  const days = [
    // Week 1 (prev month overflow)
    { n: 26, outside: true }, { n: 27, outside: true }, { n: 28, outside: true },
    { n: 29, outside: true }, { n: 30, outside: true }, { n: 1 }, { n: 2 },
    // Week 2
    { n: 3 }, { n: 4, bold: true }, { n: 5, bold: true }, { n: 6 }, { n: 7 }, { n: 8 }, { n: 9 },
    // Week 3
    { n: 10 }, { n: 11, bold: true }, { n: 12, start: true }, { n: 13, range: true },
    { n: 14, range: true }, { n: 15, range: true }, { n: 16, range: true },
    // Week 4
    { n: 17, range: true }, { n: 18, range: true }, { n: 19, range: true },
    { n: 20, range: true }, { n: 21, range: true }, { n: 22, end: true }, { n: 23 },
    // Week 5
    { n: 24 }, { n: 25 }, { n: 26 }, { n: 27 }, { n: 28 }, { n: 29 }, { n: 30 },
    // Week 6 (next month overflow)
    { n: 31 }, { n: 1, outside: true }, { n: 2, outside: true }, { n: 3, outside: true },
    { n: 4, outside: true }, { n: 5, outside: true }, { n: 6, outside: true },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
      <div className={styles.popoverWrap}>
        {/* Trigger */}
        <button className={`${styles.trigger} ${hasValue ? styles.open : ''}`}>
          <span className={styles.triggerIcon}><Calendar size={14} /></span>
          {hasValue
            ? <span className={styles.triggerText}>May 12 – 22</span>
            : <span className={styles.triggerPlaceholder}>Select Date Range</span>
          }
          {hasValue && (
            <button className={styles.triggerClear} aria-label="Limpar"><X size={12} /></button>
          )}
        </button>

        {/* Popover */}
        <div className={styles.popover}>

          {/* Calendar panel */}
          <div className={styles.calPanel}>
            <div className={styles.calHeader}>
              <button className={styles.calNavBtn} aria-label="Mês anterior">
                <ChevronLeft size={14} />
              </button>
              <span className={styles.calMonthLabel}>May 2026</span>
              <button className={styles.calNavBtn} aria-label="Próximo mês">
                <ChevronRight size={14} />
              </button>
            </div>

            <div className={styles.calGrid}>
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} className={styles.calDayName}>{d}</div>
              ))}
              {days.map((d, i) => {
                let cls = styles.calDay;
                if (d.outside) cls += ` ${styles.calDayOutside}`;
                if (d.start)   cls += ` ${styles.calDayStart}`;
                if (d.end)     cls += ` ${styles.calDayEnd}`;
                if (d.range)   cls += ` ${styles.calDayInRange}`;
                if (d.bold && !d.start && !d.end && !d.range) cls += ` ${styles.calDayToday}`;
                return (
                  <button key={i} className={cls}>{d.n}</button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className={styles.panelDivider} />

          {/* Controls */}
          <div className={styles.ctrlPanel}>
            <div>
              <div className={styles.ctrlFieldLabel}>Start</div>
              <input
                className={styles.ctrlDateInput}
                defaultValue={hasValue ? 'May 12, 2026' : ''}
                placeholder="dd/mm/yyyy"
                readOnly
              />
            </div>
            <div>
              <div className={styles.ctrlFieldLabel}>End</div>
              <input
                className={styles.ctrlDateInput}
                defaultValue={hasValue ? 'May 22, 2026' : ''}
                placeholder="dd/mm/yyyy"
                readOnly
              />
            </div>
            <div className={styles.ctrlSpacer} />
            <button className={styles.ctrlApply}>
              Apply <CornerDownLeft size={12} />
            </button>
            <select className={styles.ctrlTzSelect} defaultValue="America/Sao_Paulo">
              <option value="America/Sao_Paulo">Local (America/Sao_Paulo)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Primitives/DatePicker',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Empty: Story = {
  render: () => <DatePickerDemo hasValue={false} />,
  name: 'Sem seleção',
};

export const WithRange: Story = {
  render: () => <DatePickerDemo hasValue={true} />,
  name: 'Com intervalo selecionado',
};
