"use client";

import { RoadmapInput } from "@/schemas/roadmapSchema";
import axios from "axios";
import toast from "react-hot-toast";
import { mutate } from "swr";

type RoadmapWithOptionalId =
  Partial<Pick<RoadmapInput, "id">> &
  Omit<RoadmapInput, "id">;

export async function createRoadmap(values: RoadmapWithOptionalId) {
  try {
    const { data: response } = await axios.post(
      "/api/user/roadmaps",
      values
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    toast.success(response.message);

    await mutate("/api/user/roadmaps");

    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
}

export async function updateRoadmap(values: RoadmapInput) {
  try {
    const { data: response } = await axios.put(
      `/api/user/roadmaps/${values.id}`,
      values
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    toast.success(response.message);

    await mutate("/api/user/roadmaps");

    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
}

export async function deleteRoadmap(id: string) {
  try {
    const { data: response } = await axios.delete(
      `/api/user/roadmaps/${id}`
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    toast.success(response.message);

    await mutate("/api/user/roadmaps");

    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
}