import * as api from '../../api';

// Action Creators

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

export const getPosts = () => async (dispatch) => {   
    try {
        const { data } = await api.fetchPosts();
        
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
    } 

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error);
    }
}