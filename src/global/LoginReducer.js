export const LoginReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_SIGN_IN':
        return {
          user: action.payload.user,
        };
      default:
        return state;
    }
  };
  