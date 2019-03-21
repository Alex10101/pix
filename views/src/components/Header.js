import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {

	handleUrl = () => {
    let url = window.location.pathname
    let edit = url.indexOf('/edit') > -1
    let create = url.indexOf('/create') > -1
		
		if(!edit && !create) {
			return(
			<Link to="/articles/create">
		  	<button
  		  	className='btn btn-light table-row-button header-button'	
  			>Create</button>
			</Link>
			)
		}
		if(edit) { return '/ edit'}
		if(create) { return '/ create'}
	}

	render() {
		// console.log('Header', this.props)
		return(
			<div className="container-header">
				<div className='header-main'>Articles {this.handleUrl()}</div> 
			</div>
		)
	}
};

export default Header

