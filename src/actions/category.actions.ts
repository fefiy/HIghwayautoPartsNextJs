"use server";

import { revalidatePath } from "next/cache";
import { query } from "../db/connect";
import { FormData } from "@/valadation_schema";
import { IOptional } from "@/interface";
const path = "category";
export const addCategory= async (data: FormData) => {
  try {
    await query("INSERT INTO categories (name) VALUES (?)", [data.name]);
    revalidatePath(`${path}`);
    return { msg: "Category Added successfully", isSuccess: true };
  } catch (error) {
    console.error("Error saving form data:", error);
    return { msg: "Internal server Error", isSuccess: false };
  }
};

export const getAllCategory= async () => {
  try {
    const categories = await query("SELECT * FROM categories");
    return { categories: JSON.parse(JSON.stringify(categories)), isFetched: true };
  } catch (err) {
    console.error("Error while fetching data:", err);
    return { msg: "error while fetchinf data", isErr: false }; // Return an empty array in case of error
  }
};

export const editCategory= async (data: FormData) => {
  const { id, name } = data;
  const lowercasename = name.toLowerCase();
  try {
    const existingCategory= await query(
      "SELECT * FROM categories WHERE name = ? AND id != ?",
      [lowercasename, id]
    );
    if (existingCategory.length > 0) {
      return { msg: "category with the same name already exists" };
    }
    const result = await query("UPDATE categories SET name = ? WHERE id = ?", [
      lowercasename,
      id,
    ]);

    if (result.affectedRows === 0) {
      return { msg: "category not found" ,  isSuccess: false };
    }
    revalidatePath(`${path}`);
    return { msg: "Category Added successfully", isSuccess: true };
  } catch (error) {
    console.error("Error updating category:", error);
    return { msg: "Internal Server Error",  isSuccess: false };
  }
};

export const deleteCategory= async (data: { id: number }) => {
  const { id } = data;
  try {
    const result = await query("DELETE FROM categories WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      revalidatePath(`${path}`);
      return { msg: "category not found" };
    }
    revalidatePath(`${path}`);
  } catch (error) {
    return { msg: "Internal Server Error" };
  }
};
