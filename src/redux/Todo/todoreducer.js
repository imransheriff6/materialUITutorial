const todo = (state, action) => {
    switch (action.type) {
      case 'Add_todo':
        return {
          id: action.payload.id,
          name: action.payload.name,
          completed: false
        };
      case 'Toggle_todo':
        if (state.id !== action.payload.id) {
          return state;
        }
        return {
          ...state,
          completed: !state.completed
        };      
      default:
        return state;
    }
  };
  
  const todoReducer = (state = [], action) => {
    switch (action.type) {
      case 'Add_todo':
        return [
          ...state,
          todo(undefined, action)
        ];
      case 'Toggle_todo':
        return state.map(t =>
          todo(t, action)
        );
        case 'Delete_todo':
          return state.filter(t => t.id != action.payload.id);
      default:
        return state;
    }
  };
export default todoReducer
