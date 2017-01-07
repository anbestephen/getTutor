import axios from 'axios';
import { FETCH_USERS, SINGLE_USER, CATEGORY_USERS } from './types';

const ROOT_URL = 'http://localhost:3000';

export function fetchAllUsers() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/users/getall`)
            .then(response => {
                dispatch({
                    type: FETCH_USERS,
                    payload: response.data
                });
            })
            .catch(error => {
                console.log('error white getting all users:', error);
            });
    };
}

export function getSingleUser(id) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/user/${id}`)
            .then(response => {
                dispatch({
                    type: SINGLE_USER,
                    payload: response.data
                });
            })
            .catch(error => {
                console.log('error white getting single user detail:', error);
            });
    };
}

export function getCategoryUsers(phrase) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/users/${phrase}`)
            .then(response => {
                dispatch({
                    type: CATEGORY_USERS,
                    payload: response.data
                });
            })
            .catch(error => {
                console.log('error white getting category users:', error);
            });
    };
}
