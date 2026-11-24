"use client";

import { ChevronLeft, Eye, EyeOff, Pencil, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { updateProfileAction } from "@/features/auth/actions";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export interface ProfileSidebarUser {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
  phone?: string | null;
  dob?: string | null;
}

interface ProfileSidebarProps {
  open: boolean;
  onClose: () => void;
  user: ProfileSidebarUser;
  onUpdated?: () => void;
}

export function ProfileSidebar({
  open,
  onClose,
  user,
  onUpdated,
}: ProfileSidebarProps) {
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [dob, setDob] = useState(user.dob ?? "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRe, setShowRe] = useState(false);

  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{
    kind: "ok" | "err";
    text: string;
  } | null>(null);

  useEffect(() => {
    setName(user.name);
    setPhone(user.phone ?? "");
    setDob(user.dob ?? "");
  }, [user]);

  useEffect(() => {
    if (!open) {
      setEditing(false);
      setNotice(null);
      setCurrentPassword("");
      setNewPassword("");
      setRePassword("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const initials = (user.name || "U")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNotice(null);
    setSaving(true);

    try {
      const res = await updateProfileAction({ name, phone, dob });
      if (!res.ok) {
        setNotice({ kind: "err", text: res.message });
        return;
      }

      const changingPassword = Boolean(currentPassword || newPassword || rePassword);
      if (changingPassword) {
        if (!currentPassword || !newPassword || !rePassword) {
          setNotice({
            kind: "err",
            text: "Isi Current Password, New Password, dan New Re-Password.",
          });
          return;
        }
        if (newPassword !== rePassword) {
          setNotice({
            kind: "err",
            text: "New Password dan New Re-Password tidak sama.",
          });
          return;
        }
        const pwRes = await authClient.changePassword({
          currentPassword,
          newPassword,
          revokeOtherSessions: false,
        });
        if (pwRes.error) {
          setNotice({
            kind: "err",
            text: pwRes.error.message ?? "Gagal mengganti password.",
          });
          return;
        }
        setCurrentPassword("");
        setNewPassword("");
        setRePassword("");
      }

      onUpdated?.();
      setNotice({ kind: "ok", text: res.message });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <aside
        className={`flex h-full w-full flex-col bg-white shadow-xl transition-all ${
          editing ? "max-w-2xl" : "max-w-sm"
        }`}
      >
        {!editing ? (
          <>
            <div className="relative h-36 shrink-0 bg-linear-to-b from-sky-500 to-sky-400 p-5 text-white">
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup profil"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/80 text-white hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="absolute -bottom-11 left-6 flex w-[calc(100%-3rem)] items-end justify-between">
                <Avatar className="h-22 w-22 border-4 border-white shadow">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />
                  <AvatarFallback className="bg-sky-100 text-lg font-semibold text-sky-700">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <button
                  type="button"
                  onClick={() => {
                    setNotice(null);
                    setEditing(true);
                  }}
                  aria-label="Edit profil"
                  className="mb-12 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sky-600 shadow hover:bg-sky-50"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-14 flex-1 space-y-6 overflow-y-auto px-6 pb-8">
              <h2 className="text-xl font-semibold text-slate-900">
                {user.name}
              </h2>

              {notice?.kind === "ok" && (
                <p className="rounded-md bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700">
                  {notice.text}
                </p>
              )}

              <div className="space-y-4 border-t border-slate-100 pt-5 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="mt-0.5 font-medium text-sky-600">{user.email}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <p className="mt-0.5 font-medium text-slate-800">
                    {user.phone || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Date of Birth</p>
                  <p className="mt-0.5 font-medium text-slate-800">
                    {user.dob || "-"}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Change Password
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="text-xs font-medium text-sky-600 hover:underline"
                  >
                    Ubah
                  </button>
                </div>
                <p className="mt-3 text-xs text-slate-400">Current Password</p>
                <p className="mt-1 text-xs tracking-widest text-slate-600">
                  ••••••••••••
                </p>
              </div>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col overflow-y-auto bg-slate-50/70 p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setNotice(null);
                  setEditing(false);
                }}
                className="inline-flex items-center gap-1.5 text-base font-semibold text-slate-900 hover:text-sky-600"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup profil"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200/70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <div className="relative mb-6 inline-block">
                <Avatar className="h-20 w-20 border-2 border-slate-100">
                  <AvatarImage src={user.image ?? undefined} alt={name} />
                  <AvatarFallback className="bg-sky-100 text-lg font-semibold text-sky-700">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute right-0 bottom-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-white shadow">
                  <Pencil className="h-3 w-3" />
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="pf-name">Name</Label>
                  <Input
                    id="pf-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="pf-phone">Contact Info</Label>
                  <Input
                    id="pf-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62..."
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="pf-email">Email Address</Label>
                  <Input
                    id="pf-email"
                    value={user.email}
                    disabled
                    className="bg-slate-100 text-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="pf-dob">Date of Birth</Label>
                  <Input
                    id="pf-dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <h3 className="mb-4 border-b border-slate-100 pb-3 text-sm font-semibold text-slate-900">
                Change Password
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="pf-cur-pw">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="pf-cur-pw"
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((v) => !v)}
                      className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrent ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="pf-new-pw">New Password</Label>
                  <div className="relative">
                    <Input
                      id="pf-new-pw"
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      className="pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNew ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="pf-re-pw">New Re-Password</Label>
                  <div className="relative">
                    <Input
                      id="pf-re-pw"
                      type={showRe ? "text" : "password"}
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                      placeholder="New Re-Password"
                      className="pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRe((v) => !v)}
                      className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showRe ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {notice && (
              <p
                className={`mt-4 rounded-md px-3 py-2 text-xs font-medium ${
                  notice.kind === "err"
                    ? "bg-red-50 text-red-600"
                    : "bg-sky-50 text-sky-700"
                }`}
              >
                {notice.text}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-sky-500 text-white hover:bg-sky-600"
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}