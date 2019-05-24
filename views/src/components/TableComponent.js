import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticles, setEditable, setDisplaying, getArticle } from '../actions/articles';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { withRouter } from 'react-router-dom'

class TableComponent extends Component {
	state = {
		page: this.handleURL('page') || 0,
		limit: this.handleURL('limit') || 4,
		loading: true
	}

	componentWillReceiveProps(nextProps, nextState) {
		if(nextProps.articles.refresh === true) {
			this.addData()
		}

	  if(this.state.loading) {
	  	this.setState({
				loading: false
			})
	  }
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

	addData = () => {
		let all = this.countPages()
		let sp = this.state.page + 1

		let t = this.props.articles

		console.log(t)
		// if(!t.articles.length && t.articles.count) {
		// 	this.setState({
		// 		page: this.state.page - 1
		// 	})
		// }

		if(all < sp || all === sp) {
			return
		}

		if(this.state.page === 0) {
			this.props.getArticle(1, 1)
			return
		}

		this.props.getArticle(sp, this.state.limit)
	}

	fetchData = (state) => {
		this.setState({
			loading: true
		})

		this.props.getArticles(state.page, state.defaultPageSize)
			.then((data) => {
				this.props.history.push(`?page=${state.page}`)
			})
	}

	sliceData = () => {
		if(!this.props.articles.articles)	return []
		
		if(this.state.limit < this.props.articles.articles.length) {
			return this.props.articles.articles.slice(0, this.state.limit)
		}

		return this.props.articles.articles
	}

	countPages = () => {
		return Math.ceil(this.props.articles.count / this.state.limit) || 0
	}

  render() {
  	// console.log('ReactTable', this.props)
  	// console.log(this.state)

  	const { page, loading, limit } = this.state
  	const { setEditable, setDisplaying, articles } = this.props
  	const { fetchData, sliceData, countPages } = this

    return (
      <ReactTable
      		manual
      		defaultPage={page}
			    defaultPageSize={limit}
			    onFetchData={fetchData}
			    page={this.state.page}
    			onPageChange={page => this.setState({page})}
			    loading={loading}
			    PaginationComponent={Pagination}
			    pages={countPages()}			    
			    className="-striped -highlight"
			    NoDataComponent={() => <p></p>}
			    data={sliceData()}
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
			        	if(articles.page === 0 && data.index <	articles.rcount) {
			        		return(
			        			<button
			        				style={{marginLeft: "65px"}}
						      		className='btn btn-light table-row-button'
						      		onClick={() => setDisplaying(data.original, data.index, true)}
						      	>View</button>
			        		)
			        	}
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
						      		onClick={() => setDisplaying(data.original, data.index, false)}
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

export default withRouter(connect(mapStateToProps, { getArticles, setEditable, setDisplaying, getArticle })(TableComponent));
