const catMedical = (state = [], action) => {
    switch(action.type){
        case 'SET_MEDICAL':
            console.log("inside catmedical reducer")
            return action.payload
            default:
                return state;
    }
}

export default catMedical;