 import {z} from "zod"

export const OptionSchema = z.object({
    name:z.string()
 })
// types/index.ts
export interface FormData{
   id?:number,
   name: string;
 };
 
 export const ItemSchema = z.object({
   quantity: z.number().optional(),
   part_number: z.string().min(1, { message: "part number is  rrequired" }),
   unit_price: z.number().refine(
     (value) => {
       return !isNaN(value) && value >= 0;
     },
     {
       message: "Price must greater than 0",
     }
   ),
   description: z.string().optional(),
   brand_id: z.number().optional(),
   category_id: z.number().optional(),
   model_id: z.number().optional(),
 });
//  export const ItemSchema = z.object({
//     part_number: z.string(),
//     unit_price: z.number(),
//     quantity: z.number().optional(),
//     model_id: z.number(),
//     brand_id: z.number(),
//     imgUrl: z.array(z.string().nonempty()),
//     description: z.string()
//   });