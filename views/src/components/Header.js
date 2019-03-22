import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {

	const handleUrl = () => {
		let url = window.location.pathname;
		let num = url.lastIndexOf('/');
		url = url.substring(num + 1);

	  switch( url ) {
	    case 'edit':
	        return  '/ edit'
	    case 'create':
	        return  '/ create'

	    default:
	      return(
					<Link to="/articles/create">
				  	<button
		  		  	className='btn btn-light table-row-button header-button'	
		  			>Create</button>
					</Link>
				)
    }
	}

	return(
		<div className="container-header">
			<div className='header-main'>Articles {handleUrl()}</div> 
		</div>
	)
};

export default Header

