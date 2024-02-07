const catProfile = (state = [], action) => {
    switch(action.type){
        case 'SET_CAT_PROFILE':
            console.log("inside catprofile reducer")
            return action.payload
            default:
                return state;
    }
}

export default catProfile;