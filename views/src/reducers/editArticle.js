import { setEditable } from '../actions/articles.js';

export default function ( state = false, action) {
    switch( action.type ) {
        case setEditable:
            return  action.payload || false;
        default:
            return state;
    }
}