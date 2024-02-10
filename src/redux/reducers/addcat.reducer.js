const addCat = (state = [], action) => {
    switch(action.type){
        case 'ADD_CAT':
            console.log("inside addCat reducer")
            return [...state, action.payload]
            default:
                return state;
    }
}

export default addCat;