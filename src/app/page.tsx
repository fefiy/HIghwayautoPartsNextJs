import { getAllBrand } from "@/actions/brand.actions";
import { getAllCategory } from "@/actions/category.actions";
import { getAllModel } from "@/actions/model.actions";
import SearchHomePage from "@/components/SearchHomePage";

const Home = async () => {
  const { models } = await getAllModel();
  const { brands } = await getAllBrand();
  const { categories } = await getAllCategory();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <div className="flex items-center flex-col w-full gap-1 border mx-auto justify-center">
        <h1 className="capitalize text-5xl font-bold tracking-[4px]">
          Find parts for your car
        </h1>
        <p className="text-xl">
          Over hundreds of brands and thousands of parts
        </p>
        <SearchHomePage models={models} brands={brands} categories={categories} />
      </div>
    </main>
  );
};

export default Home;
