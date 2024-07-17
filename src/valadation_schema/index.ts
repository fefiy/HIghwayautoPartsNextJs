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


 export const newUserSchema = z.object({
 phone_number: z
 .string()
 .optional()
 .refine(
   (value) => {
     if (value) {
       return /^09\d{8}$/.test(value);
     }
     return true;
   },
   {
     message: "Phone number must be in the format 09xxxxxxxx.",
   }
 ),
 name:z.string(),
 pasword:z.string(),
 })