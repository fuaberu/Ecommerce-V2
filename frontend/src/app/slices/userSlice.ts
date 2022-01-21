import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { usersApi } from '../sevices/user';

export interface IUser {
	name: string;
	email: string;
	password: number;
	profilePic: {
		public_id: string;
		url: string;
	};
	role: string;
	passwordToken: string;
	createdAt: Date;
}

type AuthState = {
	user: IUser | null;
	token: string | null;
};

const userAuth = createSlice({
	name: 'userAuth',
	initialState: { user: null, token: null } as AuthState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			usersApi.endpoints.loginUser.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token;
				state.user = payload.user;
			}
		);
		builder.addMatcher(
			usersApi.endpoints.loadUser.matchFulfilled,
			(state, { payload }) => {
				state.user = payload.user;
			}
		);
		builder.addMatcher(usersApi.endpoints.logOutUser.matchFulfilled, (state) => {
			state.user = null;
			state.token = null;
		});
	},
});

export default userAuth.reducer;

export const selectCurrentUser = (state: RootState) => state.usersApi.mutations;
