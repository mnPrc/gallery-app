import * as authSaga from "./auth/saga";
import * as galleriesSaga from "./gallery/saga"

const sagas = {
    ...authSaga,
    ...galleriesSaga
};

export default sagas;