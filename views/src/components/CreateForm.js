import React from 'react';
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Header from './Header';
import {connect} from 'react-redux';
import * as actions from '../actions/articles';

class CreateForm extends React.Component {
	state = {
		location : this.handleLocation(),
		title: this.props.article ? this.props.article.title : '',
		body: this.props.article ? this.props.article.body : ''
	}

	handleLocation() {
		if(window.location.pathname.indexOf('create') > 0) {
			return 'create'
		}
		return 'edit'
	}

	handleInput(value, name) {
		this.setState({
			[name] : value
		})
	}

	handleSubmit(e) {
		e.preventDefault()
		console.log(e.currentTarget)
	}

	Capitalize(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	render() {
		let buttonState = 
		this.state.location === 'create' ?
			this.Capitalize(this.state.location) :
			'Edit'
		console.log('CreateForm', this.props)
		return(
			<Form className="form-edit" onSubmit={this.handleSubmit}>
				<Header headerState={this.state.location}/>
				<div className="form-edit-form">
					<p>Title</p>
					<input required type="text" name='title' maxLength="25"
					onChange={(e) => this.handleInput(e.target.value, e.target.name)}
					value={this.state.title}/>
					<p>Body</p>
					<textarea 
						required name="body" cols="30" 
						placeholder='Article body ...'
						maxLength="50"
						onChange={(e) => this.handleInput(e.target.value, e.target.name)}
						rows="10" value={this.state.body}>
					</textarea>
				</div>
				<button className="btn btn-light table-row-button">{buttonState}</button>
				<Link to="/articles">
					<button className="btn btn-light table-row-button">Cancel</button>
				</Link>
			</Form>
		)
	}
};

function mapStateToProps({articles}) {
  return {
    articles,
  };
}

export default connect(mapStateToProps, actions)(CreateForm);
