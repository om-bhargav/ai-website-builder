import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import GoBack from "../GoBack";

export default function GoBackButton() {
  const goBack = GoBack();
  return (
    <Button onClick={goBack} className="self-start text-white! min-w-[100px] bg-gradient-to-br from-indigo-500 to-purple-900 hover:scale-103 transition cursor-pointer rounded-lg text-black font-semibold px-4! p-2!">
      <ArrowLeft /> Go Back
    </Button>
  );
}
