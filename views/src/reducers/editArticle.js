import * as articles from '../actions/articles.js';

export default function ( state = false, action) {
    switch( action.type ) {
        case articles.setVisible:
            return  action.payload || false;

        default:
            return state;
    }
}