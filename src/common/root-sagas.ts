import { all, takeEvery, takeLatest } from 'redux-saga/effects'
import { appSaga } from '../App/reducer'
import { sakuraSaga } from '../components/sakura/reducer'
import { currentSaga } from './reducers/current'
import { adminUserSaga } from '../components/admin-user/reducer'
import { adminSakuraSaga } from '../components/admin-sakura/reducer'
import { LOCATION_CHANGE } from 'react-router-redux'

export function* rootSagas() {
  yield all([
    takeLatest('sessionQueryRequest', appSaga.sessionQuery),
    takeLatest('sessionLoginRequest', appSaga.sessionLogin),
    takeLatest('sessionLogoutRequest', appSaga.sessionLogout),

    takeLatest('listSakuraRequest', sakuraSaga.listModel),
    takeLatest('viewSakuraRequest', sakuraSaga.viewModel),

    takeLatest(LOCATION_CHANGE, currentSaga.updateReload),
    takeLatest('reloadRequest', currentSaga.invokeReload),

    takeLatest('listAdminUserRequest', adminUserSaga.listModel),
    takeLatest('viewAdminUserRequest', adminUserSaga.viewModel),
    takeEvery('saveAdminUserRequest', adminUserSaga.saveModel),
    takeLatest('editAdminUserRequest', adminUserSaga.editModel),

    takeLatest('listAdminSakuraRequest', adminSakuraSaga.listModel),
    takeLatest('viewAdminSakuraRequest', adminSakuraSaga.viewModel),
    takeEvery('saveAdminSakuraRequest', adminSakuraSaga.saveModel),
    takeLatest('editAdminSakuraRequest', adminSakuraSaga.editModel),
    takeEvery('pushDiscAdminSakuraRequest', adminSakuraSaga.pushDisc),
    takeEvery('dropDiscAdminSakuraRequest', adminSakuraSaga.dropDisc),
    takeLatest('viewAdminSakura(discs)Request', adminSakuraSaga.viewOfDiscs),
  ])
}
