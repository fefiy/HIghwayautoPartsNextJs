"use client";
import { IOptional } from "@/interface";
import React, { ChangeEvent, useState } from "react";

interface IProps {
  models: IOptional[];
  brands: IOptional[];
}

const SearchHomePage = ({ models, brands }: IProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    undefined
  );
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    undefined
  );

  const onchangeBrand = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedModel(undefined); // Reset selected model when brand changes
  };

  const onChangeModel = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };


  const onClickSearch = ()=>{
    // i want to do go to the router / catalog and pass the selected thing inside the router like reqct Navlink 
  }
  
  return (
    <div>
      <form className="flex gap-8">
        <select
          className="border border-gray-200 px-4 py-2 focus:outline-none rounded-sm "
          onChange={onchangeBrand}
          value={selectedBrand}>
          <option value="" selected={false}>
            Select brand
          </option>
          {brands.length > 0 &&
            brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
        </select>
        <select
          className="border border-gray-200 px-4 py-2 focus:outline-none rounded-sm "
          onChange={onChangeModel}
          value={selectedModel}
          disabled={!selectedBrand} // Disable if no brand is selected
        >
          <option value="" selected={false}>
            Select model
          </option>
          {models.length > 0 &&
            models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
        </select>
        <button onClick={onClickSearch}  className=" bg-red-600 text-white py-2 px-3 rounded-sm">Search</button>
      </form>
    </div>
  );
};

export default SearchHomePage;
