"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IOptional } from "@/interface";

interface IProps {
  models: IOptional[];
  brands: IOptional[];
  categories: IOptional[];
}

const SearchHomePage = ({ models, brands, categories }: IProps) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    undefined
  );
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    undefined
  );
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onchangeBrand = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedModel(undefined); // Reset selected model when brand changes
  };

  const onChangeModel = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const onClickSearch = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const query = new URLSearchParams();
    if (selectedBrand) query.append("brand", selectedBrand);
    if (selectedModel) query.append("model", selectedModel);
    if (selectedCategory) query.append("category", selectedCategory);
    router.push(`/catalog?${query.toString()}`);
  };

  if (!isClient) {
    // Render a placeholder or loading state on the server
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form className="flex gap-8">
        <select
          className="border border-gray-200 px-4 py-2 focus:outline-none rounded-sm"
          onChange={onChangeCategory}
          value={selectedCategory || ""}
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.length > 0 &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
        </select>
        <select
          className="border border-gray-200 px-4 py-2 focus:outline-none rounded-sm"
          onChange={onchangeBrand}
          value={selectedBrand || ""}
          disabled={!selectedCategory}
        >
          <option value="" disabled>
            Select brand
          </option>
          {brands.length > 0 &&
            brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
        </select>
        <select
          className="border border-gray-200 px-4 py-2 focus:outline-none rounded-sm"
          onChange={onChangeModel}
          value={selectedModel || ""}
          disabled={!selectedBrand} // Disable if no brand is selected
        >
          <option value="" disabled>
            Select model
          </option>
          {models.length > 0 &&
            models.map((model) => (
              <option key={model.id} value={model.name}>
                {model.name}
              </option>
            ))}
        </select>
        <button
          disabled={!selectedBrand || !selectedModel}
          onClick={onClickSearch}
          className="bg-red-600 disabled:bg-red-200 text-white py-2 px-3 rounded-sm"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchHomePage;
