import { setDisplaying } from '../actions/articles.js';

export default function ( state = false, action) {
    switch( action.type ) {
        case setDisplaying:
	        	if(state && state._id === action.payload._id) {
	        		return false
	        	}
            return  action.payload || false;
        default:
            return state;
    }
}