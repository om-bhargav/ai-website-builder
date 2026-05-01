"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Pencil, Phone, SquarePen, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { AppForm } from "@/components/AppForm/app-form";
import { AppInput } from "@/components/AppForm/app-input";
import { AppTextarea } from "@/components/AppForm/app-textarea";
import { AppSelect } from "@/components/AppForm/app-select";
import { AppSubmit } from "@/components/AppForm/app-submit";

import { personalInfoSchema, ProfileInfo } from "@/schemas/ProfileSchema";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  user: ProfileInfo;
  updateProfile: any;
};
const cities = ["AMRITSAR"];
const countries = ["INDIA"];
export default function PersonalInfoForm({ user,updateProfile }: Props) {
  const [editing, setEditing] = useState(false);

  const form = useForm<ProfileInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      city: user.city,
      country: user.country,
      bio: user.bio,
    },
  });

  const onSubmit = async (values: ProfileInfo) => {
    await updateProfile({values:values});
    setEditing(false);
  };

  const handleCancel = () => {
    form.reset({
      name: user.name,
      phone: user.phone,
      email: user.email,
      city: user.city,
      country: user.country,
      bio: user.bio,
    });

    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="bg-background/30 backdrop-blur border border-white/10 rounded-2xl">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base text-foreground">
            Personal Information
          </CardTitle>

          {!editing && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-2"
              onClick={() => setEditing(true)}
            >
              <SquarePen className="w-4 h-4" />
              Edit
            </Button>
          )}
        </CardHeader>

        <CardContent>
          <AppForm
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-3">
              <AppInput
                name="name"
                label="Full Name"
                icon={User}
                disabled={!editing}
              />

              <AppInput
                name="phone"
                label="Phone"
                icon={Phone}
                disabled={!editing}
              />
            </div>

            <AppInput
              name="email"
              label="Email"
              icon={Mail}
              disabled={!editing}
            />

            <div className="grid md:grid-cols-2 gap-3">
              <AppSelect
                name="city"
                label="City"
                disabled={!editing}
                options={cities.map((city) => ({
                  label: city,
                  value: city,
                }))}
              />

              <AppSelect
                name="country"
                label="Country"
                disabled={!editing}
                options={countries.map((country) => ({
                  label: country,
                  value: country,
                }))}
              />
            </div>

            <AppTextarea
              name="bio"
              label="Bio"
              icon={Pencil}
              disabled={!editing}
            />

            {editing && (
              <div className="flex justify-end gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 px-4 border-white/20"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>

                <AppSubmit
                  loading={form.formState.isSubmitting}
                  text="Save"
                />
              </div>
            )}
          </AppForm>
        </CardContent>
      </Card>
    </motion.div>
  );
}
export function PersonalInfoFormSkeleton() {
  return (
    <Card className="bg-background/30 backdrop-blur border border-white/10 rounded-2xl">
      <CardHeader className="pb-3">
        <Skeleton className="h-5 w-40 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <Skeleton className="h-10 w-full rounded-md" />

        <div className="grid md:grid-cols-2 gap-3">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <Skeleton className="h-[90px] w-full rounded-md" />

        <div className="flex justify-end gap-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
