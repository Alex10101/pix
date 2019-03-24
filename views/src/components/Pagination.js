import React, { Component } from "react";

// The following code based on this example : https://codesandbox.io/s/012ywx6mp0

const defaultButton = props => <button {...props}>{props.children}</button>;

class Pagination extends Component {
  state = {
    visiblePages: this.getVisiblePages(null, this.props.pages)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, nextProps.pages)
      });
    }

    this.changePage(nextProps.page + 1);
  }

  filterPages(visiblePages, totalPages) {
    return visiblePages.filter(page => page <= totalPages);
  };

  getVisiblePages(page, total) {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [ 1, 2, 3, 4, 5 ];
      }
    }
  };

  changePage(page) {
    const activePage = this.props.page + 1;
    if (page === activePage) {
      return;
    }
    const visiblePages = this.getVisiblePages(page, this.props.pages);
    this.setState({
      visiblePages: this.filterPages(visiblePages, this.props.pages)
    });
    this.props.onPageChange(page - 1);
  }

  render() {
    const { PageButtonComponent = defaultButton } = this.props;
    const { visiblePages } = this.state;
    const activePage = this.props.page + 1;
    return (
      <div className="Table__pagination">
        <div className="Table__prevPageWrapper">
          <PageButtonComponent
            className="Table__pageButton"
            onClick={() => {
              if (activePage === 1) return;
              this.changePage(activePage - 1);
            }}
            disabled={activePage === 1}
          >
          </PageButtonComponent>
        </div>
        <div className="Table__visiblePagesWrapper">
          {visiblePages.map((page, index, array) => {
            return (
              <React.Fragment key={page}>
                <PageButtonComponent
                  key={page}
                  className={
                    activePage === page
                      ? "Table__pageButton Table__pageButton--active"
                      : "Table__pageButton"
                  }
                  onClick={this.changePage.bind(this, page)}
                >
                  {array[index - 1] + 2 < page ? `...${page}` : page}
                </PageButtonComponent>
                <div key={page + 'div'} className="Table__pageButton__Line">
                  {index === visiblePages.length - 1 ? '' : '|'} 
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="Table__nextPageWrapper">
          <PageButtonComponent
            className="Table__pageButton"
            onClick={() => {
              if (activePage === this.props.pages) return;
              this.changePage(activePage + 1);
            }}
            disabled={activePage === this.props.pages}
          >
          </PageButtonComponent>
        </div>
      </div>
    );
  }
}

export default Pagination
