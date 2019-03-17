import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {

	shouldComponentUpdate() {
		if(!this.props.headerState || this.state.message === this.props.headerState) {
			return false
		}
		return true
	}

	render() {
		// console.log('Header', this.props)
		let message = this.props.headerState ?
		`/ ${this.props.headerState}` :
		<Link to="/articles/create">
		  <button
  		  className='btn btn-light table-row-button header-button'
  		>Create</button>
		</Link>
		return(
			<div className="container-header">
				<div className='header-main'>Articles {message}</div> 
			</div>
		)
	}
};

export default Header

