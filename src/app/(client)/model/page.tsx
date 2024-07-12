import { getAllModel } from "@/actions/model.actions";
import ClientPage from "./ClientPage";

const Page = async () => {
  const {models, isFetched , isErr }= await getAllModel();
  console.log("models", models);
  
  return <ClientPage models={models} isFetched={isFetched}/>;
};

export default Page;
