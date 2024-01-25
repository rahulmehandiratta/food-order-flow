const initialState = {
    isLoading: false,
    isProLoader: false,
}

export const showLoader = () => {
    return {type: 'SHOW_LOADER'}
}

export const hideLoader = () => {
    return {type: 'HIDE_LOADER'}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_LOADER': {
            return {
                ...state,
                isLoading: true
            }
        }
        case 'HIDE_LOADER': {
            return {
                ...state,
                isLoading: false
            }
        }

        default:
            return state
    }
}
