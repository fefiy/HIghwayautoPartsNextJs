"use client";
import React, { useState } from "react";
import { IOptional } from "@/interface";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { deleteModel } from "@/actions/model.actions";
import AddModelModal from "@/components/AddModelModal";
import EditModelModal from "@/components/EditModelModal";
import Button from "@/components/Button";
const ClientPage = ({ models, isFetched}: { models: IOptional[], isFetched?:boolean }) => {
  let pending =  true
  const [openAddModel, setOpenAddModel] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState<IOptional>();
  const closeModal = () => {
    setOpenAddModel(false);
  };

  const openModal = () => {
    setOpenAddModel(true);
  };

  const handleModelUpdate = (model: IOptional) => {
    setSelectedModel(model);
    setOpenEditModal(true);
  };
  const handleDelete = async (id: number) => {
    await deleteModel({ id });
  };

 if(pending && !isFetched){
  return <div>
    Loading ....
  </div>
 }

  return (
    <section className="bg-white w-full min-h-[90%] flex flex-col ">
      {openAddModel && <AddModelModal closeModal={closeModal} />}
      {openEditModal && selectedModel && (
        <EditModelModal
          model={selectedModel}
          closeModal={() => setOpenEditModal(false)}
        />
      )}
      <Button text= {"add model"} openModal={openModal} />
      {models.length > 0 ? (
        <div className="px-3 py-2 w-[94%] mx-auto ">
          {models.map((model) => (
            <div
              key={model.id}
              className="flex px-7  justify-between py-2 border-b border-b-slate-200 rounded-lg">
              <p>{model.name}</p>
              <div className="flex items-center text-gray-800 gap-4">
                <div
                  onClick={() => handleModelUpdate(model)}
                  className="h-[35px]  text-blue-400 hover:text-white  min-w-[35px] rounded-md border hover:bg-blue-400 border-blue-400 flex items-center justify-center">
                  <MdModeEdit size={20} />
                </div>
                <div
                  onClick={() => handleDelete(model.id)}
                  className="h-[35px] text-red-500 hover:text-white hover:bg-red-500  min-w-[35px] rounded-md border border-red flex items-center justify-center">
                  <MdDeleteForever className="" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[20vh] items-center justify-center">
          No result Found
        </div>
      )}
    </section>
  );
};

export default ClientPage;
