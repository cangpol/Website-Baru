"use client";

import { EmptyState, LoadingState, Pagination, useModalKeys, usePagination } from "@/components/admin/crud-ui";
import { swalToast, swalConfirmDelete } from "@/lib/swal";
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
import { getUsers, saveUserAction, deleteUserAction } from "@/server/users";

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "SUPERADMIN" | "STAFF_PMB" | "CONTENT_WRITER";
  isActive?: boolean;
  status: "Aktif" | "Nonaktif";
  lastLogin?: string;
  lastLoginAt?: string | null;
  mustChangePassword?: boolean;
  createdAt?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useModalKeys(modalOpen, () => setModalOpen(false));
  const [editingItem, setEditingItem] = useState<AdminUserItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState<AdminUserItem["role"]>("STAFF_PMB");
  const [formStatus, setFormStatus] = useState<AdminUserItem["status"]>("Aktif");

  const [formPassword, setFormPassword] = useState("");

  // Load from Database
  const loadData = async () => {
    try {
      const data = await getUsers();
      const mapped: AdminUserItem[] = data.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role as any,
        isActive: u.isActive,
        status: u.isActive ? "Aktif" : "Nonaktif",
        lastLogin: u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("id-ID") : "Belum pernah login",
        lastLoginAt: u.lastLoginAt,
        mustChangePassword: u.mustChangePassword,
        createdAt: u.createdAt,
      }));
      setUsers(mapped);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [saving, setSaving] = useState(false);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormName("");
    setFormEmail("");
    setFormRole("STAFF_PMB");
    setFormStatus("Aktif");
    setFormPassword("");
    setModalOpen(true);
  };

  const handleOpenEdit = (user: AdminUserItem) => {
    setEditingItem(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    setFormStatus(user.status);
    setFormPassword("");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      swalToast("Nama dan email wajib diisi.", "error");
      return;
    }
    if (!editingItem && formPassword.trim().length < 8) {
      swalToast("Password awal minimal 8 karakter untuk akun baru.", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await saveUserAction(editingItem?.id ?? null, {
        name: formName.trim(),
        email: formEmail.trim(),
        role: formRole as "SUPERADMIN" | "STAFF_PMB" | "CONTENT_WRITER",
        password: formPassword.trim() || "",
        isActive: formStatus === "Aktif",
      });
      if (!res.ok) {
        swalToast(res.message || "Gagal menyimpan akun staf.", "error");
        return;
      }
      setModalOpen(false);
      await loadData();
      swalToast(res.message, "success");
    } catch {
      swalToast("Terjadi kesalahan saat menyimpan akun staf.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUserAction(id);
      if (res.ok) {
        await loadData();
        swalToast(res.message, "success");
      } else {
        swalToast(res.message, "error");
      }
    } catch {
      swalToast("Terjadi kesalahan saat menghapus akun.", "error");
    }
  };

  const toggleStatus = async (id: string) => {
    const u = users.find((x) => x.id === id);
    if (!u) return;
    const nextActive = u.status !== "Aktif";
    try {
      const res = await saveUserAction(id, {
        name: u.name,
        email: u.email,
        role: u.role as "SUPERADMIN" | "STAFF_PMB" | "CONTENT_WRITER",
        password: "",
        isActive: nextActive,
      });
      if (res.ok) {
        await loadData();
        swalToast(nextActive ? "Akun diaktifkan." : "Akun dinonaktifkan.", "success");
      } else {
        swalToast(res.message || "Gagal mengubah status akun.", "error");
      }
    } catch {
      swalToast("Terjadi kesalahan saat mengubah status akun.", "error");
    }
  };

  // Filtered
  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const pg = usePagination(filtered, 10);

  const getRoleBadge = (role: AdminUserItem["role"]) => {
    switch (role) {
      case "SUPERADMIN":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200 flex items-center gap-1 w-fit">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Super Admin
          </span>
        );
      case "STAFF_PMB":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200 flex items-center gap-1 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Staf PMB
          </span>
        );
      case "CONTENT_WRITER":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200 flex items-center gap-1 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Penulis Konten
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-blue-100 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-600 border border-blue-200 uppercase tracking-wider">
              Otoritas & Keamanan
            </span>
            <span className="text-xs text-slate-500">Total: {users.length} Akun Pengguna</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-blue-600" />
            Manajemen Pengguna & Hak Akses Admin
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola akun Super Admin, Staf PMB, dan Penulis Konten beserta hak aksesnya.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          Tambah Pengguna Baru
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-blue-100 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama atau email akun..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-blue-50 border border-blue-100 pl-9 pr-4 py-2 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            aria-label="Saring berdasarkan peran"
            className="bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-400"
          >
            <option value="ALL">Semua Peran</option>
            <option value="SUPERADMIN">Super Admin</option>
            <option value="STAFF_PMB">Staf PMB</option>
            <option value="CONTENT_WRITER">Penulis Konten</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-blue-100">
              <tr>
                <th className="py-4 px-4">Nama Pengguna & Email</th>
                <th className="py-4 px-4">Peran & Otoritas</th>
                <th className="py-4 px-4">Status Akun</th>
                <th className="py-4 px-4">Login Terakhir</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100 text-slate-700">
              {pg.items.map((u) => (
                <tr key={u.id} className="hover:bg-blue-50 transition group">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                      {u.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-0.5">
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
                          ? "bg-blue-100 text-blue-600 border-blue-200 hover:bg-sky-500/30"
                          : "bg-slate-700/40 text-slate-500 border-slate-600 hover:bg-slate-700/60"
                      } ${u.id === "usr-01" ? "cursor-default opacity-80" : ""}`}
                    >
                      {u.status}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-xs font-mono text-slate-500">
                    {u.lastLogin}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition"
                        title="Edit Pengguna"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {u.id !== "usr-01" && (
                        <button
                          onClick={async () => { if (await swalConfirmDelete()) handleDelete(u.id); }}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition"
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
      <div className="bg-white border border-blue-100 p-6 rounded-2xl">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          Keterangan Hak Akses & Matriks Otoritas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 space-y-1.5">
            <p className="font-bold text-blue-600">Super Admin</p>
            <p className="text-slate-700">
              Akses penuh ke semua menu, termasuk mengelola akun pengguna dan menyalakan atau mematikan fitur untuk admin lain.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-50 border border-sky-900/30 space-y-1.5">
            <p className="font-bold text-blue-600">Staf PMB</p>
            <p className="text-slate-700">
              Bawaannya mengelola Akademik serta data pendaftar PMB, termasuk tindak lanjut lewat WhatsApp. Super Admin dapat menambah atau mematikan fitur.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-50 border border-sky-900/30 space-y-1.5">
            <p className="font-bold text-blue-600">Penulis Konten</p>
            <p className="text-slate-700">
              Bawaannya mengelola Berita & Riset serta Pustaka Media. Super Admin dapat menambah atau mematikan fitur.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Create / Edit */}
      {loaded && <Pagination pg={pg} noun="akun" />}
      {!loaded && <LoadingState />}
      {loaded && filtered.length === 0 && (
        <EmptyState
          title={users.length === 0 ? "Belum ada akun staf" : "Tidak ada hasil yang cocok"}
          hint={users.length === 0 ? "Klik tombol di bawah untuk menambahkan data pertama." : "Coba ubah kata kunci pencarian atau filter yang dipakai."}
          actionLabel={users.length === 0 ? "Tambah Akun Staf" : undefined}
          onAction={handleOpenCreate}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-slate-900/50 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="bg-white border border-blue-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-blue-100 bg-blue-50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                {editingItem ? "Edit Hak Akses Pengguna" : "Tambah Pengguna Admin Baru"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-900 p-1 rounded-lg hover:bg-blue-50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Nama Lengkap Petugas *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Budi Santoso, S.Kom."
                  className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Email Akun (@upitra.ac.id) *</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="nama.staff@upitra.ac.id"
                  className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  {editingItem ? "Password Baru (kosongkan bila tidak diganti)" : "Password Awal * (min. 8 karakter)"}
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Peran</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as AdminUserItem["role"])}
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-400"
                  >
                    <option value="STAFF_PMB">Staf PMB</option>
                    <option value="CONTENT_WRITER">Penulis Konten</option>
                    <option value="SUPERADMIN">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Status Akun</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as AdminUserItem["status"])}
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-400"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              {!editingItem && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-600">
                  <p className="font-semibold mb-1">Kata sandi awal:</p>
                  <p>Akun baru memakai kata sandi yang Anda masukkan di atas. Ganti kata sandinya lewat menu ini bila perlu.</p>
                </div>
              )}

              <div className="pt-3 border-t border-blue-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-700 hover:text-slate-900 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-blue-500/20"
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
    </div>
  );
}

