"use client";

import fetcher from "@/lib/fetcher";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { PersonalInfoFormSkeleton } from "./_components/PersonalInfoForm";
import { ProfilePhotoCardSkeleton } from "./_components/ProfilePhotoCard";
import { ProfileInfo } from "@/schemas/ProfileSchema";
import axios from "axios";
const PersonalInfoForm = dynamic(() => import("./_components/PersonalInfoForm"), { ssr: false });
const ProfilePhotoCard = dynamic(() => import("./_components/ProfilePhotoCard"), { ssr: false });
export type UpdateProfilePayload = {
  values: ProfileInfo;
  image?: File | null;
  removeImage?: boolean;
};
export default function ProfilePage() {
  const { data, isLoading, error, mutate } = useSWR("/api/user/profile", fetcher);
  const loading = isLoading;
  const user = data?.data ?? {};

  async function updateUserProfile({ values, image, removeImage = false }: UpdateProfilePayload) {
    const formData = new FormData();
    if (values?.name) {
      formData.append("name", values?.name);
    }
    if (values?.phone) {
      formData.append("phone", values?.phone);
    }
    if (values?.email) {
      formData.append("email", values?.email);
    }
    if (values?.city) {
      formData.append("city", values?.city);
    }
    if (values?.country) {
      formData.append("country", values?.country);
    }
    if (values?.bio) {
      formData.append("bio", values?.bio);
    }

    if (image) {
      formData.append("image", image);
    }

    if (removeImage) {
      formData.append("removeImage", "true");
    }

    const { data } = await axios.put("/api/user/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    mutate();
    return data;
  }
  return (
    <div className="space-y-5 px-3 md:p-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3 mx-auto">
        {/* Left */}
        <div className="lg:col-span-2">
          {loading ? (
            <PersonalInfoFormSkeleton />
          ) : (
            <PersonalInfoForm updateProfile={updateUserProfile} user={user} />
          )}
        </div>

        {/* Right */}
        <div>
          {loading ? (
            <ProfilePhotoCardSkeleton />
          ) : (
            <ProfilePhotoCard updateProfile={updateUserProfile} user={user} />
          )}
        </div>
      </div>
    </div>
  );
}
