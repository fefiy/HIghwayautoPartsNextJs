"use client";
import { z } from "zod";
import { ItemSchema } from "@/valadation_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Select from "react-select";
import { IOptional } from "@/interface";
import { useFormStatus } from "react-dom";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";
import { addItem } from "@/actions/item.actions";
interface Iprops {
  models: IOptional[];
  categories: IOptional[];
  brands: IOptional[];
}
const ClientPage = ({ models, categories, brands }: Iprops) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { pending } = useFormStatus();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      part_number: "",
      unit_price: 0,
      quantity: 0,
    },
  });
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };
  const handleDelete = (index: number) => {
    const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newSelectedFiles);
  };

//   const handleCancel = () => {
//     setSelectedFiles([]);
//   };
  
  const onSubmit = async(data: any) => {
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append("files", file));
    await addItem({formdata:formData, itemInfo:data})
  };

  return (   
    <div className=" w-full">
      <div className="bg-[rgb(250,251,254)] w-full  relative">
        <div className="min-h-[99vh] px-12 py-14 m-auto w-full">
          <div className="flex pb-4 justify-between gap-4 flex-col-reverse md:flex-row items-center mb-7">
            <div className="flex items-center gap-3"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex gap-1 flex-col">
                <label className="text-base capitalize"> part number </label>
                <input
                  className="border border-gray-300 px-3 py-[6px] rounded-md focus:outline-none"
                  {...register("part_number", {
                    required: "part number is required",
                  })}
                />
                {errors.part_number && (
                  <span className="text-red text-sm">
                    {errors.part_number.message}
                  </span>
                )}
              </div>
              <div className="flex gap-1 flex-col">
                <label className="text-base capitalize"> Unit Price</label>
                <input
                  className="border border-gray-300 px-3 py-[6px] rounded-md focus:outline-none"
                  {...register("unit_price", { valueAsNumber: true })}
                />
                {errors.unit_price && (
                  <span className="text-red text-sm">
                    {errors.unit_price.message}
                  </span>
                )}
              </div>

              <div className="flex gap-1 flex-col">
                <label className="text-base capitalize"> quantity </label>
                <input
                  className="border border-gray-300 px-3 py-[6px] rounded-md focus:outline-none"
                  {...register("quantity", { valueAsNumber: true })}
                />
                {errors.quantity && (
                  <span className="text-red text-sm">
                    {errors.quantity.message}
                  </span>
                )}
              </div>

              <div className="flex gap-1 flex-col">
                <label className="text-base capitalize"> select Model </label>
                <Select
                  className="focus:outline-none"
                  onChange={(select) => {
                    select && setValue("model_id", parseInt(select.value));
                  }}
                  options={
                    models.length > 0
                      ? models.map((model) => ({
                          label: model.name,
                          value: model.id.toString(),
                        }))
                      : []
                  }
                />
                {errors.model_id && (
                  <span className="text-red text-sm">
                    {errors.model_id.message}
                  </span>
                )}
              </div>
              <div className="flex gap-1 flex-col">
                <label className="text-base capitalize"> select brand </label>
                <Select
                  className="focus:outline-none"
                  onChange={(select) => {
                    select && setValue("brand_id", parseInt(select.value));
                  }}
                  options={
                    brands.length > 0
                      ? brands.map((brand) => ({
                          label: brand.name,
                          value: brand.id.toString(),
                        }))
                      : []
                  }
                />

                {errors.brand_id && (
                  <span className="text-red text-sm">
                    {errors.brand_id.message}
                  </span>
                )}
              </div>

              <div className="flex gap-1 flex-col">
                <label className="text-base capitalize"> select category</label>
                <Select
                  className="focus:outline-none"
                  onChange={(select) => {
                    select && setValue("category_id", parseInt(select.value));
                  }}
                  options={
                    categories.length > 0
                      ? categories.map((cat) => ({
                          label: cat.name,
                          value: cat.id.toString(),
                        }))
                      : []
                  }
                />

                {errors.category_id && (
                  <span className="text-red text-sm">
                    {errors.category_id.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1 flex-col mb-3 ">
                <label className="text-base capitalize"> description </label>
                <textarea
                  className="border border-gray-300 px-3 py-[6px] rounded-md focus:outline-none"
                  {...register("description")}
                ></textarea>
                {errors.description && (
                  <span className="text-red text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>

            <input
              type="file"
              id="fileInput"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              className="bg-blue-400 px-2 py-2 text-white text-sm rounded-md "
              htmlFor="fileInput">
              Choose Files
            </label>

            <div>
              {selectedFiles.length > 0 && (
                <>
                  <ul className="flex gap-4 mt-2">
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={100}
                          height={100}
                          className="border object-contain rounded-md border-gray-100"
                        />
                        <button
                          onClick={() => handleDelete(index)}
                          className="absolute top-0 left-0">
                          <TiDelete className="text-red-600" size={20} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <button
              className="bg-[rgb(9,44,76)] text-white"
              type="submit"
              disabled={pending}>
              {pending ? "loading ..." : "Add Item"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
