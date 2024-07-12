import { getAllModel } from "@/actions/model.actions";
import ClientPage from "./ClientPage";
import { getAllCategory } from "@/actions/category.actions";
const Page = async () => {
  const {categories, isFetched , isErr }= await getAllCategory();
  console.log("categories", categories);
  return <ClientPage catagories={categories} isFetched={isFetched}/>;
};

export default Page;
