import Editor from "@/pages/Editor";
export default async function page({
  params,
}: {
  params: Promise<{ id: string; type: "website" | "template" }>;
}) {
  const { id, type } = await params;
  return <Editor id={id} type={type} />;
}
