import {connect} from 'react-redux';
import * as actions from '../actions/articles';
import React from 'react';
import {Link} from 'react-router-dom';

import Pagination from './Pagination';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';


class TableComponent extends React.Component {

  componentWillMount() {
    this.props.getArticles();
  }

  handleEdit(article) {
  	console.log('handleEdit', article)
    this.props.Show(article, 'editArticle');
  }

  handleView(article) {
    this.props.Show(article, 'popupArticle');
  }

  render() {
    console.log('TableComponent', this.props);
    return (
      <div className="articleList">
      { 
      	this.props.articles.articles ? 
      	<Table 
      		data={this.props.articles.articles}
      		handleEdit={this.handleEdit.bind(this)}
      		handleView={this.handleView.bind(this)}
      	/> 
      	: ''
      }
      </div>
    );
  }
}



class Table extends React.Component {
	state = {
		page: 0
	}

  render() {
  	console.log('Table', this.props)
    return (
      <ReactTable
			    PaginationComponent={Pagination}
			    defaultPageSize={4}
			    page={this.state.page}
    			onPageChange={page => this.setState({page})}
			    className="-striped -highlight"
			    data={this.props.data}
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
							      		onClick={() => {this.props.handleEdit(article)}}
							      	>Edit</button>
						      	</Link>
						      	<button
						      		className='btn btn-light table-row-button'
						      		onClick={() => this.props.handleView(article)}
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
