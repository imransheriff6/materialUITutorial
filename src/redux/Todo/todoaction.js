import axios from 'axios'
export const addTodo = content => ({
        type:'Add_todo',
        payload:{
            id:Date.now(),
            name:content,
            completed:false
        }
})
export const deleteTodo = id =>(
    {
        type:'Delete_todo',
        payload:{
            id
        }
    }
)
export const toggleTodo = id =>(
    {
        type:'Toggle_todo',
        payload:{
            id
        }
    }
)
export const activeTodo = (filter) =>(
    {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
)
export const callRequest = () =>(
    {
        type:'call_request'
    }
)
export const requestSuccess = (user) => ({
    type:'request_success',
    payload:{
        user
    }
})
export const requesterror = (error) => ({
    type:'request_error',
    payload:{
        error
    }
})
export const fetchuser = () =>{
    return function(dispatch){
        dispatch(callRequest());
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(response =>{
            //const user = response.data.map(id => id.id)
            dispatch(requestSuccess(response.data));
        })
        .catch(err =>{
            dispatch(requesterror(err))
        })
    }
}