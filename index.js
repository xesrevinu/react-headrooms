import React from 'react'
import ReactDom from 'react-dom'
import Headroom from 'react-headrooms'

class Demo extends React.Component {
  render () {
    return (
      <div>
        <Headroom tolerance={5} offset={50} classes={
            {
              initial: 'animated',
              pinned: 'slideInDown',
              unpinned: 'slideOutUp'
            }
          }
        >
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Project name</a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li className="active"><a href="#">Home</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Contact</a></li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" className="divider"></li>
                      <li className="dropdown-header">Nav header</li>
                      <li><a href="#">Separated link</a></li>
                      <li><a href="#">One more separated link</a></li>
                    </ul>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="active"><a href="./">Default <span className="sr-only">(current)</span></a></li>
                  <li><a href="#">Static top</a></li>
                  <li><a href="#">Fixed top</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </Headroom>
        <div style={{height: '1500px'}}>
          <div className="container">
            <p className="text-center">Scroll <i className="glyphicon glyphicon-arrow-down"></i> </p>
              <p className="text-center">more see {'  '}
                <a href="http://wicky.nillia.ms/headroom.js/playroom/">headroom.js/playroom</a>
              </p>
          </div>
        </div>
      </div>
    )
  }
}

ReactDom.render(<Demo />, document.getElementById('app'))
