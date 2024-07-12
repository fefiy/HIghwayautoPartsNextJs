import { getAllModel } from "@/actions/model.actions";
import ClientPage from "./ClientPage";
import { getAllCategory } from "@/actions/category.actions";
import { getAllBrand } from "@/actions/brand.actions";
const Page = async () => {
  const {brands, isFetched , isErr }= await getAllBrand();
  console.log("categories", brands);
  return <ClientPage brands={brands} isFetched={isFetched}/>;
};

export default Page;
