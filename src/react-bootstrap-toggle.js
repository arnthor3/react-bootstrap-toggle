import React from 'react';

export default class ReactBootstrapSwitcher extends React.Component {
  
  constructor(props) {
    super(props);
    //set the state to either the prop.active value or default it to true
    this.state = { active : (typeof props.active !== 'undefined')? props.active : true };
  }

  onClick() {
    this.props.onChange && this.props.onChange(!this.state.active);
    this.setState({active : !this.state.active});
  }

  render() {

    let activeClass = 'toggle btn';
    let inactiveClass = 'toggle btn btn-primary off ';
    
    let labelOneClass = 'btn toggle-on ' + this.props.labelOneClass;
    let labelTwoClass = 'btn toggle-off ' + this.props.labelTwoClass;
    
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
    // Holds the className for label one 
    labelOneClass : React.PropTypes.string,
    // Holds the className for label two
    labelTwoClass : React.PropTypes.string,
    // Height prop
    height        : React.PropTypes.string,
    // Width prop
    width         : React.PropTypes.string,
    // an array that holds the options Example : ['yes', 'no']
    options       : React.PropTypes.array,
    // The initial state of the component
    active        : React.PropTypes.bool,
    // The onChange event, returns the state as the argument
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



