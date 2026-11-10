"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { CalendarEvent, initialAcademicEvents } from "@/components/AcademicCalendar";
import { generateAcademicCalendarPdf } from "@/lib/generateAcademicCalendarPdf";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n: number) => String(n).padStart(2, "0");
const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const dayDiff = (a: Date, b: Date) =>
  Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000);

interface PlacedEvent {
  event: CalendarEvent;
  startCol: number; // 0..6
  endCol: number; // 0..6 (inclusive)
  lane: number;
  multiDay: boolean;
  continuesBefore: boolean;
  continuesAfter: boolean;
}

function layoutWeek(weekStart: Date, events: CalendarEvent[]): { placed: PlacedEvent[]; lanes: number } {
  const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
  const startIso = toIso(weekStart);
  const endIso = toIso(weekEnd);

  const items = events
    .filter((e) => e.start_date && e.start_date <= endIso && (e.end_date || e.start_date) >= startIso)
    .map((e) => {
      const s = new Date(`${e.start_date}T00:00:00`);
      const eEnd = new Date(`${e.end_date || e.start_date}T00:00:00`);
      const startCol = Math.max(0, dayDiff(weekStart, s));
      const endCol = Math.min(6, dayDiff(weekStart, eEnd));
      return {
        event: e,
        startCol,
        endCol,
        multiDay: dayDiff(s, eEnd) >= 1,
        continuesBefore: e.start_date < startIso,
        continuesAfter: (e.end_date || e.start_date) > endIso,
      };
    })
    // longest first so bars stack above point events
    .sort((a, b) => a.startCol - b.startCol || b.endCol - b.startCol - (a.endCol - a.startCol));

  const laneEnds: number[] = [];
  const placed: PlacedEvent[] = items.map((item) => {
    let lane = laneEnds.findIndex((end) => end < item.startCol);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(item.endCol);
    } else {
      laneEnds[lane] = item.endCol;
    }
    return { ...item, lane };
  });

  return { placed, lanes: laneEnds.length };
}

