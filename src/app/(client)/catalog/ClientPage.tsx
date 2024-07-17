"use client";
import { IItem, IOptional } from "@/interface";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
interface IClientProps {
  items: IItem[];
  models: IOptional[];
  brands: IOptional[];
  categories: IOptional[];
}
const clientPage = ({ items, models, brands, categories }: IClientProps) => {
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const category = searchParams.get("category");
  const [filterItems, setFilterItems] = useState<IItem[]>(items);
  const [selectedBrand, setSelectedBrand] = useState<string[]>(
    brand ? [brand] : []
  );
  const [selectedCatagory, setselectedCatagory] = useState<string>(
    category ? category : ""
  );
  // const [selectedBrand, setSelectedBrand] = useState<string[]>();
  const fuse = new Fuse(filterItems, {
    keys: [
      "part_number",
      "description",
      "model.name",
      "brand.name",
      "category.name",
    ],
  });

  // what is the thing is that based on the selected brand and that thing i have to get it if it is in catagory and  from that cata
  const handleCheckboxChangeBrand = (brand: string) => {
    setSelectedBrand((prevbrand) => {
      if (prevbrand.includes(brand)) {
        return prevbrand.filter((id) => id !== brand);
      } else {
        return [...prevbrand, brand];
      }
    });
  };

  const getFilteredItems = () => {
    let fli: IItem[] = items;
    if (selectedCatagory) {
      console.log("catagory selected");
      fli = fli.filter((item) => item?.category?.name === selectedCatagory);

      if (selectedBrand.length > 0) {
        fli = fli.filter((item) =>
          selectedBrand.some((slB) => slB === item.brand.name)
        );
      } else {
        if (selectedBrand.length > 0) {
          fli = fli.filter((item) =>
            selectedBrand.some((slB) => slB === item.brand.name)
          );
        }
      }
    }

    return fli;
  };

  const handleChangeCategoryFilter = (cat: string) => {
    setselectedCatagory(cat);
  };

  return (
    <div className=" flex  justify-center px-14 py-6 w-full gap-[100px]">
      <div className="w-[24%] border border-green-400">
        <p className="text-xl semi-bold">filters</p>
        <hr />
        <p>catagories</p>
        {categories.length > 0 &&
          categories.map((cat) => (
            <p
              className={`${
                selectedCatagory === cat.name ? "text-black" : "text-gray-500"
              }`}
              onClick={() => handleChangeCategoryFilter(cat.name)}>
              {cat.name}
            </p>
          ))}

        <hr />

        <p>brands</p>
        {brands.length > 0 &&
          brands.map((brand) => (
            <div className="">
              <input
                type="checkbox"
                checked={selectedBrand.includes(brand.name)}
                onChange={() => handleCheckboxChangeBrand(brand.name)}
              />
              <label>{brand.name}</label>
            </div>
          ))}
      </div>
      <div className="flex-6 w-[70%] border border-green-500">
        <p> {"product areas"} </p>
        <p>
          {/* {model}, {category}, S:{selectedCatagory},{brand} */}

          {getFilteredItems().map((item) => (
            <div className="grid grid-cols-3 w-full  border  border-gray-100 rounded-sm mb-3 px-3 py-3 ">
              <img
                src={item.images[0]}
                className="w-[200px] h-[150px] object-cover bg-center"
              />
              <div>
                <p className="py-1 text-black font-semibold">{item.part_number}</p>
                <p>category: {item.category.name}</p>
                <p>brand: {item.brand.name}</p>
                <p>model: {item.model.name}</p>
              </div>

              <div className="flex flex-col w-[70%] gap-4">
                <p className="text-2xl text-black font-semibold ">{item.unit_price} <span className="text-base font-normal">Eth birr</span> </p>
                <button className="bg-red-500 px-2 rounded-sm  py-2">Add to cart</button>
                <button>Add to whishlist</button>
              </div>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export default clientPage;
