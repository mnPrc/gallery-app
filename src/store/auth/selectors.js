export const userSelector = (state) => state.auth.user;
export const isAuthenticated = (state) => (state.auth.token ? true : false);
export const selectErrors = (state) => state.auth.loginErrors;
export const selectRegisterErrors = (state) => state.auth.registerErrors;