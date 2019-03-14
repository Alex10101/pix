import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {
	state = {
		message : this.props.headerState || <Link to="/articles/create">Create</Link>
	}

	shouldComponentUpdate() {
		if(!this.props.headerState || this.state.message === this.props.headerState) {
			return false
		}
		return true
	}

	render() {
		// console.log('Header', this.props)
		return(
			<div className="container-header">
				<div className='header-main'>Articles {this.state.message}</div> 
			</div>
		)
	}
};

export default Header

