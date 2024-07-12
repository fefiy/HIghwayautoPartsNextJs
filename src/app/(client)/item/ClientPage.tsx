import { IItem } from '@/interface'
import React from 'react'
interface IProps{
  items:IItem[]
}
const ClientPage = ({items}:IProps) => {
  console.log(items)
  return (
    <>
    {
      items.length > 0 && 
      items.map((item)=>
      <div key={item.part_number} className='flex flex-col border'>
        <p>
          {item.part_number}
        </p>
        {
          item.images.length > 0 && 
          item.images.map((img)=>
          <img key={img} src={`${img}`} />
          )
        }
      </div>
      )
    }
    </>
  )
}

export default ClientPage