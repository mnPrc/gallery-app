export const userSelector = (state) => state.auth.user;

export const isAuthenticated = (state) => (state.auth.token ? true : false);

export const isAdmin = (state) => (state.auth.user.is_admin ? true : false);

export const usersSelector = (state) => (state.auth.users);

export const selectErrors = (state) => state.auth.loginErrors;

export const selectRegisterErrors = (state) => state.auth.registerErrors;

export const selectTransactionErrors = (state) => state.auth.transactionErrors;