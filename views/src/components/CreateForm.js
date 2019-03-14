import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';

class CreateForm extends React.Component {
	state = {
		article : this.props.article || false
	}

	render() {
		console.log('CreateForm', this.props)
		return(
			<div className="form-edit">
				<Header headerState={this.state.article ? '/ edit' : "/ create"}/>
				<div className="form-edit-form">
					<p>Title</p>
					<input required type="text" name='title' 
					value={this.state.article.title || undefined}/>
					<p>Body</p>
					<textarea 
						required name="body" cols="30" 
						placeholder='Article body ...'
						rows="10" value={this.state.article.body || undefined}>
					</textarea>
				</div>
				<Link to="/articles">Cancel</Link>
			</div>
		)
	}
};

export default CreateForm

