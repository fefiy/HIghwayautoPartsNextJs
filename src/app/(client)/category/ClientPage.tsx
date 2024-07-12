"use client";
import React, { useState } from "react";
import { IOptional } from "@/interface";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import Button from "@/components/Button";
import AddCategoryModal from "@/components/AddCategoryModal";
import EditCategoryModal from "@/components/EditCategoryModal";
import { deleteCategory } from "@/actions/category.actions";
const ClientPage = ({ catagories, isFetched}: {catagories: IOptional[], isFetched?:boolean }) => {
  let pending =  true
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<IOptional>();
  const closeModal = () => {
    setOpenAddCategory(false);
  };

  const openModal = () => {
    setOpenAddCategory(true);
  };

  const handleUpdate = (cat: IOptional) => {
    setSelectedCategory(cat);
    setOpenEditModal(true);
  };
  const handleDelete = async (id: number) => {
    await deleteCategory({ id });
  };

 if(pending && !isFetched){
  return <div>
    Loading ....
  </div>
 }

  return (
    <section className="bg-white w-full min-h-[90%] flex flex-col ">
      {openAddCategory && <AddCategoryModal closeModal={closeModal} />}
      {openEditModal && selectedCategory && (
        <EditCategoryModal
          model={selectedCategory}
          closeModal={() => setOpenEditModal(false)}
        />
      )}
      <Button text="Add category" openModal={openModal} />
      {catagories.length > 0 ? (
        <div className="px-3 py-2 w-[94%] mx-auto ">
          {catagories.map((cat) => (
            <div
              key={cat.id}
              className="flex px-7  justify-between py-2 border-b border-b-slate-200 rounded-lg">
              <p>{cat.name}</p>
              <div className="flex items-center text-gray-800 gap-4">
                <div
                  onClick={() => handleUpdate(cat)}
                  className="h-[35px]  text-blue-400 hover:text-white  min-w-[35px] rounded-md border hover:bg-blue-400 border-blue-400 flex items-center justify-center">
                  <MdModeEdit size={20} />
                </div>
                <div
                  onClick={() => handleDelete(cat.id)}
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
