import { IOptional } from "@/interface";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  models: IOptional[];
  isLoading: boolean;
  error: null;
  isAddModelLoading:boolean;
  isEditModelLoading:boolean;
  isDeletingModelLoading :boolean;
}

const initialState: InitialState = {
  models: [],
  isLoading: false,
  error: null,
  isAddModelLoading:false,
  isEditModelLoading:false, 
  isDeletingModelLoading:false,
};

const modelSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    getAllModel: (state) => {
      state.models = [];
      state.isLoading = true;
      state.error = null;
    },
    getAllModelSuccess: (state, action) => {
      state.models = action.payload.data;
      state.isLoading = false;
    },
    getAllModelError: (state, action) => {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    addModel: (state, _action) => {
      state.isAddModelLoading = true;
      state.error = null;
    },
    addModelSuccess: (state, action) => {
      state.isAddModelLoading = false;
      state.models.push(action.payload.data);
      state.error = null;
    },
   addModelError: (state, action) => {
      state.error = action.payload;
      state.isAddModelLoading = false;
    },
    EditModel: (state, _action) => {
      state.isEditModelLoading = true;
    },
    EditModelSuccess: (state, action) => {
      const {model_id , updatedModel} = action.payload
      // const branch_id = action.payload.branch_id;
      const updated_Items = state.models.reduce((accumulater:IOptional [], model) => {
        if (model_id === model.id) {
          return [...accumulater, updatedModel];
        } else {
          return [...accumulater, model];
        }
      }, []);
      state.models= updated_Items;
      state.isEditModelLoading= false;
      state.error = null;
    },
    EditModelError: (state, action) => {
      state.isEditModelLoading = true;
      state.error = action.payload;
    },
    deleteModel:(state, _action)=>{
      state.isDeletingModelLoading = true;
      state.error = null
    }, 
    deleteModelSuccess:(state, action)=>{
      state.isDeletingModelLoading = false;
      state.error = null
      const {model_id} = action.payload;
      state.models = state.models.filter((model)=> model.id !== model_id)
    },
    deleteModelError:(state, action)=>{
      state.isDeletingModelLoading = false;
      state.error = action.payload
    }
  },
});

export const {
 addModelError,
  addModel,
  addModelSuccess,
  reset,
  getAllModel,
  getAllModelError,
  getAllModelSuccess,
  EditModel,
  EditModelError,
  EditModelSuccess,
  deleteModel,
  deleteModelError,
  deleteModelSuccess
} = modelSlice.actions;

export default modelSlice.reducer;