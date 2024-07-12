"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { editModel } from "@/actions/model.actions";
import { IoClose } from "react-icons/io5";
import ButtonLoading from "@/components/ButtonLoading";
import { IOptional } from "@/interface";
import {toast } from 'react-toastify';
const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
});

interface IEditProps {
  closeModal: () => void;
  model: IOptional;
}

const EditModelModal= ({ closeModal, model }: IEditProps) => {
  const { pending } = useFormStatus();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (model) {
      // Pre-fill form fields with employee details
      setValue("name", model.name);
    }
  }, [model]);
  const onSubmit = async (data: any) => {
    const validatedData = schema.parse(data);
    console.log("validate date ", validatedData);
    const { msg, isSuccess } = await editModel({
      name: data.name,
      id: model?.id,
    });
    if (isSuccess) {
      toast.success(msg);
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
              {pending ? <ButtonLoading /> : "Edit model"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModelModal;
