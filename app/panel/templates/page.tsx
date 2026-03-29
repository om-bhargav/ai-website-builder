import { Button } from '@/components/ui/button'
import React from 'react'
import TemplateCard from './_components/TemplateCard'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function page() {
  return (
    <div className='grid gap-5 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-semibold'>Manage Templates</h2>
        <div className='flex gap-3 items-center'>
        <div className='flex items-center gap-2'>
          <Input placeholder='Search Templates'/>
          <Button variant={"secondary"}><Search/></Button>
        </div>
        <Button>+ Create Template</Button>
        </div>
      </div>
      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {
          Array(10).fill(null).map((_,index)=>{
            return <TemplateCard index={index} key={index}/>
          })
        }
      </div>
    </div>
  )
}
