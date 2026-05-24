import BlogEditorPage from '@/pages/EditBlog';
export default async function page({params}:{params:Promise<{id: string}>}) {
  const {id} = await params;
  return (
    <BlogEditorPage id={id}/>
  )
}
