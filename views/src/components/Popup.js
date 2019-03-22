import React from 'react';
import { connect } from 'react-redux';
import { setDisplaying } from '../actions/articles';

const Popup = ({ article, setDisplaying }) => {
  console.log(article)

  const handleClick = (e) => {
    if(e.target.className.indexOf('popup') > -1) {
      console.log(123)
      setDisplaying(false)
      window.removeEventListener('click', handleClick)
    }
  }

  // window.addEventListener('click', handleClick)

  const handlePopup = () => {
    setDisplaying(false)
  }

  if(!article) {
    return ''
  }

  return(
    <div className="popup-container">
      <div className="popup-title">
        {article.title}
        <span onClick={handlePopup}></span>
      </div>
      <div className="popup-body">{article.body}</div>
      <div className="popup-time">
        <p>Created : <span>{article.created_at}</span></p>
        <p>Updated : <span>{article.updated_at || 'Null'}</span></p>
      </div>
    </div>
  )
}

function mapStateToProps({display}) {
  return {
    article: display
  };
}

export default connect(mapStateToProps, { setDisplaying })(Popup) 