"use client";

import ProfileForm from "@/components/ProfileForm";
import { updateProfile, type ProfileInput } from "./actions";

export default function ProfileFormWrapper({
  initialData,
}: {
  initialData: ProfileInput;
}) {
  return <ProfileForm initialData={initialData} onSubmit={updateProfile} />;
}
