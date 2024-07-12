// albumSaga.ts
import { takeLatest, put } from "redux-saga/effects";
import {
  addModelError,
  addModelSuccess,
  getAllModelError,
  getAllModelSuccess,
  EditModelError,
  EditModelSuccess,
  deleteModelError,
  deleteModelSuccess
} from "./slice";
import { privateAxios } from "@/axios";

function* addModelSage(action: any): Generator {
  try {
    const response: any = yield privateAxios.post(
      "/model",
      action.payload
    );
    yield put(addModelSuccess(response.data));
  } catch (error: any) {
    yield put(addModelError(error.response.data.msg));
  }
}
function* getAllModelsSaga(): Generator {
  try {
    const response: any = yield privateAxios.get("/model");
    yield put(getAllModelSuccess(response.data));
  } catch (error: any) {
    yield put(getAllModelError(error.response.data.message));
  }
}


function* EditModelSaga(action: any): Generator {
  try {
    const {model_id, newData} = action.payload

    const response: any = yield privateAxios.put(
      "/model/"+model_id,
      newData
    );
    yield put(EditModelSuccess({model_id:model_id , updatedModel:response.data}));
  } catch (error: any) {
    yield put(EditModelError(error.response.data.error));
  }
}


function* DeleteModelSaga(action: any): Generator {
  try {
    const { model_id, } = action.payload;
    yield privateAxios.delete("/model/" + model_id);
    yield put(
     deleteModelSuccess({ model_id: model_id})
    );
  } catch (error: any) {
    yield put(deleteModelError(error.response.data.error));
  }
}

export function* modelSaga() {
  yield takeLatest("models/addModel", addModelSage);
  yield takeLatest("models/getAllModel", getAllModelsSaga);
  yield takeLatest("models/EditModel",EditModelSaga);
  yield takeLatest("models/deleteModel",DeleteModelSaga);
}
