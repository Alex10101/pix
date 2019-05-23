import React from "react";
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { editArticle, postArticle, deleteArticle } from '../actions/articles';

const AppForm = ({ history, data, editArticle, postArticle, deleteArticle }) => {

		let create = history.location.pathname.indexOf('create') > -1 ? true : false

		if(!create && data === false) {
			history.push('/articles')
			return('')
		}

		let createState = {
			button: 'Create',
			send: postArticle,
			article: { title:'', body:'' }
		}

		let editState = {
			button: 'Edit',
			send: editArticle,
			article: data.article,
			deleteArticle
		}

		let state = create ? createState : editState

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
			<React.Fragment>
				<Form className="form-edit" onSubmit={handleSubmit}>
					<div className="form-edit-form">
						<input required type="text" name='title' maxLength="25"
						defaultValue={state.article.title}/>
						<textarea 
							required name="body" cols="30" 
							placeholder='Article body ...'
							maxLength="50"
							rows="10" defaultValue={state.article.body}>
						</textarea>
						<div className="form-buttons">
							<button type="submit" className="btn btn-light table-row-button">{state.button}</button>
							<Link to="/articles">
								<button className="btn btn-light table-row-button">Cancel</button>
							</Link>
						</div>
					</div>
				</Form>
				{
	        state.deleteArticle && 
	        <button 
	          className="btn btn-light delete" 
	          onClick={ () => {
	           	state.deleteArticle(state.article._id, data.index) 
	           	history.push('/articles')
	          }}
	        >Delete</button>
	      }
      </React.Fragment>
		)
};

function mapStateToProps({ edit }) {
  return {
    data: edit,
  };
}

export default connect(mapStateToProps, { editArticle, postArticle, deleteArticle })(AppForm);