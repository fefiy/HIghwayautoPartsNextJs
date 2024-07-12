
export interface IOptional {
    name: string;
    id:number;
  }

  export interface IModel {
    id: number;
    name: string;
  }
  
 export interface IBrand {
    id: number;
    name: string;
  }
  
  export interface ICategory {
    id: number;
    name: string;
  }
  
  export interface IItem {
    part_number: string;
    description: string;
    unit_price: string;
    quantity: number;
    model: IModel;
    brand: IBrand;
    category: ICategory;
    images: string[];
  }
  