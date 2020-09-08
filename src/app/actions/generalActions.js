export const REVEAL_OFFER_BTN = 'REVEAL_OFFER_BTN';
export const HIDE_OFFER_BTN = 'HIDE_OFFER_BTN';
export const NEW_SEARCH = 'NEW_SEARCH';
export const SET_USER = 'SET_USER';

export const revealOfferBtn = () => ({
    type: REVEAL_OFFER_BTN
})

export const hideOfferBtn = () => ({
    type: HIDE_OFFER_BTN
})

export const newSearch = () => ({
    type: NEW_SEARCH
})

export const getUserInfo = (email) => {
    let user = email

    return ({
        type: SET_USER, 
        payload: user
    })
}