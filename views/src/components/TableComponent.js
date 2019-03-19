import {connect} from 'react-redux';
import * as actions from '../actions/articles';
import React from 'react';
import {Link} from 'react-router-dom';

import Pagination from './Pagination';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';

class TableComponent extends React.Component {
	state = {
		page: this.handleURL('page') || 0,
	}

	componentWillMount() {
		let page = 2
		let limit = 1
  	this.props.getArticles(page, limit);
	}

	componentWillUnmount() {
		// console.log(123)
	}

  handleData() {
  	// console.log(this.props.articles.count)
  	return this.props.articles.articles
  }

	handleURL(name) {
	  	let url = new URLSearchParams(window.location.search)
	  	let str = url.get('page')
	  	if(str !== false) {
	  		let num = Number(str)
	  		if(num > 0) {
	  			return num - 1
	  		} else {
	  			return num
	  		}
	  	} else {
	  		return false
	  	}
	}

  render() {
  	// console.log('Table', this.props)
    return (
      <ReactTable
			    PaginationComponent={Pagination}
			    defaultPageSize={1}
			    page={this.state.page}
    			onPageChange={page => this.setState({page})}
			    className="-striped -highlight"
			    data={this.handleData()}
			    columns={[
			      {
			        Header: 'Id',
			        accessor: '_id',
			        sortable: false,
			        resizable: false,
			      },
			      {
			        Header: 'Title',
			        accessor: 'title',
			        sortable: false,
			        resizable: false,
			      },
			      {
			        Header: 'Body',
			        accessor: 'body',
			        sortable: false,
			        resizable: false,
			      },
			      {
			        Header: ' ',
			        sortable: false,
			        resizable: false,
			        Cell: (data) => {
			        	let article = data.original;
			        	return(
				       		<React.Fragment>
					       		<Link to={{pathname: `/articles/${article._id}/edit`, article}}>
							      	<button
							      		className='btn btn-light table-row-button'
							      		onClick={() => this.props.Show(article, 'editArticle')}
							      	>Edit</button>
						      	</Link>
						      	<button
						      		className='btn btn-light table-row-button'
						      		onClick={() => this.props.Show(article, 'popupArticle')}
						      	>View</button>
				       		</React.Fragment>
				        )
			        },
			      },
			    ]}
      />
    );
  }
}

function mapStateToProps({articles}) {
  return {
    articles,
  };
}

export default connect(mapStateToProps, actions)(TableComponent);
