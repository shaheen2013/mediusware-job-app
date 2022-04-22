import { NavigtionActions } from 'react-navigation'
let navigator;

export const setNavigator = (nav) =>{
    navigator = nav;
};
export const navigate = (routeName,params) =>{
    navigator.dispatch(
        NavigtionActions.navigate({
            routeName,
            params
        })
    )
}