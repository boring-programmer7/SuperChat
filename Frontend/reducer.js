
const images = [
    { name: 'Cat', src: 'https://firebasestorage.googleapis.com/v0/b/superchat-c8496.appspot.com/o/icons%2Fcat.png?alt=media&token=09ddfa4f-252c-4c3f-921f-1a5b47506fd4' },
    { name: 'Beaver', src: 'https://firebasestorage.googleapis.com/v0/b/superchat-c8496.appspot.com/o/icons%2Fbeaver.png?alt=media&token=7030c610-7770-48b0-bc17-13b6392c08bc' },
    { name: 'Elephant', src: 'https://firebasestorage.googleapis.com/v0/b/superchat-c8496.appspot.com/o/icons%2Felephant.png?alt=media&token=ecdb729f-4932-49cc-84e5-da2445f604f7' },
    { name: 'Fox', src: 'https://firebasestorage.googleapis.com/v0/b/superchat-c8496.appspot.com/o/icons%2Ffox.png?alt=media&token=842491ec-8703-4d33-8e9c-9a3f435092ec' },
    { name: 'Hedgehog', src: 'https://firebasestorage.googleapis.com/v0/b/superchat-c8496.appspot.com/o/icons%2Fhedgehog.png?alt=media&token=6337a76d-c9bd-4aa5-ae10-2611307725bd' },
    { name: 'Leopard', src: 'https://firebasestorage.googleapis.com/v0/b/superchat-c8496.appspot.com/o/icons%2Fleopard.png?alt=media&token=28cf427d-cf34-4156-a3d2-be9f5a7dd959' },
    { name: 'Penguin', src: 'https://firebasestorage.googleapis.com/v0/b/superchat-c8496.appspot.com/o/icons%2Fpenguin-1.png?alt=media&token=94e6ae16-81c7-4a94-a871-62709c3cefcc' },
    { name: 'Whale', src: 'https://firebasestorage.googleapis.com/v0/b/superchat-c8496.appspot.com/o/icons%2Fwhale.png?alt=media&token=14618701-9ee1-4aef-b2a8-bc7ccab4958b' },
]


const defaultUserName = () => {
    if (window.localStorage.getItem('userName')) {
        return JSON.parse(window.localStorage.getItem('userName'))
    }
    else {
        const newName=`Anonymous${Math.floor(Math.random() * 100)}`
        window.localStorage.setItem("userName",JSON.stringify(newName))
        return newName
    }
}

const defaultUserId = () => {
    if (window.localStorage.getItem('userId')) {
        return JSON.parse(window.localStorage.getItem('userId'))
    }
    else {
        const newId=`randomuser${Math.floor(Math.random() * 10000)}`
        window.localStorage.setItem("userId",JSON.stringify(newId))
        return newId
    }
}

const defaultUserPhoto = () => {
    if (window.localStorage.getItem('userPhoto')) {
        return JSON.parse(window.localStorage.getItem('userPhoto'))
    }
    else {
        const newPhoto=images[Math.floor(Math.random() * images.length)].src
        window.localStorage.setItem("userPhoto",JSON.stringify(newPhoto))
        return newPhoto
    }
}




//`Anonymous${Math.floor(Math.random() * 100)}`,
export const initialState = {
    userName:defaultUserName(),
    userId:defaultUserId() ,
    photoUrl:defaultUserPhoto() ,
    dark: false,
    images:images
};

const reducer = (state, action) => {
    //console.log(action);
    switch (action.type) {
        case "SET_USERNAME":
            return {
                ...state,
                userName: action.userName,
            };
        case "SET_PHOTO":
            return {
                ...state,
                photoUrl: action.photoUrl,
            };
        default:
            return state;
    }
};

export default reducer;