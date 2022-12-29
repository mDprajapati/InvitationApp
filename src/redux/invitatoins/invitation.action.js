import { UserActionTypes } from './invitation.type';

export const InvitationListData = (value) => ({
    type: UserActionTypes.INV_LIST,
    payload:value,
});
export const InvitationUpdatedListData = (value) => ({
    type: UserActionTypes.INV_LIST,
    payload:value,
});