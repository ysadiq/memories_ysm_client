import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, LIKE, COMMENT, DELETE } from '../constants/ActionTypes';
import * as api from '../../api';

/* Action creators are simply functions that return an action, 
and an action is just an object that has a type and payload.

const getPosts = () => {
    const action = { type: 'FETCH_ALL', payload: [] }
    return action;
}

Since getPost is asynchronous logic we have to use 
Redux Thunk as shown below:

const getPosts = () => async (dispatch) => {    
    const action = { type: 'FETCH_ALL', payload: [] }

    dispatch(action);
}
*/

export const getPost = (id) => async (dispatch) => {   
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost(id);
        
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    } 

}

export const getPosts = (page) => async (dispatch) => {   
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPosts(page);
        
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    } 

}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`);
        
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (id, comment) => async (dispatch) => {
    try {
        const { data } = await api.comment(id, comment);

        dispatch({ type: COMMENT, payload: data });
    } catch (error) {
        console.log(error);
    }
}