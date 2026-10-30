"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { Link as TiptapLink } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link as LinkIcon,
  ImageIcon,
  Highlighter,
  Table as TableIcon,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Quote,
  Minus,
  Play,
  Upload,
  Globe
} from "lucide-react";

interface RichEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
}

const ToolbarBtn = ({
  onClick,
  active = false,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
      active
        ? "bg-blue-600 text-white shadow-2xs"
        : "text-slate-600 hover:text-[#06172e] hover:bg-slate-200/70"
    }`}
  >
    {children}
  </button>
);

const Divider = () => <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />;

export default function RichEditor({
  value,
  onChange,
  height = 380,
  placeholder = "Tulis konten berita lengkap di sini. Anda dapat menyisipkan foto utuh dengan tombol Upload Gambar di atas...",
}: RichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline font-medium hover:text-blue-800",
        },
      }),
      TiptapImage.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-full rounded-2xl my-4 mx-auto object-cover shadow-md border border-slate-200",
        },
      }),
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync value dari luar saat modal edit dibuka
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!mounted || !editor) {
    return (
      <div
        className="w-full border border-slate-200 rounded-2xl bg-slate-50 flex items-center justify-center text-xs text-slate-400"
        style={{ minHeight: height }}
      >
        Memuat editor berita...
      </div>
    );
  }

  // ── 1. Insert Link ──────────────────────────────────────────────────────────
  const handleLink = () => {
    const previousUrl = editor.getAttributes("link").href ?? "";
    const url = window.prompt("Masukkan URL tautan (contoh: https://...):", previousUrl);
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url.trim() }).run();
    }
  };

  // ── 2. Insert Image via Local File Upload (Foto Utuh) ───────────────────────
  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Berkas yang dipilih harus berupa gambar (JPG, JPEG, PNG, atau WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (src && editor) {
        editor
          .chain()
          .focus()
          .setImage({ src, alt: file.name, title: file.name })
          .run();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageBtn = () => {
    fileInputRef.current?.click();
  };

  // ── 3. Insert Image via URL ─────────────────────────────────────────────────
  const handleImageUrl = () => {
    const url = window.prompt("Masukkan URL gambar (contoh: https://images.unsplash.com/...):");
    if (url && url.trim()) {
      editor.chain().focus().setImage({ src: url.trim() }).run();
    }
  };

  // ── 4. Insert YouTube Video Embed ───────────────────────────────────────────
  const handleYoutube = () => {
    const url = window.prompt(
      "Masukkan URL video YouTube (contoh: https://www.youtube.com/watch?v=...):"
    );
    if (!url) return;

    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0] || "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.match(/^[a-zA-Z0-9_-]{11}$/)) {
      videoId = url;
    }

    if (!videoId) {
      alert("URL YouTube tidak valid. Gunakan format: https://www.youtube.com/watch?v=ID_VIDEO");
      return;
    }

    const embedHtml = `<div class="aspect-video my-4 w-full rounded-2xl overflow-hidden shadow-md border border-slate-200"><iframe src="https://www.youtube.com/embed/${videoId}?rel=0" class="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><p></p>`;
    editor.chain().focus().insertContent(embedHtml).run();
  };

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
      {/* ── Toolbar Bar ── */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-slate-50 border-b border-slate-200 text-slate-700">
        {/* History */}
        <ToolbarBtn title="Undo (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Redo (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Headings */}
        <ToolbarBtn
          title="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Text Formats */}
        <ToolbarBtn
          title="Bold (Ctrl+B)"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Italic (Ctrl+I)"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Underline (Ctrl+U)"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Highlight"
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Kode Inline"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Alignment */}
        <ToolbarBtn
          title="Rata Kiri"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Rata Tengah"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Rata Kanan"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Justify (Rata Kanan-Kiri)"
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <AlignJustify className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Lists & Quotes */}
        <ToolbarBtn
          title="Daftar Poin (Bullet List)"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Daftar Nomor (Numbered List)"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Kutipan (Blockquote)"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Garis Pembatas Horizontal"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Link */}
        <ToolbarBtn
          title="Sisipkan Tautan (Link)"
          active={editor.isActive("link")}
          onClick={handleLink}
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </ToolbarBtn>

        {/* ── IMAGE INSERTION TOOLS (UPLOAD & URL) ── */}
        <button
          type="button"
          onClick={handleImageBtn}
          title="Upload Foto Komputer (Sisipkan Foto Utuh ke Artikel)"
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200 cursor-pointer shadow-2xs"
        >
          <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
          <span>Upload Foto</span>
        </button>

        <ToolbarBtn title="Sisipkan Foto dari URL" onClick={handleImageUrl}>
          <div className="flex items-center gap-0.5 text-[11px] font-bold">
            <Globe className="w-3 h-3" />
            <span>URL</span>
          </div>
        </ToolbarBtn>

        <ToolbarBtn title="Embed Video YouTube" onClick={handleYoutube}>
          <Play className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Table */}
        <ToolbarBtn
          title="Sisipkan Tabel"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <TableIcon className="w-3.5 h-3.5" />
        </ToolbarBtn>
      </div>

      {/* ── Editor Canvas Area ── */}
      <EditorContent
        editor={editor}
        className="prose prose-slate max-w-none p-4 text-slate-800 text-xs sm:text-sm focus:outline-none overflow-y-auto leading-relaxed"
        style={{ minHeight: height, maxHeight: height + 250 }}
      />

      {/* Hidden File Input untuk Upload Foto Utuh ke Konten */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
          e.target.value = "";
        }}
      />

      {/* ── Local Styles for TipTap Content ── */}
      <style jsx global>{`
        .tiptap {
          outline: none !important;
        }
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #94a3b8;
          pointer-events: none;
          height: 0;
        }
        .tiptap h1 {
          font-size: 1.6rem;
          font-weight: 800;
          color: #06172e;
          margin: 1.25rem 0 0.5rem;
        }
        .tiptap h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #06172e;
          margin: 1rem 0 0.4rem;
        }
        .tiptap h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #06172e;
          margin: 0.85rem 0 0.35rem;
        }
        .tiptap p {
          margin: 0.45rem 0;
          line-height: 1.7;
          color: #334155;
        }
        .tiptap ul {
          list-style-type: disc;
          padding-left: 1.4rem;
          margin: 0.5rem 0;
        }
        .tiptap ol {
          list-style-type: decimal;
          padding-left: 1.4rem;
          margin: 0.5rem 0;
        }
        .tiptap blockquote {
          border-left: 3px solid #2563eb;
          padding-left: 1rem;
          color: #475569;
          font-style: italic;
          margin: 0.85rem 0;
        }
        .tiptap code {
          background: #eff6ff;
          color: #1e40af;
          padding: 0.15rem 0.35rem;
          border-radius: 4px;
          font-size: 0.85em;
          font-family: monospace;
        }
        .tiptap hr {
          border: none;
          border-top: 2px solid #e2e8f0;
          margin: 1.25rem 0;
        }
        .tiptap table {
          border-collapse: collapse;
          width: 100%;
          margin: 0.85rem 0;
          border: 1px solid #cbd5e1;
        }
        .tiptap td,
        .tiptap th {
          border: 1px solid #cbd5e1;
          padding: 0.5rem 0.75rem;
        }
        .tiptap th {
          background: #f1f5f9;
          font-weight: 700;
        }
        .tiptap mark {
          background: #fef08a;
          padding: 0 3px;
          border-radius: 3px;
        }
        .tiptap img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 1rem auto;
          display: block;
          box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }
      `}</style>
    </div>
  );
}
