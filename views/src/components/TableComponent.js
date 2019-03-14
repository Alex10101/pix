import { connect } from 'react-redux';
import * as actions from '../actions/articles';
import Table from 'react-bootstrap/Table';
import React from 'react';
import { Link } from 'react-router-dom';

import Pagination from "./Pagination";
import "react-table/react-table.css";
import ReactTable from "react-table";
import PropTypes from "prop-types";


class TableComponent extends React.Component {

	state = {
		page: 1
	}

	componentWillMount() {
		this.props.getArticles();
	}

	handleEdit(article) {
		this.props.Show(article, 'editArticle')
	}

	handleView(article) {
		this.props.Show(article, 'popupArticle')
	}

	mapArticles() {

	}

	stashArticles() {

	}

	renderArticles() {
		let props = this.props.articles
		if(props.articles) {
			return props.articles.map( (article, index) => {
				return [
				    <tr key={'tr' + article._id}>
			      	  <td key={'id' + article._id}> {article._id} </td>
				      <td key={'title' + article._id}> {article.title} </td>
				      <td key={'body' + article._id}> {article.body} </td>
				      <td key={'buttons' + article._id}> 
				      	<Link to={{ pathname: `/articles/${article._id}/edit`, article}}>
					      	<button 
					      		className='btn btn-light table-row-button' 
					      		onClick={() => this.handleEdit(article)} 
					      	>Edit</button>
				      	</Link> 
				      	<button 
				      		className='btn btn-light table-row-button' 
				      		onClick={() => this.handleView(article)} 
				      	>View</button> 
				      </td>
			        </tr>
				]
			})
		}
	}

	render() {
		console.log('TableComponent', this.props)
		return(
			<div className="articleList">
				<Table striped bordered hover>
				  <thead>
				    <tr>
				      <th>Id</th>
				      <th>Title</th>
				      <th>Body</th>
				      <th></th>
				    </tr>
				  </thead>	
				  <tbody>			  
					{this.renderArticles()}
				  </tbody>
				</Table>
			</div>
		)
	}

}

function mapStateToProps({ articles }) {
    return {
       articles
    };
}

export default connect(mapStateToProps, actions)(TableComponent);