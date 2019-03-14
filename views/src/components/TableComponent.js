import { connect } from 'react-redux';
import * as actions from '../actions/articles';
import React from 'react';
import { Link } from 'react-router-dom';

import Pagination from "./Pagination";
import "react-table/react-table.css";
import ReactTable from "react-table";
import PropTypes from "prop-types";


class TableComponent extends React.Component {

	componentWillMount() {
		this.props.getArticles();
	}

	handleEdit(article) {
		this.props.Show(article, 'editArticle')
	}

	handleView(article) {
		this.props.Show(article, 'popupArticle')
	}

	render() {
		console.log('TableComponent', this.props)
		return(
			<div className="articleList">
				{ this.props.articles.articles ? <Table data={this.props.articles.articles}/> : ''}
			</div>
		)
	}

}

class Table extends React.Component {

	render() {
		let article = ''
		return(  
			<ReactTable
			    PaginationComponent={Pagination}
			    defaultPageSize={4}
			    className="-striped -highlight"
			    data={this.props.data}
			    columns={[
			      {
			        Header: "Id",
			        accessor: "_id",
			        sortable: false,
			        resizable:false
			      },
			      {
			        Header: "Title",
			        accessor: "title",
			        sortable: false,
			        resizable:false
			      },
			      {
			        Header: "Body",
			        accessor: "body",
			        sortable: false,
			        resizable:false
			      },
			      {
			        Header: " ",
			        sortable: false,
			        resizable:false,
			        Cell: row => (
			       		<div className="">
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

			       		</div>
			        )
			      },
			    ]}
			/>
		)
	}
}

function mapStateToProps({ articles }) {
    return {
       articles
    };
}

export default connect(mapStateToProps, actions)(TableComponent);