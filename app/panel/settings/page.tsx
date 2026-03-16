"use client";

import fetcher from "@/lib/fetcher";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { PersonalInfoFormSkeleton } from "./_components/PersonalInfoForm";
import { ProfilePhotoCardSkeleton } from "./_components/ProfilePhotoCard";
const PersonalInfoForm = dynamic(() => import("./_components/PersonalInfoForm"), { ssr: false });
const ProfilePhotoCard = dynamic(() => import("./_components/ProfilePhotoCard"), { ssr: false });

export default function ProfilePage() {
  const {data,isLoading,isValidating,error} = useSWR("/api/user/profile",fetcher);
  const loading = isLoading || isValidating;
  const user = data?.data ?? {};
  return (
    <div className="space-y-5 px-3 md:p-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3 mx-auto">
        {/* Left */}
        <div className="lg:col-span-2">
          {
            loading ? <PersonalInfoFormSkeleton/>:<PersonalInfoForm user={user} />
          }
        </div>

        {/* Right */}
        <div>
          {
            loading ? <ProfilePhotoCardSkeleton/>:<ProfilePhotoCard user={user}/>
          }
          
        </div>
      </div>
    </div>
  );
}
