import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticles, setVisible } from '../actions/articles';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

class TableComponent extends Component {
	state = {
		page: this.handleURL('page') || 0,
		limit: this.handleURL('limit') || 4,
		loading: true
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
		this.setState({
			loading: true
		})
		this.props.getArticles(state.page, state.defaultPageSize)
  	.then((data) => {
  		this.setState({
				loading: false
			})
  	})
	}

  render() {

  	const { page, loading, limit } = this.state
  	const { setVisible, handlePopup, articles } = this.props
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
			        	let article = data.original;
			        	return(
				       		<React.Fragment>
					       		<Link to={{pathname: `/articles/${article._id}/edit`}}>
							      	<button
							      		className='btn btn-light table-row-button'
							      		onClick={() => setVisible(article, data.index)}
							      	>Edit</button>
						      	</Link>
						      	<button
						      		className='btn btn-light table-row-button'
						      		onClick={() => handlePopup(article)}
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

export default connect(mapStateToProps, { getArticles, setVisible })(TableComponent);
