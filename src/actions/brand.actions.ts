"use server";

import { revalidatePath } from "next/cache";
import { query } from "../db/connect";
import { FormData } from "@/valadation_schema";
import { IOptional } from "@/interface";
const path = "brand";
export const addBrand = async (data: FormData) => {
  try {
    await query("INSERT INTO brands (name) VALUES (?)", [data.name]);
    revalidatePath(`${path}`);
    return { msg: "Model Added successfully", isSuccess: true };
    console.log("Form data saved successfully");
  } catch (error) {
    console.error("Error saving form data:", error);
    return { msg: "Model Added successfully", isSuccess: true };
    throw error;
  }
};

export const getAllBrand = async () => {
  try {
    const brands = await query("SELECT * FROM brands");
    return { brands: JSON.parse(JSON.stringify(brands)), isFetched: true };
  } catch (err) {
    console.error("Error while fetching data:", err);
    return { msg: "error while fetchinf data", isErr: false }; // Return an empty array in case of error
  }
};

export const editBrand = async (data: FormData) => {
  const { id, name } = data;
  const lowercasename = name.toLowerCase();
  try {
    const existingBrand = await query(
      "SELECT * FROM brands WHERE name = ? AND id != ?",
      [lowercasename, id]
    );
    if (existingBrand.length > 0) {
      return { msg: "Brandwith the same name already exists" };
    }
    const result = await query("UPDATE brands SET name = ? WHERE id = ?", [
      lowercasename,
      id,
    ]);

    if (result.affectedRows === 0) {
      return { msg: "Brandnot found" ,  isSuccess:false };
    }
    console.log("Brandupdated successfully");
    revalidatePath(`${path}`);
    return { msg: "Model Added successfully", isSuccess: true };
  } catch (error) {
    console.error("Error updating model:", error);
    return { msg: "Internal Server Error" , isSuccess:false };
  }
};

export const deleteBrand = async (data: { id: number }) => {
  const { id } = data;
  try {
    const result = await query("DELETE FROM brands WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      revalidatePath(`${path}`);

      return { msg: "Brandnot found" };
    }
    revalidatePath(`${path}`);
  } catch (error) {
    return { msg: "Internal Server Error" };
  }
};
