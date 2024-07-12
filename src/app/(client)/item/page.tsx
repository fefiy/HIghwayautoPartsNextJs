import { getAllBrand } from '@/actions/brand.actions'
import { getAllCategory } from '@/actions/category.actions'
import { getAllModel } from '@/actions/model.actions'
import ClientPage from './ClientPage'
import { getAllItem } from '@/actions/item.actions'
const page = async() => {
  const {items } = await getAllItem()
  const {categories} = await getAllCategory()
  
  return (
    <ClientPage items={items} />
  )
}

export default page