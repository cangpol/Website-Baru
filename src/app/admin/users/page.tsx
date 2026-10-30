"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  UserCheck, 
  UserX, 
  Clock, 
  Lock,
  Mail,
  ShieldAlert
} from "lucide-react";
import { initialAdminUsers, AdminUserItem } from "@/lib/adminDataStore";
import { loadCrudCollection, saveCrudCollection, newCrudId } from "@/lib/adminCrudStore";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserItem[]>(initialAdminUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminUserItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState<AdminUserItem["role"]>("STAFF_PMB");
  const [formStatus, setFormStatus] = useState<AdminUserItem["status"]>("Aktif");

  // Load from localStorage
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await loadCrudCollection<AdminUserItem[]>("users", initialAdminUsers);
        if (!cancelled) setUsers(Array.isArray(res.data) ? res.data : initialAdminUsers);
      } catch {
        if (!cancelled) setUsers(initialAdminUsers);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const saveToStorage = (updated: AdminUserItem[]) => {
    saveCrudCollection<AdminUserItem[]>("users", updated, setUsers);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormName("");
    setFormEmail("");
    setFormRole("STAFF_PMB");
    setFormStatus("Aktif");
    setModalOpen(true);
  };

  const handleOpenEdit = (user: AdminUserItem) => {
    setEditingItem(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    setFormStatus(user.status);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;

    if (editingItem) {
      const updated = users.map((u) =>
        u.id === editingItem.id
          ? {
              ...u,
              name: formName,
              email: formEmail,
              role: formRole,
              status: formStatus,
            }
          : u
      );
      saveToStorage(updated);
    } else {
      const newUser: AdminUserItem = {
        id: newCrudId("usr"),
        name: formName,
        email: formEmail,
        role: formRole,
        status: formStatus,
        lastLogin: "Baru dibuat (Belum login)",
      };
      saveToStorage([...users, newUser]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    // Prevent deleting the primary superadmin
    if (id === "usr-01") {
      alert("Akun Administrator Utama tidak dapat dihapus!");
      return;
    }
    const updated = users.filter((u) => u.id !== id);
    saveToStorage(updated);
    setDeleteConfirmId(null);
  };

  const toggleStatus = (id: string) => {
    if (id === "usr-01") return;
    const updated = users.map((u) =>
      u.id === id
        ? {
            ...u,
            status: (u.status === "Aktif" ? "Nonaktif" : "Aktif") as AdminUserItem["status"],
          }
        : u
    );
    saveToStorage(updated);
  };

  // Filtered
  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const getRoleBadge = (role: AdminUserItem["role"]) => {
    switch (role) {
      case "SUPERADMIN":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 w-fit">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Superadmin
          </span>
        );
      case "STAFF_PMB":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Staff Admisi PMB
          </span>
        );
      case "CONTENT_WRITER":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Humas & Redaksi
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a192f] border border-blue-900/40 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              Otoritas & Keamanan
            </span>
            <span className="text-xs text-slate-400">Total: {users.length} Akun Pengguna</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-indigo-400" />
            Manajemen Pengguna & Hak Akses Admin
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Kelola akun administrator, staff PMB admisi, dan penulis konten dengan pembagian peran yang ketat dan aman.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          Tambah Pengguna Baru
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#0a192f] border border-blue-900/40 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama atau email akun..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#071322] border border-blue-900/40 pl-9 pr-4 py-2 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            aria-label="Filter role akun"
            className="bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-400"
          >
            <option value="ALL">Semua Peran (Role)</option>
            <option value="SUPERADMIN">Superadmin</option>
            <option value="STAFF_PMB">Staff PMB</option>
            <option value="CONTENT_WRITER">Content Writer</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0a192f] border border-blue-900/40 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#071322] text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-blue-900/40">
              <tr>
                <th className="py-4 px-4">Nama Pengguna & Email</th>
                <th className="py-4 px-4">Peran & Otoritas</th>
                <th className="py-4 px-4">Status Akun</th>
                <th className="py-4 px-4">Login Terakhir</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/20 text-slate-300">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-blue-950/20 transition group">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white group-hover:text-indigo-300 transition">
                      {u.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      {u.email}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getRoleBadge(u.role)}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      disabled={u.id === "usr-01"}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition ${
                        u.status === "Aktif"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                          : "bg-slate-700/40 text-slate-400 border-slate-600 hover:bg-slate-700/60"
                      } ${u.id === "usr-01" ? "cursor-default opacity-80" : ""}`}
                    >
                      {u.status}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-xs font-mono text-slate-400">
                    {u.lastLogin}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition"
                        title="Edit Pengguna"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {u.id !== "usr-01" && (
                        <button
                          onClick={() => setDeleteConfirmId(u.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition"
                          title="Hapus Pengguna"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Guide Box */}
      <div className="bg-[#0a192f] border border-blue-900/40 p-6 rounded-2xl">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          Keterangan Hak Akses & Matriks Otoritas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#071322] border border-rose-900/30 space-y-1.5">
            <p className="font-bold text-rose-400">SUPERADMIN</p>
            <p className="text-slate-300">
              Akses penuh ke seluruh modul analitik, konfigurasi gateway, pengelolaan semua data prodi, pendaftaran PMB, berita, layanan, banner, dan manajemen user.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#071322] border border-amber-900/30 space-y-1.5">
            <p className="font-bold text-amber-400">STAFF ADMISI PMB</p>
            <p className="text-slate-300">
              Akses khusus untuk memproses data pendaftar PMB Leads, follow-up WhatsApp calon mahasiswa, memperbarui status beasiswa/wawancara, dan ekspor CSV.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#071322] border border-sky-900/30 space-y-1.5">
            <p className="font-bold text-sky-400">HUMAS & REDAKSI</p>
            <p className="text-slate-300">
              Akses untuk menulis dan menerbitkan artikel berita kampus, pengumuman, katalog e-brosur di Download Center, dan memantau sinkronisasi Instagram.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] border border-blue-900/60 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-blue-900/40 bg-[#071322]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                {editingItem ? "Edit Hak Akses Pengguna" : "Tambah Pengguna Admin Baru"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Nama Lengkap Petugas *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Budi Santoso, S.Kom."
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Akun (@upitra.ac.id) *</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="nama.staff@upitra.ac.id"
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Peran Otoritas (Role)</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as AdminUserItem["role"])}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-400"
                  >
                    <option value="STAFF_PMB">Staff Admisi PMB</option>
                    <option value="CONTENT_WRITER">Humas & Redaksi</option>
                    <option value="SUPERADMIN">Superadmin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Status Akun</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as AdminUserItem["status"])}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-400"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              {!editingItem && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
                  <p className="font-semibold mb-1">Kredensial Default Awal:</p>
                  <p>Password akun baru diset ke <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-300">upitra2026</code> dan harus diganti saat login pertama melalui gateway portal.</p>
                </div>
              )}

              <div className="pt-3 border-t border-blue-900/40 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-indigo-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {editingItem ? "Simpan Perubahan" : "Tambahkan Pengguna"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] border border-rose-900/50 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400" />
              Hapus Pengguna Admin?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Akun pengguna ini akan dicabut hak aksesnya dari dashboard admin UPITRA.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-xl transition"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition"
              >
                Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

