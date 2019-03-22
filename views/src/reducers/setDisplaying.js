import { setDisplaying } from '../actions/articles.js';

export default function ( state = false, action) {
    switch( action.type ) {
        case setDisplaying:
            return  action.payload || false;
        default:
            return state;
    }
}