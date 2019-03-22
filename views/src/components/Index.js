import React from 'react';
import TableComponent from './TableComponent'

class Index extends React.Component {
  state = {
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

  render() {
    return(
      <div className="main-table" style={{display: this.state.display ? 'flex' : 'none' }} >
        <TableComponent/>
      </div>
    )
  }
};

export default Index

