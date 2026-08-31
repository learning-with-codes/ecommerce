"use client";

import { useState } from "react";
import { Profile } from "@/types/dashboard";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, Calendar, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserProfileCard({ initialProfile }: { initialProfile: Profile }) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [fullName, setFullName] = useState(initialProfile.full_name || "");
  const [saved, setSaved] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const supabase = createClient();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: profile.id,
        full_name: fullName,
        email: profile.email,
        updated_at: new Date().toISOString(),
      });

    if (!error) {
      setProfile((prev) => ({ ...prev, full_name: fullName }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setIsUpdating(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xl">
          {profile.full_name?.charAt(0) || profile.email?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-neutral-900 truncate">
            {profile.full_name || "Verified Collector"}
          </h2>
          <p className="text-xs text-neutral-400 truncate">{profile.email}</p>
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-600">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" /> Account Status
          </span>
          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
            Active Member
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 text-neutral-500">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" /> Member Since
          </span>
          <span className="font-medium text-neutral-700">
            {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : "2026"}
          </span>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="pt-2 space-y-3">
        <div className="space-y-1">
          <Label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
            Display Name
          </Label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="text-xs bg-neutral-50 border-neutral-200 rounded-xl"
            placeholder="Your full name"
          />
        </div>
        <Button
          type="submit"
          disabled={isUpdating}
          className="w-full py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl"
        >
          {saved ? (
            <span className="flex items-center gap-1 text-emerald-400">
              <Check className="w-3.5 h-3.5" /> Changes Saved
            </span>
          ) : isUpdating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
}