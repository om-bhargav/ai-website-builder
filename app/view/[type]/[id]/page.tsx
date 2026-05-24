import ViewWebsite from "@/pages/ViewWebsite";
export default async function page({
  params,
}: {
  params: Promise<{ id: string; type: "website" | "template" }>;
}) {
  const { id, type } = await params;
  return <ViewWebsite id={id} type={type} />;
}
