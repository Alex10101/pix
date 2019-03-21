import React from 'react';
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from '../actions/articles';

class CreateForm extends React.Component {
	state = {
		location : this.handleLocation(),
		article: undefined,
		title: undefined,
		body: undefined
	}

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps')
		// to prevent the blank inputs on page reloading
		if(this.state.location === "create") {
			return
		}
		let article = this.props.article
		// if(nextProps.article === false) {
		// 	let id = window.location.pathname.split('/')[2]
		// 	article = nextProps.articles.articles.filter(article => {
		// 		return article._id === id
		// 	})[0]
		// }
		this.setState({
			article,
			title: article.title,
			body: article.body
		})
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
		let data = {
			title: this.state.title,
			body: this.state.body
		}

		if(this.state.title === this.state.article.title && 
			  this.state.body === this.state.article.body) {
			return;
		}

		if(this.state.location === 'create') {
			this.props.postArticle(data)
		} else {
			let id = this.state.article._id
			this.props.editArticle(id, data)
		}
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
			<Form className="form-edit" onSubmit={this.handleSubmit.bind(this)}>
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
