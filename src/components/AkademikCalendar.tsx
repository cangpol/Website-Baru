"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import type { DatesSetArg, EventInput, EventMountArg } from "@fullcalendar/core";
import { ChevronDown, FileText } from "lucide-react";
import { CalendarEvent, generateAcademicCalendarPdf } from "@/lib/generateAcademicCalendarPdf";
import "./akademik-calendar.css";

type AgendaItem = CalendarEvent & { startAt?: string; endAt?: string };

const pad = (n: number) => String(n).padStart(2, "0");
const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const nextDay = (isoDate: string) => new Date(Date.parse(`${isoDate}T00:00:00Z`) + 86400000).toISOString().slice(0, 10);

// Kalender memakai zona UTC supaya jam tampil persis seperti tersimpan; "hari ini" tetap mengikuti jam pengunjung.
const localNow = () => {
  const d = new Date();
  return `${toIso(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
};

function toCalendarInput(item: AgendaItem): EventInput {
  const base = { id: String(item.id), title: item.name, extendedProps: { location: item.location } };
  // Agenda dari admin hanya punya tanggal (tersimpan pukul 00:00). Jam hanya ditampilkan bila memang diisi.
  if (item.startAt && !item.startAt.includes("T00:00:00")) {
    return { ...base, start: item.startAt, end: item.endAt };
  }
  const lastDay = item.end_date || item.start_date;
  return {
    ...base,
    start: item.start_date,
    end: nextDay(lastDay), // tanggal akhir FullCalendar bersifat eksklusif
    allDay: true,
    display: lastDay > item.start_date ? "block" : "list-item",
  };
}

const showEventTooltip = ({ el, event }: EventMountArg) => {
  const location = event.extendedProps.location as string | undefined;
  el.title = location ? `${event.title} — ${location}` : event.title;
};

// Dibuat di luar komponen agar FullCalendar tidak menganggap pengaturannya berubah di setiap render.
const PLUGINS = [dayGridPlugin, listPlugin];
const TOOLBAR = { left: "prev,next today", center: "title", right: "dayGridMonth,listMonth" };
const BUTTON_TEXT = { today: "today", month: "month", list: "list" };

const EMPTY_TEXT = {
  loading: "Memuat agenda…",
  ready: "Belum ada agenda pada bulan ini.",
  error: "Agenda gagal dimuat.",
};

export default function AkademikCalendar() {
  const [events, setEvents] = useState<AgendaItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [period, setPeriod] = useState(() => ({ year: new Date().getFullYear(), month: new Date().getMonth() }));
  const [officialPdf, setOfficialPdf] = useState<{
    fileUrl: string;
    fileName: string;
    academicYear?: string;
    updatedAt?: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((json) => {
        if (!json?.ok || !Array.isArray(json.data)) throw new Error("Agenda tidak tersedia");
        if (json.officialPdf) setOfficialPdf(json.officialPdf);
        setEvents(
          json.data.map(
            (item: {
              id: string;
              title: string;
              startDate: string;
              endDate: string;
              type?: string;
              description?: string;
              location?: string;
            }): AgendaItem => ({
              id: item.id,
              startAt: item.startDate,
              endAt: item.endDate,
              name: item.title,
              start_date: item.startDate.split("T")[0],
              end_date: item.endDate.split("T")[0],
              category: item.type || "Akademik",
              description: item.description || "",
              location: item.location || "",
            })
          )
        );
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const { year, month } = period;
  const calendarEvents = useMemo(() => events.map(toCalendarInput), [events]);

  const handleDatesSet = useCallback(({ view }: DatesSetArg) => {
    const next = { year: view.currentStart.getUTCFullYear(), month: view.currentStart.getUTCMonth() };
    setPeriod((prev) => (prev.year === next.year && prev.month === next.month ? prev : next));
  }, []);

  // PDF otomatis hanya memuat agenda pada tahun yang sedang dibuka.
  const yearEvents = useMemo(
    () => events.filter((e) => e.start_date <= `${year}-12-31` && e.end_date >= `${year}-01-01`),
    [events, year]
  );

  const academicYearLabel = officialPdf?.academicYear || `${month >= 6 ? year : year - 1}/${month >= 6 ? year + 1 : year}`;

  return (
    <div className="space-y-5">
      {status === "error" && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          Agenda gagal dimuat. Muat ulang halaman untuk mencoba lagi.
        </p>
      )}

      <div className="akademik-calendar">
        <FullCalendar
          plugins={PLUGINS}
          initialView="dayGridMonth"
          headerToolbar={TOOLBAR}
          buttonText={BUTTON_TEXT}
          timeZone="UTC"
          now={localNow}
          height="auto"
          events={calendarEvents}
          eventDidMount={showEventTooltip}
          datesSet={handleDatesSet}
          noEventsContent={EMPTY_TEXT[status]}
        />
      </div>

      {/* Dokumen kalender akademik */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.12)] ring-1 ring-slate-100 sm:p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#006bbd] text-white">
          <FileText className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-slate-900">Kalender Akademik {academicYearLabel}</p>
          <p className="text-xs text-slate-500">
            {officialPdf
              ? `Terakhir Update${officialPdf.updatedAt ? `: ${officialPdf.updatedAt}` : ""}`
              : status !== "ready"
                ? EMPTY_TEXT[status]
                : yearEvents.length
                  ? `PDF dibuat otomatis dari ${yearEvents.length} agenda tahun ${year}`
                  : `Belum ada agenda pada tahun ${year}`}
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
            onClick={() => generateAcademicCalendarPdf(year, yearEvents)}
            disabled={yearEvents.length === 0}
            className="rounded-md bg-[#006bbd] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#005a9e] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Unduh
          </button>
        )}
        <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" aria-hidden />
      </div>
    </div>
  );
}
