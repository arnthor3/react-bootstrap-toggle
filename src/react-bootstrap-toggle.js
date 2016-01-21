import React from 'react';

export default class ReactBootstrapSwitcher extends React.Component {
  
  constructor(props) {
    super(props);
    //set the state to either the prop.active value or default it to true
    this.state = { active : (typeof props.active !== 'undefined')? props.active : true };
  }

  onClick() {
    this.props.onClick && this.props.onClick(!this.state.active);
    this.setState({active : !this.state.active});
  }

  render() {

    let activeClass = 'toggle btn ' + this.props.labelOneClass;
    let inactiveClass = 'toggle btn off ' + this.props.labelTwoClass;
    let labelOneClass = 'btn toggle-on ' + this.props.labelOneClass;
    let labelTwoClass = 'btn toggle-off ' + this.props.labelTwoClass;
    
    if (this.state.active) {
      labelOneClass += ' active';
    } else {
      labelTwoClass += ' active';
    }
    
    let style = {
      width  : this.props.width,
      height : this.props.height
    };

    return (
        <div ref='switcher' className={this.state.active ? activeClass : inactiveClass} 
            onClick={this.onClick.bind(this)} style={style}>
          <div className="toggle-group">
            <label className={labelOneClass}>{this.props.options[0]}</label>
            <label className={labelTwoClass}>{this.props.options[1]}</label>
            <span className="toggle-handle btn btn-default"></span>
          </div>
        </div>
    );
  }
}

ReactBootstrapSwitcher.propTypes = { 
    labelOneClass : React.PropTypes.string,
    labelTwoClass : React.PropTypes.string,
    height        : React.PropTypes.string,
    width         : React.PropTypes.string,
    options       : React.PropTypes.array,
    active        : React.PropTypes.bool,
    onChange      : React.PropTypes.func

};

ReactBootstrapSwitcher.defaultProps = {
    labelOneClass : 'btn-primary',
    labelTwoClass : 'btn-default',
    width         : '100',
    height        : '35',
    options       : ['Yes', 'No'],
    active        : true

}



