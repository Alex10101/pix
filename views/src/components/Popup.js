import React from 'react';
import { connect } from 'react-redux';
import { setDisplaying, deleteArticle } from '../actions/articles';

const Popup = ({ article, setDisplaying, deleteArticle }) => {

  const handleClick = (e) => {
    let ifclass = e.target.className.indexOf('popup') > -1
    let ifname = e.target.innerHTML === 'View'
    if(!ifclass && !ifname && e.target.parentNode) {
      if(e.target.parentNode.className.indexOf('popup') === -1){
        hidePopup()
        window.removeEventListener('click', handleClick)
      }
    }
  }

  window.addEventListener('click', handleClick)

  const hidePopup = () => {
    setDisplaying(false)
  }

  if(!article) return ''

  return(
    <div className="popup-container">
      <div className="popup-title">
        {article.title}
        <span onClick={hidePopup}></span>
      </div>
      <div className="popup-body">{article.body}</div>
      <div className="popup-time">
        <p className="popup-p">Created : <span>{article.created_at}</span></p>
        <p className="popup-p">Updated : <span>{article.updated_at || 'Null'}</span></p>
      </div>
      {
        article.editable === undefined && 
        <button 
          className="btn btn-light delete" 
          onClick={ () => {
            deleteArticle(article._id, article.index)
            hidePopup()
          }}
        >Delete</button>
      }
    </div>
  )
}

function mapStateToProps({display}) {
  return {
    article: display
  };
}

export default connect(mapStateToProps, { setDisplaying, deleteArticle })(Popup) 