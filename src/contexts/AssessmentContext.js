import mediusware from "../api/mediusware";
import createDataContext from "./createDataContext";

const assessmentReducer = (state, action) => {
    switch (action.type) {
        case "assessment":
            return { ...state, assessment:action.payload};
        case "allAssessments":
            return { ...state, allAssessments:action.payload};
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
        if(callback){
            callback();
        }
    } catch (err) {

    }
};
const getAllAssessment = dispatch => async (token,callback) => {
    try {
        const response = await mediusware.get(`/assessment/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: "allAssessments", payload: {allAssessments:response.data}});
        if(callback){
            callback();
        }
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
        dispatch({ type: "add_error", payload: {error:err?.response?.data?.admin_only}});
    }
};


const getQuizQuestion = dispatch => async (token,assessmentId,callback,errCallback) => {
    try {
        const response = await mediusware.get(`/assessment/${assessmentId}/question/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(callback){
            callback();
        }
        dispatch({ type: "quiz_question", payload: {quiz:response.data}});
    } catch (err) {
        dispatch({ type: "add_error", payload: {error:err?.response?.data?.out_of_step}});
        dispatch({ type: "add_error", payload: {error:err?.response?.data?.time_up}});
        if(err?.response?.data?.out_of_step || err?.response?.data?.time_up){
            errCallback();
        }
    }
};


const savedAnswer = dispatch => async ({uuid,question_id,answers},token,callback) => {
    try {
        const response = await mediusware.post(`/assessment/save-answer/`, {uuid,question_id,answers},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(callback){
            callback();
        }
        dispatch({type:'clear_quiz'});
    } catch (err) {

    }
};

const savedEvaluation = dispatch => async ({assessment_uuid,evaluation_url,candidate_feedback}, callback) => {
    try {
        const response = await mediusware.post(`/assessment/save-evaluation-url/`, {assessment_uuid,evaluation_url,candidate_feedback});
        if(callback){
            callback();
        }
        dispatch({type:'clear_quiz'});
    } catch (err) {

    }
};

export const { Provider, Context } = createDataContext(
    assessmentReducer,
    {getAssessment,getQuizQuestion,startExam, clearErrorMsg,startReExam,savedAnswer,savedEvaluation,getAllAssessment},
    {assessment:{},quiz:{},errorMsg: {},allAssessments:[]}
);