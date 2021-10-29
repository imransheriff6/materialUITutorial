const initialState = {
    loading:false,
    user:[],
    error:''
}
const asyncReducer = (state = initialState,action) =>{
    switch(action.type){
        case 'call_request':
            return {
                ...state,
                loading:true
            }
        case 'request_success':
            return {
                loading:false,
                user:action.payload.user,
                error:''
            }
        case 'request_error':
            return {
                loading:false,
                user:[],
                error:action.payload.error
            }
        default: return state
    }
}
export default asyncReducer