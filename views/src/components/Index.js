import React from 'react';
import TableComponent from './TableComponent'
import Header from './Header';

class Index extends React.Component {
  state = {
    popupArticle: false,
    editArticle: false
  }

  Show(article, name) {
    console.log('Show', name)
    if(article._id !== this.state[name]._id) {
      this.setState({
        [name]: article
      })
    }
  }

  Popup(article) {
    if(article) {
      return(
      <div className="popup-container">
        <div className="popup-title">
          {article.title}
          <span onClick={() => this.Show(false, 'popupArticle')}></span>
        </div>
        <div className="popup-body">{article.body}</div>
        <div className="popup-time">
          <p>Created : <span>{article.created_at}</span></p>
          <p>Updated : <span>{article.updated_at || 'Null'}</span></p>
        </div>
      </div>
    )
    }
  }


  render() {
    return(
      <div className="main-table">
      <Header  headerState = {this.state.editArticle || false }/>
        <TableComponent
          Show={this.Show.bind(this)}
        />
        {this.Popup(this.state.popupArticle)}
      </div>
    )
  }
};

export default Index

