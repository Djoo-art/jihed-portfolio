import { getOrCreateProfile } from "./actions";
import ProfileFormWrapper from "./ProfileFormWrapper";

export default async function AdminProfilePage() {
  const profile = await getOrCreateProfile();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Profile / About</h1>
        <ProfileFormWrapper
          initialData={{
            name: profile.name,
            title: profile.title,
            bio: profile.bio,
            email: profile.email,
            avatarUrl: profile.avatarUrl ?? undefined,
          }}
        />
      </div>
    </div>
  );
}
