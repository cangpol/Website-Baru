import { jsPDF } from "jspdf";
import { CalendarEvent } from "@/components/AcademicCalendar";

const monthNamesIndo = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export function generateAcademicCalendarPdf(year: number, events: CalendarEvent[]) {
  // Create A4 PDF document in portrait mode (210mm x 297mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - (margin * 2);

  // 1. KOP SURAT RESMI UNIVERSITAS
  doc.setFillColor(6, 23, 46); // #06172e Deep Navy
  doc.rect(0, 0, pageWidth, 26, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("UNIVERSITAS PIGNATELLI TRIPUTRA", margin, 11);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(186, 230, 253); // sky-200
  doc.text("Biro Administrasi Akademik & Kemahasiswaan (BAAK) • Surakarta, Jawa Tengah", margin, 17);
  doc.text("Website: https://upitra.ac.id | Email: akademik@upitra.ac.id", margin, 22);

  // 2. JUDUL DOKUMEN KALENDER AKADEMIK
  let currentY = 35;
  doc.setTextColor(12, 74, 110); // #0c4a6e
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(`KALENDER AKADEMIK RESMI TAHUN ${year}`, margin, currentY);

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(
    `Pedoman Baku Waktu Perkuliahan, Evaluasi Semester, dan Agenda Sivitas Akademika (Januari - Desember ${year})`,
    margin,
    currentY
  );

  currentY += 4;
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);

  currentY += 8;

  // 3. RINGKASAN MATRIKS 12 BULAN (Januari - Desember)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(`I. Matriks 12 Bulan Kalender Tahun ${year}`, margin, currentY);

  currentY += 5;

  const cols = 4;
  const rows = 3;
  const cellWidth = (contentWidth - ((cols - 1) * 3)) / cols;
  const cellHeight = 16;

  for (let m = 0; m < 12; m++) {
    const colIdx = m % cols;
    const rowIdx = Math.floor(m / cols);
    const x = margin + (colIdx * (cellWidth + 3));
    const y = currentY + (rowIdx * (cellHeight + 3));

    // Cell background
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.roundedRect(x, y, cellWidth, cellHeight, 1.5, 1.5, "FD");

    // Month Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(2, 132, 199); // #0284c7
    doc.text(`${m + 1}. ${monthNamesIndo[m]}`, x + 3, y + 5.5);

    // Count events in this month
    const monthStr = `${year}-${String(m + 1).padStart(2, "0")}`;
    const evInMonth = events.filter(e => e.start_date.startsWith(monthStr) || e.end_date.startsWith(monthStr));

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`${new Date(year, m + 1, 0).getDate()} Hari Kalender`, x + 3, y + 10);

    if (evInMonth.length > 0) {
      doc.setTextColor(19, 115, 51); // green-700
      doc.text(`• ${evInMonth.length} Kegiatan Akademik`, x + 3, y + 14);
    } else {
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text("• Perkuliahan Reguler", x + 3, y + 14);
    }
  }

  currentY += (rows * (cellHeight + 3)) + 8;

  // 4. DAFTAR AGENDA & KEGIATAN AKADEMIK TAHUN AKTIF
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(`II. Daftar Lengkap Agenda & Jadwal Kegiatan Akademik Tahun ${year}`, margin, currentY);

  currentY += 5;

  // Table Header
  const colWNo = 8;
  const colWDate = 38;
  const colWCategory = 28;
  const colWName = contentWidth - colWNo - colWDate - colWCategory;

  doc.setFillColor(12, 74, 110); // #0c4a6e
  doc.rect(margin, currentY, contentWidth, 7, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("NO", margin + 2, currentY + 4.8);
  doc.text("WAKTU PELAKSANAAN", margin + colWNo + 2, currentY + 4.8);
  doc.text("KATEGORI", margin + colWNo + colWDate + 2, currentY + 4.8);
  doc.text("NAMA KEGIATAN & RINCIAN DESKRIPSI", margin + colWNo + colWDate + colWCategory + 2, currentY + 4.8);

  currentY += 7;

  // Table Body Rows
  events.forEach((ev, idx) => {
    // Check if we need a page break
    if (currentY > pageHeight - 35) {
      doc.addPage();
      currentY = 20;

      // Repeat Table Header on new page
      doc.setFillColor(12, 74, 110);
      doc.rect(margin, currentY, contentWidth, 7, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text("NO", margin + 2, currentY + 4.8);
      doc.text("WAKTU PELAKSANAAN", margin + colWNo + 2, currentY + 4.8);
      doc.text("KATEGORI", margin + colWNo + colWDate + 2, currentY + 4.8);
      doc.text("NAMA KEGIATAN & RINCIAN DESKRIPSI", margin + colWNo + colWDate + colWCategory + 2, currentY + 4.8);
      currentY += 7;
    }

    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    
    // Split description text to fit cell
    const descText = ev.description ? ` - ${ev.description}` : "";
    const fullActivityText = `${ev.name}${descText}`;
    const textLines = doc.splitTextToSize(fullActivityText, colWName - 4);
    const rowHeight = Math.max(8, (textLines.length * 3.8) + 4);

    doc.rect(margin, currentY, contentWidth, rowHeight, "F");
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, currentY + rowHeight, margin + contentWidth, currentY + rowHeight);

    // Number
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(String(idx + 1), margin + 2, currentY + 4.8);

    // Dates
    const dateFormatted = ev.end_date && ev.end_date !== ev.start_date
      ? `${ev.start_date} s/d ${ev.end_date}`
      : ev.start_date;
    doc.text(dateFormatted, margin + colWNo + 2, currentY + 4.8);

    // Category Badge Text
    doc.setFont("helvetica", "bold");
    if (ev.category === "Akademik") doc.setTextColor(2, 132, 199);
    else if (ev.category === "Ujian") doc.setTextColor(12, 74, 110);
    else if (ev.category === "Libur") doc.setTextColor(100, 116, 139);
    else if (ev.category === "Wisuda") doc.setTextColor(3, 105, 161);
    else if (ev.category === "PMB") doc.setTextColor(2, 132, 199);
    else doc.setTextColor(37, 99, 235);
    doc.text(ev.category, margin + colWNo + colWDate + 2, currentY + 4.8);

    // Activity Name & Description
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(ev.name, margin + colWNo + colWDate + colWCategory + 2, currentY + 4.8);

    if (ev.description) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.8);
      doc.setTextColor(100, 116, 139);
      doc.text(ev.description, margin + colWNo + colWDate + colWCategory + 2, currentY + 8.5, {
        maxWidth: colWName - 4,
      });
    }

    currentY += rowHeight;
  });

  // 5. TANDA TANGAN & PENGESAHAN
  currentY += 8;
  if (currentY > pageHeight - 35) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text("Ditetapkan di: Surakarta", margin, currentY);
  doc.text(`Tahun Akademik: ${year}/${year + 1}`, margin, currentY + 4);

  const signX = pageWidth - margin - 60;
  doc.text("Universitas Pignatelli Triputra", signX, currentY);
  doc.text("Rektor,", signX, currentY + 4);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(12, 74, 110);
  doc.text("Fransisca Wahyuni, S.E., M.M.", signX, currentY + 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text("NIDN. 0612057801", signX, currentY + 22);

  // 6. FOOTER HALAMAN
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Dokumen Resmi Kalender Akademik UPITRA Tahun ${year} • Halaman ${i} dari ${totalPages}`,
      margin,
      pageHeight - 8
    );
  }

  // Trigger browser download
  doc.save(`Kalender_Akademik_UPITRA_${year}.pdf`);
}

