"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { addModel } from "@/actions/model.actions";
import { IoClose } from "react-icons/io5";
import ButtonLoading from "@/components/ButtonLoading";
import { toast } from 'react-toastify';
import { addBrand } from "@/actions/brand.actions";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
});

const AddBrandModal = ({ closeModal }: { closeModal: () => void }) => {
  const {pending} = useFormStatus()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const validatedData = schema.parse(data);
    console.log("validate date ", validatedData);
   const {isSuccess , msg} =  await addBrand(validatedData);
   if (isSuccess) {
    toast.success("model updates succefuly");
    closeModal();
  }
  };

  return (
    <div className="fixed z-[1000] top-0 left-0 overflow-auto right-0  bottom-0  w-full bg-[#00000070]  ">
      <div className="bg-[rgb(250,251,254)]  w-full lg:w-[40%]  border-2 float-end relative">
        <div
          className="absolute text-gray-800 border px-1 rounded-md py-1 top-6 right-6"
          onClick={closeModal}>
          <IoClose />
        </div>
        <div className="min-h-screen px-12 py-14 m-auto w-full">
          <form
            className="transition-all  duration-300"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-1 flex-col mb-4">
              <label className="text-base capitalize">Name</label>
              <input
                className="border border-gray-400 px-3 py-2 rounded-md focus:outline-none"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red text-sm">{"name is reqired"}</span>
              )}
            </div>
            <button
             className="bg-[rgb(9,44,76)] text-white"
              type="submit"
              disabled={pending}>
               {pending ? <ButtonLoading /> :"Add Category" } 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrandModal;
