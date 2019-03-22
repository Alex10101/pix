import React from "react";
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { editArticle, postArticle } from '../actions/articles';

const CreateForm = ({ history, data, editArticle, postArticle}) => {
		let createState = {
			button: 'Create',
			send: postArticle,
			article: { title:'', body:'' }
		}

		let editState = {
			button: 'Edit',
			send: editArticle,
			article: data.article
		}

		let create = history.location.pathname.indexOf('create') > -1 ? true : false
		let state = create ? createState : editState

		if(!create && !state.article) {
			history.push('/articles')
		}

		const handleSubmit = (e) => {
			e.preventDefault()
			let newdata = {
				title: e.currentTarget.title.value,
				body: e.currentTarget.body.value
			}		
			state.send(newdata, state.article._id, data.index).then(data => {
				history.push('/articles')
			})
		} 		

		return(
			<Form className="form-edit" onSubmit={handleSubmit}>
				<div className="form-edit-form">
					<p>Title</p>
					<input required type="text" name='title' maxLength="25"
					defaultValue={state.article.title}/>
					<p>Body</p>
					<textarea 
						required name="body" cols="30" 
						placeholder='Article body ...'
						maxLength="50"
						rows="10" defaultValue={state.article.body}>
					</textarea>
				</div>
				<button type="submit" className="btn btn-light table-row-button">{state.button}</button>
				<Link to="/articles">
					<button className="btn btn-light table-row-button">Cancel</button>
				</Link>
			</Form>
		)
};

function mapStateToProps({ edit }) {
  return {
    data: edit,
  };
}

export default connect(mapStateToProps, {editArticle, postArticle})(CreateForm);
