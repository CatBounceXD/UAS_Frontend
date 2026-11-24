"use client";

import { ChevronLeft, Eye, EyeOff, Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { updateProfileAction } from "@/features/auth/actions";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export interface ProfileUser {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
  phone?: string | null;
  dob?: string | null;
}

interface ProfileViewProps {
  user: ProfileUser;
}

export function ProfileView({ user }: ProfileViewProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [dob, setDob] = useState(user.dob ?? "");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.image ?? null,
  );

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

  const { refetch } = authClient.useSession();

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const initials = (user.name || "U")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setNotice({
        kind: "err",
        text: "Format must be JPG, PNG, or WebP.",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setNotice({ kind: "err", text: "Image max 2MB." });
      return;
    }

    setNotice(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNotice(null);
    setSaving(true);

    try {
      let uploadedImageUrl: string | undefined;

      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);

        const uploadRes = await fetch("/api/profile/avatar", {
          method: "POST",
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();

        if (!uploadRes.ok) {
          setNotice({
            kind: "err",
            text: uploadJson.error || "Failed to Upload Profile Picture.",
          });
          return;
        }

        uploadedImageUrl = uploadJson.url;
      }

      const res = await updateProfileAction({
        name,
        phone,
        dob,
        ...(uploadedImageUrl !== undefined ? { image: uploadedImageUrl } : {}),
      });

      if (!res.ok) {
        setNotice({ kind: "err", text: res.message });
        return;
      }

      const changingPassword = Boolean(
        currentPassword || newPassword || rePassword,
      );
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

      setSelectedFile(null);
      await refetch();
      router.refresh();
      setNotice({ kind: "ok", text: res.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-lg font-semibold text-slate-900 hover:text-sky-600"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Edit Profile</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Ringkasan Profil di Kiri */}
        <aside className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs lg:col-span-4">
          <div className="relative h-28 bg-linear-to-b from-sky-500 to-sky-400" />
          <div className="px-6 pb-6">
            <div className="-mt-11 mb-4 flex items-end justify-between">
              <Avatar className="h-22 w-22 border-4 border-white shadow">
                <AvatarImage
                  src={previewUrl ?? undefined}
                  alt={user.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-sky-100 text-lg font-semibold text-sky-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Ubah foto profil"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              {user.name}
            </h2>

            <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm">
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
          </div>
        </aside>

        {/* Form Edit Profile & Change Password di Kanan */}
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-8">
          <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <div className="mb-6 flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group relative inline-block rounded-full focus:outline-none"
                title="Klik untuk mengganti foto profil"
              >
                <Avatar className="h-20 w-20 border-2 border-slate-100 transition group-hover:opacity-90">
                  <AvatarImage
                    src={previewUrl ?? undefined}
                    alt={name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-sky-100 text-lg font-semibold text-sky-700">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute right-0 bottom-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-white shadow transition group-hover:bg-sky-600">
                  <Pencil className="h-3 w-3" />
                </span>
              </button>

              <div className="text-xs text-slate-500">
                <p className="font-medium text-2xl text-slate-700">{name}</p>
                <p>Profie Photo (JPG, PNG, WebP, max. 2MB).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="profile-name">Name</Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-phone">Contact Info</Label>
                <Input
                  id="profile-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+62..."
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-email">Email Address</Label>
                <Input
                  id="profile-email"
                  value={user.email}
                  disabled
                  className="bg-slate-100 text-slate-500"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-dob">Date of Birth</Label>
                <Input
                  id="profile-dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <h3 className="mb-4 border-b border-slate-100 pb-3 text-sm font-semibold text-slate-900">
              Change Password
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="profile-cur-pw">Current Password</Label>
                <div className="relative">
                  <Input
                    id="profile-cur-pw"
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
                <Label htmlFor="profile-new-pw">New Password</Label>
                <div className="relative">
                  <Input
                    id="profile-new-pw"
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
                <Label htmlFor="profile-re-pw">New Re-Password</Label>
                <div className="relative">
                  <Input
                    id="profile-re-pw"
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
              className={`rounded-md px-3 py-2 text-xs font-medium ${
                notice.kind === "err"
                  ? "bg-red-50 text-red-600"
                  : "bg-sky-50 text-sky-700"
              }`}
            >
              {notice.text}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              nativeButton={false}
              render={<Link href="/dashboard">Cancel</Link>}
            />
            <Button
              type="submit"
              disabled={saving}
              className="bg-sky-500 text-white hover:bg-sky-600"
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
