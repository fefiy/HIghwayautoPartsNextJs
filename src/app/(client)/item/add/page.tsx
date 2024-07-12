import { getAllBrand } from '@/actions/brand.actions'
import { getAllCategory } from '@/actions/category.actions'
import { getAllModel } from '@/actions/model.actions'
import ClientPage from './ClientPage'
const page = async() => {
  const {models } = await getAllModel()
  const {categories} = await getAllCategory()
  const {brands} = await getAllBrand()
  return (
    <ClientPage models={models} brands={brands} categories={categories} />
  )
}

export default page