export default function AkademikCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialAcademicEvents);
  const [current, setCurrent] = useState<Date>(() => new Date());
  const [view, setView] = useState<"month" | "list">("month");
  const [todayIso, setTodayIso] = useState<string>(() => toIso(new Date()));
  const [officialPdf, setOfficialPdf] = useState<{
    fileUrl: string;
    fileName: string;
    academicYear?: string;
    updatedAt?: string;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    setCurrent(now);
    setTodayIso(toIso(now));

    fetch("/api/events")
      .then((res) => res.json())
      .then((json) => {
        if (!json?.ok) return;
        if (json.officialPdf) setOfficialPdf(json.officialPdf);
        if (Array.isArray(json.data) && json.data.length > 0) {
          setEvents(
            json.data.map(
              (item: {
                id: string;
                title?: string;
                startDate?: string;
                endDate?: string;
                type?: string;
                description?: string;
                academicYear?: string;
                semester?: string;
                location?: string;
              }): CalendarEvent => ({
                id: item.id,
                name: item.title || "Event Kampus",
                start_date: item.startDate ? item.startDate.split("T")[0] : "",
                end_date: item.endDate ? item.endDate.split("T")[0] : item.startDate ? item.startDate.split("T")[0] : "",
                category: item.type || "Akademik",
                description: item.description || "",
                all_day: true,
                academicYear: item.academicYear || "2025/2026",
                semester: item.semester || "Gasal",
                location: item.location || "",
              })
            )
          );
        }
      })
      .catch(() => {});
  }, []);

  const year = current.getFullYear();
  const month = current.getMonth();

  const weeks = useMemo(() => {
    const first = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - first.getDay());
    const lastDay = new Date(year, month + 1, 0);
    const totalCells = first.getDay() + lastDay.getDate();
    const weekCount = Math.ceil(totalCells / 7);
    return Array.from({ length: weekCount }, (_, w) => {
      const weekStart = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + w * 7);
      const days = Array.from({ length: 7 }, (_, d) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + d));
      return { weekStart, days, ...layoutWeek(weekStart, events) };
    });
  }, [year, month, events]);

  const monthEvents = useMemo(() => {
    const monthStart = toIso(new Date(year, month, 1));
    const monthEnd = toIso(new Date(year, month + 1, 0));
    return events
      .filter((e) => e.start_date <= monthEnd && (e.end_date || e.start_date) >= monthStart)
      .sort((a, b) => a.start_date.localeCompare(b.start_date));
  }, [events, year, month]);

  const academicYearLabel = officialPdf?.academicYear || `${month >= 6 ? year : year - 1}/${month >= 6 ? year + 1 : year}`;

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="flex overflow-hidden rounded-md">
            <button
              type="button"
              aria-label="Bulan sebelumnya"
              onClick={() => setCurrent(new Date(year, month - 1, 1))}
              className="bg-slate-700 px-2.5 py-1.5 text-white transition-colors hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Bulan berikutnya"
              onClick={() => setCurrent(new Date(year, month + 1, 1))}
              className="border-l border-slate-600 bg-slate-700 px-2.5 py-1.5 text-white transition-colors hover:bg-slate-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setCurrent(new Date())}
            className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800"
          >
            today
          </button>
        </div>

        <h3 className="text-center text-lg font-medium text-slate-800 sm:text-xl">
          {MONTH_NAMES[month]} {year}
        </h3>

        <div className="flex overflow-hidden rounded-md">
          {(["month", "list"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              className={`px-3 py-1.5 text-xs font-medium text-white transition-colors ${
                view === mode ? "bg-slate-900" : "bg-slate-700 hover:bg-slate-800"
              } ${mode === "list" ? "border-l border-slate-600" : ""}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {view === "month" ? (
        <div className="overflow-x-auto rounded-sm border border-slate-300 bg-white">
          <div className="min-w-[680px]">
            <div className="grid grid-cols-7 border-b border-slate-300 bg-white text-center text-[11px] font-bold text-slate-800">
              {DAY_NAMES.map((d) => (
                <div key={d} className="border-r border-slate-200 py-1.5 last:border-r-0">
                  {d}
                </div>
              ))}
            </div>

            {weeks.map(({ weekStart, days, placed, lanes }) => (
              <div
                key={toIso(weekStart)}
                className="relative border-b border-slate-300 last:border-b-0"
                style={{ minHeight: Math.max(88, 30 + lanes * 24) }}
              >
                <div className="absolute inset-0 grid grid-cols-7">
                  {days.map((day) => {
                    const iso = toIso(day);
                    const inMonth = day.getMonth() === month;
                    const isToday = iso === todayIso;
                    return (
                      <div
                        key={iso}
                        className={`border-r border-slate-200 p-1 text-right text-[11px] last:border-r-0 ${
                          isToday ? "bg-amber-50" : ""
                        } ${inMonth ? "text-slate-800" : "text-slate-400"}`}
                      >
                        {day.getDate()}
                      </div>
                    );
                  })}
                </div>

                <div
                  className="pointer-events-none relative grid grid-cols-7 gap-y-[2px] pt-6"
                  style={{ gridAutoRows: "22px" }}
                >
                  {placed.map((p) => (
                    <div
                      key={`${p.event.id}-${p.lane}`}
                      title={`${p.event.name}${p.event.location ? ` — ${p.event.location}` : ""}`}
                      className={`pointer-events-auto flex items-center gap-1 overflow-hidden px-1.5 text-[11px] leading-none ${
                        p.multiDay
                          ? `bg-[#3b7de0] text-white ${p.continuesBefore ? "" : "rounded-l-sm ml-px"} ${
                              p.continuesAfter ? "" : "rounded-r-sm mr-px"
                            }`
                          : "text-slate-800"
                      }`}
                      style={{ gridColumn: `${p.startCol + 1} / ${p.endCol + 2}`, gridRow: p.lane + 1 }}
                    >
                      {!p.multiDay && <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3b7de0]" />}
                      <span className="truncate">{p.event.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-sm border border-slate-300 bg-white">
          {monthEvents.length === 0 && (
            <li className="p-6 text-center text-sm text-slate-500">Belum ada agenda pada bulan ini.</li>
          )}
          {monthEvents.map((e) => (
            <li key={e.id} className="flex items-start gap-3 p-3 text-sm">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#3b7de0]" />
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">{e.name}</p>
                <p className="text-xs text-slate-500">
                  {e.start_date}
                  {e.end_date && e.end_date !== e.start_date ? ` – ${e.end_date}` : ""}
                  {e.location ? ` • ${e.location}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Dokumen kalender akademik */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.12)] ring-1 ring-slate-100 sm:p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#006bbd] text-white">
          <FileText className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-slate-900">Kalender Akademik {academicYearLabel}</p>
          <p className="text-xs text-slate-500">
            Terakhir Update{officialPdf?.updatedAt ? `: ${officialPdf.updatedAt}` : ""}
          </p>
        </div>
        {officialPdf?.fileUrl ? (
          <a
            href={officialPdf.fileUrl}
            download={officialPdf.fileName}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-[#006bbd] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#005a9e]"
          >
            Unduh
          </a>
        ) : (
          <button
            type="button"
            onClick={() => generateAcademicCalendarPdf(year, monthEvents.length ? events : initialAcademicEvents)}
            className="rounded-md bg-[#006bbd] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#005a9e]"
          >
            Unduh
          </button>
        )}
        <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" aria-hidden />
      </div>
    </div>
  );
}
