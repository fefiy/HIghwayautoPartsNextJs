"use server";
import { query } from "../db/connect";
import path from "path";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

interface itemInfo {
  part_number: string;
  quantity?: number;
  unit_price?: number;
  description?: string;
  category_id?: number;
  brand_id?: number;
  model_id?: number;
}

export const addItem = async (datas: { formdata: FormData; itemInfo: any }) => {
  const { formdata, itemInfo } = datas;
  const files = formdata.getAll("files") as File[];

  console.log(itemInfo);

  console.log("itemInfo", itemInfo);
  if (!files || !itemInfo) {
    console.log("files and ite info ara required");
    return { error: "Files and item information are required." };
  }

  try {
    itemInfo.part_number = itemInfo.part_number.toLowerCase();
    const result = await query("INSERT INTO items SET ?", itemInfo);
    const itemId = result.insertId;
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replaceAll(" ", "_") + Date.now();
      await writeFile(
        path.join(process.cwd(), "public/uploads", filename),
        buffer
      );
      const imageUrl = `/uploads/${filename}`;
      await query("INSERT INTO item_images (item_id, imgUrl) VALUES (?, ?)", [
        itemId,
        imageUrl,
      ]);
    }
    return { message: "Item added successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Error adding item" };
  }
};

export const getAllItem = async () => {
  try {
    const results = await query(`
      SELECT
        i.id as item_id,
        i.part_number as part_number,
        i.description as description,
        i.unit_price as unit_price,
        i.quantity as quantity,
        c.id AS category_id, c.name AS category_name,
        b.id AS brand_id, b.name AS brand_name,
        m.id AS model_id, m.name AS model_name
      FROM 
        items i
      LEFT JOIN 
        categories c ON i.category_id = c.id
      LEFT JOIN 
        brands b ON i.brand_id = b.id
      LEFT JOIN 
        models m ON i.model_id = m.id
    `);

    console.log(results);

    const itemImages = await query("SELECT item_id, imgUrl FROM item_images");

    // Create a mapping of item_id to an array of images
    const imagesMap: { [key: number]: string[] } = {};
    itemImages.forEach((image: { item_id: number; imgUrl: string }) => {
      if (!imagesMap[image.item_id]) {
        imagesMap[image.item_id] = [];
      }
      imagesMap[image.item_id].push(image.imgUrl);
    });

    const formattedResults = results.map((result: any) => ({
      part_number: result.part_number,
      description: result?.description,
      unit_price: result.unit_price,
      quantity: result.quantity,
      model: {
        id: result.model_id,
        name: result.model_name
      },
      brand: {
        id: result.brand_id,
        name: result.brand_name
      },
      category: {
        id: result.category_id,
        name: result.category_name
      },
      images: imagesMap[result.item_id] || [] // Include images array or empty array if no images found
    }));

    console.log(formattedResults);
    return { items: formattedResults };
  } catch (err) {
    console.error(err);
    return { error: "Error retrieving items" };
  }
};


