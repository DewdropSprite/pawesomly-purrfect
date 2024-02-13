const editCat = (state  = {}, action) => {
    if(action.type === 'SET_EDIT_CAT'){
        return action.payload;
    }
    else if(action.type === 'EDIT_ONCHANGE') {
        return {
            ...state, [action.payload.property]: action.payload.value
        }
    }
    else if(action.type === 'EDIT_CLEAR') {
        return{
            name: '',
            birthdate: '',
            microchip_id: '',
            rabies: '',
            distemper: '',
            annual_checkup: '',
            spay_neuter: ''
        }}
    return state;
}

export default editCat;