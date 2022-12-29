import { UserActionTypes } from './invitation.type';
import ListData from '../../JSON/invitations.json'
import UpdateListData from '../../JSON/invitations_update.json'
const data = ListData.invites
const updatedData = UpdateListData.invites
const INITIAL_STATE = {
    inv_list: data,
    upd_inv_list: updatedData,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.INV_LIST:
            return {
                ...state,
                inv_list: action.payload,
            }
        case UserActionTypes.UPD_INV_LIST:
            return {
                ...state,
                upd_inv_list: action.payload,
            }

        default:
            return state;
    }
}

export default userReducer;