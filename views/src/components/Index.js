import React from 'react';
import TableComponent from './TableComponent'

class Index extends React.Component {
  state = {
    popupArticle: false,
    display: true
  }

  componentDidMount() {
    this.handleDisplay()
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.handleDisplay()
    return true
  }

  handleDisplay() {
    let url = window.location.pathname
    let edit = url.indexOf('/edit') > -1
    let create = url.indexOf('/create') > -1
    
    if(!edit && !create && !this.state.display) {
      this.setState({
        display: true
      })
      return true
    } 

    if(edit || create) { 
      if(this.state.display === true) {
        this.setState({
          display: false
        })
      }
      return true
    }
    return false
  }

  handlePopup(article) {
    if(article._id !== this.state.popupArticle._id) {
      this.setState({
        popupArticle: article
      })
    } else {
      this.setState({
        popupArticle: false
      })
    }
  }

  Popup(article) {
    if(article) {
      return(
      <div className="popup-container">
        <div className="popup-title">
          {article.title}
          <span onClick={() => this.handlePopup(false, 'popupArticle')}></span>
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
      <div className="main-table" style={{display: this.state.display ? 'flex' : 'none' }} >
        <TableComponent
          handlePopup={this.handlePopup.bind(this)}     
        />
        {this.Popup(this.state.popupArticle)}
      </div>
    )
  }
};

export default Index

