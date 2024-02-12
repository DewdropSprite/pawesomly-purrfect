const removeCat = (state = [], action) => {
    switch(action.type){
        case 'REMOVE_CAT_PROFILE':
            console.log("inside removeCat reducer")
            return state.filter(cat => cat.pet_info_id !== action.payload.catId);
            default:
                    return state;
    }
}

export default removeCat;