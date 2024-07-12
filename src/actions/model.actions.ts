"use server";
import { revalidatePath } from "next/cache";
import { query } from "../db/connect";
import { FormData } from "@/valadation_schema";

export const addModel = async (data: FormData) => {
  try {
    await query("INSERT INTO models (name) VALUES (?)", [data.name]);
    revalidatePath("/model");
    return { msg: "Model Added successfully", isSuccess: true };
  } catch (error) {
    console.error("Error saving form data:", error);
    return { msg: "Internal Server Error", isSuccess: false};
  }
};

export const getAllModel = async () => {
  try {
    const models = await query("SELECT * FROM models");
    return { models: JSON.parse(JSON.stringify(models)), isFetched: true };
  } catch (err) {
    console.error("Error while fetching data:", err);
    return { msg: "error while fetchinf data", isErr: false }; // Return an empty array in case of error
  }
};

export const editModel = async (data: FormData) => {
  const { id, name } = data;
  const lowercasename = name.toLowerCase();
  try {
    const existingModel = await query(
      "SELECT * FROM models WHERE name = ? AND id != ?",
      [lowercasename, id]
    );
    if (existingModel.length > 0) {
      return { msg: "Model with the same name already exists" };
    }
    const result = await query("UPDATE models SET name = ? WHERE id = ?", [
      lowercasename,
      id,
    ]);

    if (result.affectedRows === 0) {
      return { msg: "Model not found", isSuccess: false };
    }
    console.log("Model updated successfully");
    revalidatePath("/model");
    return { msg: "Model updated successfully", isSuccess: true };
  } catch (error) {
    console.error("Error updating model:", error);
    return { msg: "Internal Server Error", isSuccess: false };
  }
};

export const deleteModel = async (data: { id: number }) => {
  const { id } = data;
  try {
    const result = await query("DELETE FROM models WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      revalidatePath("/model");
      return { msg: "Model not found" };
    }
    revalidatePath("/model");
  } catch (error) {
    return { msg: "Internal Server Error" };
  }
};
