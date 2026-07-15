import { Plus } from 'lucide-react';
import styles from './CalendarMonth.module.css';

export interface CalendarMonthEvent {
  /** Data ISO (YYYY-MM-DD) */
  date: string;
  /** Hora exibida no chip, ex: "09:00" */
  time: string;
  title: string;
  /** 'publicado' = dot verde · 'rascunho' = dot cinza */
  status?: 'publicado' | 'rascunho';
}

export interface CalendarMonthProps {
  /** Ano exibido, ex: 2026 */
  year: number;
  /** Mês exibido (0-indexado, como Date) */
  month: number;
  events?: CalendarMonthEvent[];
  onEventClick?: (event: CalendarMonthEvent) => void;
  /** Habilita o botão "+" no hover de cada dia do mês — adição rápida de evento */
  onAddClick?: (dateIso: string) => void;
  weekdays?: string[];
  /** Data considerada "hoje" — destaque cinza. Padrão: data atual */
  today?: Date;
}

const WEEKDAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function CalendarMonth({
  year,
  month,
  events = [],
  onEventClick,
  onAddClick,
  weekdays = WEEKDAYS_PT,
  today = new Date(),
}: CalendarMonthProps) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  const cells = Array.from({ length: totalCells }, (_, i) => {
    const dayOffset = i - firstWeekday;
    if (dayOffset < 0) {
      return { day: daysInPrev + dayOffset + 1, outside: true, iso: null };
    }
    if (dayOffset >= daysInMonth) {
      return { day: dayOffset - daysInMonth + 1, outside: true, iso: null };
    }
    const day = dayOffset + 1;
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return { day, outside: false, iso };
  });

  const isToday = (iso: string | null) =>
    iso !== null &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    iso.endsWith(`-${String(today.getDate()).padStart(2, '0')}`);

  return (
    <div className={styles.evCal}>
      <div className={styles.evCalWeekdays}>
        {weekdays.map((w) => (
          <span key={w} className={styles.evCalWeekday}>{w}</span>
        ))}
      </div>
      <div className={styles.evCalGrid}>
        {cells.map((cell, i) => {
          const dayEvents = cell.iso ? events.filter((e) => e.date === cell.iso) : [];
          const classes = [
            styles.evCalDay,
            cell.outside ? styles.evCalDayOutside : '',
            isToday(cell.iso) ? styles.evCalDayToday : '',
          ].filter(Boolean).join(' ');
          return (
            <div key={i} className={classes}>
              <span className={styles.evCalDayNumber}>{cell.day}</span>
              {dayEvents.map((event) => (
                <button
                  key={event.title}
                  type="button"
                  className={styles.evCalEvent}
                  onClick={() => onEventClick?.(event)}
                >
                  <span className={styles.evCalEventTime}>
                    <span
                      className={[
                        styles.evCalEventDot,
                        event.status === 'rascunho' ? styles.evCalEventDotMuted : '',
                      ].filter(Boolean).join(' ')}
                    />
                    {event.time}
                  </span>
                  <span className={styles.evCalEventTitle}>{event.title}</span>
                </button>
              ))}
              {onAddClick && cell.iso && (
                <button
                  type="button"
                  className={styles.evCalDayAdd}
                  aria-label={`Adicionar evento em ${cell.iso}`}
                  title="Adicionar evento"
                  onClick={() => onAddClick(cell.iso!)}
                >
                  <Plus size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
