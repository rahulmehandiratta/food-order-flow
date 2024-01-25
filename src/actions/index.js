const initialState = {
    currentUser: {},
    isLoading: false,
    studentTestIds: [],
    activePackages: [],
    loadExamData: false,
    kotData: {},
    isRefreshKot: false,
    isPrintOrder: false,
    orderId: "",
}

export default (state = initialState, action) => {
    switch (action && action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.user
            }

        case 'LOGOUT':
            return {
                ...state,
                currentUser: {},
                activePackages: []
            }
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
        case 'PROGRESS_LOADER_SHOW': {
            return {
                ...state,
                isProLoader: true
            }
        }
        case 'PROGRESS_LOADER_HIDE': {
            return {
                ...state,
                isProLoader: false
            }
        }
        case 'PROGRESS_LOADER': {
            return {
                ...state,
                percentage: action.percentage
            }
        }
        case 'REFRESH_KOT': {
            return {
                ...state,
                isRefreshKot: action.isRefreshKot,
                kotData: action.kotData
            }
        }
        case 'PRINT_ORDER': {
            return {
                ...state,
                isPrintOrder: action.isPrintOrder,
                orderId: action.orderId
            }
        }
        default:
            return state
    }
}
