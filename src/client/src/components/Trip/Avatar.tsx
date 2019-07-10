import React, {Component} from 'react';

class Avatar extends Component {
  render(){
    return(
      <div style={{width: '100%', height: '100%'}}>
        <img className="avatar" style={{borderRadius: '50%'}} src={this.props.src} />
      </div>
    )
  }
}

export default Avatar;