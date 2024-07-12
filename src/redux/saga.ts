import { all, fork } from "redux-saga/effects";
import { modelSaga } from "./model/saga";
const rootSaga = function* () {
  yield all([fork(modelSaga)]);
};

export default rootSaga;
