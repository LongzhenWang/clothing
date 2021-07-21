import { takeLatest, put, all, call } from "@redux-saga/core/effects";

import { UserActionTypes } from "./user.types";

import { SignInSuccess, SignInFailure, SignOutSuccess, SignOutFailure, SignUpSuccess, SignUpFailure } from "./user.actions";

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth, additionalData){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapShot = yield userRef.get();
        yield put(
            SignInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
        );
    }catch(error){
        yield put(
            SignInFailure(error)
        );
    }
}

export function* signInWithGoolge(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);
    }catch(error){
        yield put(
            SignInFailure(error)
        );
    }
}

export function* signInWithEmail({payload: { email, password }}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
    }catch(error){
        yield put(
            SignInFailure(error)
        );
    }
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapShotFromUserAuth(userAuth);
    }catch (error) {
        yield put(SignInFailure(error));
    }
}

export function* signOut() {
    try{
        yield auth.signOut();
        yield put(SignOutSuccess());
    }catch(error){
        yield put(SignOutFailure(error));
    }
}

export function* signUp({payload: {email, password, displayName }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(SignUpSuccess({user, additionalData: {displayName} }));
    } catch (error){
        yield put(SignUpFailure(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}){
    yield getSnapShotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoolge);
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), 
               call(onEmailSignInStart), 
               call(onCheckUserSession), 
               call(onSignOutStart),
               call(onSignUpStart),
               call(onSignUpSuccess)
            ]);
}//listening for these actions