import {
  ReactFlowProvider
} from "@xyflow/react";
import Roadmap from "@/pages/Roadmap";
interface Props{
  params: Promise<{id: string}>
}
export default async function Page({params}:Props) {
  const {id} = await params;
  return (
    <ReactFlowProvider>
      <Roadmap id={id}/>
    </ReactFlowProvider>
  );
}
