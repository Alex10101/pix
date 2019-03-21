import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticles } from '../actions/articles';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

class TableComponent extends Component {
	state = {
		// page: Number(this.handleURL('page')) || 0,
		// limit: Number(this.handleURL('limit')) || 10,
		page: 0,
		pageSize: 4,
		articles: []
	}

	shouldComponentUpdate(nextProps, nextState) {
		// console.log(currentRecords)
		// console.log('rendered', this.rendered)
		// console.log('nextState', nextState, 'this.state', this.state)
		// console.log('shouldUpdate', nextProps.shouldUpdate)
		if(nextState.page !== this.state.page) {
			return true
		}

		let oneToShow = nextState.page * (nextState.pageSize)
		let article = this.state.articles[oneToShow]
		if(article) {
		  if(article._id) {
				console.log(false)
				return false
			}
		}
		// place for new ones is empty && it's not a new page
		return true
	}

	getData(page) {
		console.log('getData', new Date())
		page = (page || this.state.page) 
		let limit = this.state.pageSize
		// console.log(page, limit)
  	this.props.getArticles(page, limit);
	}

	componentWillMount() {
		this.getData()
	}

	componentWillReceiveProps(nextProps) {
		let data = nextProps.articles.articles
		// console.log('componentWillReceiveProps', data)
		if(!this.state.articles.length) {
			this.setDummyData(nextProps)
			return;
		}

		if(data.length < this.state.pageSize) {
			for(let i = data.length; i < this.state.pageSize; i++) {
				data.push({})
			}
		}
		this.setData(data)
	}

	setData(articles, arr) {
		// console.log('setData')
		let skip = this.state.page * this.state.pageSize
  	let to = skip + this.state.pageSize
  		 arr = arr || this.state.articles

  	for(let i = skip; i < to; i++){
  		arr[i] = articles[i - skip]
  	}

  	this.setState({
  		articles: arr
  	})
	}

	setDummyData(data) {
		let props = data.articles
  	let count = props.count
  	let arr = []

  	for(let i = 0; i < count; i++) {
  		arr.push({})
  	}
  	this.setData(data.articles.articles, arr)
	}

  handlePaginate(pageArg) {
  	// console.log('handlePaginate', pageArg, this.state.page)
  	if(pageArg === this.state.page) {
  		// console.log('return')
  		return
  	}
  	// console.log('pageArg', pageArg, 'state', this.state.page)
  	let page = pageArg || 1
  	let firstToShow = page * this.state.pageSize
  	// console.log('firstToShow', this.state.articles[firstToShow], page, this.state.pageSize)
  	if(!this.state.articles[firstToShow]._id){
  		this.getData(page)
  	}		
  	
  		// console.log('setState')
  		this.setState({
	  		page: pageArg
	  	})
  }

  render() {
  	// console.log('page:', this.state.page, 'articles:', this.state.articles)
  	console.log('TableComponent', 'props :', this.props, 'state : ', this.state)
  	if(!this.props.articles.articles) {
  		return('')
  	}
    return (
      <ReactTable
			    PaginationComponent={Pagination}
			    defaultPageSize={this.state.pageSize}
			    page={this.state.page}
			    getProps={(state, rowInfo, column) => {
			    	console.log('state', state)
			    }}
    			onPageChange={page => this.handlePaginate(page)}
			    className="-striped -highlight"
			    NoDataComponent={() => <p></p>}
			    data={this.state.articles}
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
			        	if(!article._id) {
			        		// Errors when pageSize > data.length. 
			        		// Dosen't throws before setting AJAX call on each page change.
			        		// What the hell.
			        		return([])
			        	}
			        	return(
				       		<React.Fragment>
					       		<Link to={{pathname: `/articles/${article._id}/edit`}}>
							      	<button
							      		className='btn btn-light table-row-button'
							      		onClick={() => this.props.handlePopup(false)}
							      	>Edit</button>
						      	</Link>
						      	<button
						      		className='btn btn-light table-row-button'
						      		onClick={() => this.props.handlePopup(article)}
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

const mapStateToProps = state => ({
  articles: state.articles
})

export default connect(mapStateToProps, { getArticles: getArticles })(TableComponent);


	// handleURL(name) {
	//   	let url = new URLSearchParams(window.location.search)
	//   	let str = url.get(name)
	//   	if(str !== false) {
	//   		let num = Number(str)
	//   		if(num > 0) {
	//   			return num - 1
	//   		} else {
	//   			return num
	//   		}
	//   	} else {
	//   		return false
	//   	}
	// }