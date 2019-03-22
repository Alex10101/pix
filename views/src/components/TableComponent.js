import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticles, setEditable, setDisplaying } from '../actions/articles';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

class TableComponent extends Component {
	state = {
		page: this.handleURL('page') || 0,
		limit: this.handleURL('limit') || 4,
		loading: false
	}

	handleURL(name) {
  	let url = new URLSearchParams(window.location.search)
  	let str = url.get(name)
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

	fetchData = (state) => {
		// this.setState({
		// 	loading: true
		// })
		this.props.getArticles(state.page, state.defaultPageSize)
  	.then(
  	// 	setTimeout((data) => {
  	// 	this.setState({
			// 	loading: false
			// })
  	// }, 300)
  	)
	}

  render() {

  	console.log('render')
  	const { page, loading, limit } = this.state
  	const { setEditable, setDisplaying, articles } = this.props
  	const { fetchData } = this

    return (
      <ReactTable
      		manual
      		defaultPage={page}
			    defaultPageSize={limit}
			    onFetchData={fetchData}
			    loading={loading}
			    PaginationComponent={Pagination}
			    pages={Math.ceil(articles.count / limit) || 0}			    
			    className="-striped -highlight"
			    NoDataComponent={() => <p></p>}
			    data={articles.articles}
			    sortable={false}
			    resizable={false}
			    columns={[
			      {
			        Header: 'Id',
			        accessor: '_id',
			      },
			      {
			        Header: 'Title',
			        accessor: 'title',
			      },
			      {
			        Header: 'Body',
			        accessor: 'body',
			      },
			      {
			        Header: undefined,
			        Cell: (data) => {
			        	return(
				       		<React.Fragment>
					       		<Link to={{pathname: `/articles/${data.original._id}/edit`}}>
							      	<button
							      		className='btn btn-light table-row-button'
							      		onClick={() => setEditable(data.original, data.index)}
							      	>Edit</button>
						      	</Link>
						      	<button
						      		className='btn btn-light table-row-button'
						      		onClick={() => setDisplaying(data.original)}
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
    articles
  };
}

export default connect(mapStateToProps, { getArticles, setEditable, setDisplaying })(TableComponent);
