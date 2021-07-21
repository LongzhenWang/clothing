import { UserActionTypes } from './user.types.js';

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const SignInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const SignInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = (emailAndPassord) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassord
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});

export const SignOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const SignOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const SignOutFailure = error => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

export const SignUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
});

export const SignUpSuccess = (user, additionalData) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: {user, additionalData}
});

export const SignUpFailure = error => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
})