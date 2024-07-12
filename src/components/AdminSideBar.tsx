import page from "@/app/(client)/about/page"
import Link from "next/link"

const routes = ['item', 'model', 'category', "brand", "order"]
const AdminSideBar = () => {
  return (
    <nav className="flex gap-2 py-4 px-4 flex-col w-[180px] border-r border-bg-[rgb(164,164,164)]">
      {
        routes.map((route)=>
        <Link href={`/${route}`} className="px-5 rounded-sm  capitalize py-1 hover:bg-red-50 hover:text-red-600 " >{route}</Link>
        )
      }
    </nav>
  )
}

export default AdminSideBar