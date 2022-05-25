import mediusware from "../api/mediusware";
import createDataContext from "./createDataContext";

const assessmentReducer = (state, action) => {
    switch (action.type) {
        case "assessment":
            return { ...state, assessment:action.payload};
        case "quiz_question":
            return { ...state, quiz:action.payload};
        case "add_error":
            return { ...state, errorMsg: action.payload };
        case "clear_error_msg":
            return {...state,errorMsg:{}};
        default:
            return state;
    }
};


const clearErrorMsg = dispatch => () =>{
    dispatch({type:'clear_error_msg'})
}


const getAssessment = dispatch => async (token,assessmentId,callback) => {
    try {
        const response = await mediusware.get(`/assessment/${assessmentId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: "assessment", payload: {assessment:response.data}});
        //console.log("response data: ",response.data);
        if(callback){
            callback();
        }
    } catch (err) {
        console.log(err?.response?.data);

    }
};

const startExam = dispatch => async (token,assessmentId,callback) => {
    try {
        const response = await mediusware.put(`/assessment/${assessmentId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(callback){
            callback();
        }
        //console.log(response.data);
    } catch (err) {
        console.log(err?.response?.data?.admin_only,"error message...");
        dispatch({ type: "add_error", payload: {error:err?.response?.data?.admin_only}});
    }
};

const startReExam = dispatch => async (token,assessmentId,callback) => {
    try {
        const response = await mediusware.get(`/assessment/${assessmentId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(callback){
            callback();
        }
        //console.log(response.data);
    } catch (err) {
        console.log(err?.response?.data,"error message...");
        //dispatch({ type: "add_error", payload: {error:err?.response?.data?.admin_only}});
    }
};


const getQuizQuestion = dispatch => async (token,assessmentId) => {
    try {
        const response = await mediusware.get(`/assessment/${assessmentId}/question/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        dispatch({ type: "quiz_question", payload: {quiz:response.data}});
    } catch (err) {
        console.log(err?.response?.data);
    }
};

export const { Provider, Context } = createDataContext(
    assessmentReducer,
    {getAssessment,getQuizQuestion,startExam, clearErrorMsg,startReExam},
    {assessment:{},quiz:{},errorMsg: {}}
);