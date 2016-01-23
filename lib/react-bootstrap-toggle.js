'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactBootstrapSwitcher = function (_React$Component) {
  _inherits(ReactBootstrapSwitcher, _React$Component);

  function ReactBootstrapSwitcher(props) {
    _classCallCheck(this, ReactBootstrapSwitcher);

    //set the state to either the prop.active value or default it to true

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactBootstrapSwitcher).call(this, props));

    _this.state = { active: typeof props.active !== 'undefined' ? props.active : true };
    return _this;
  }

  _createClass(ReactBootstrapSwitcher, [{
    key: 'onClick',
    value: function onClick() {
      this.props.onChange && this.props.onChange(!this.state.active);
      this.setState({ active: !this.state.active });
    }
  }, {
    key: 'render',
    value: function render() {

      var activeClass = 'toggle btn ' + this.props.labelOneClass;
      var inactiveClass = 'toggle btn off ' + this.props.labelTwoClass;
      var labelOneClass = 'btn toggle-on ' + this.props.labelOneClass;
      var labelTwoClass = 'btn toggle-off ' + this.props.labelTwoClass;

      var style = {
        width: this.props.width,
        height: this.props.height
      };

      return _react2.default.createElement(
        'div',
        { ref: 'switcher', className: this.state.active ? activeClass : inactiveClass,
          onClick: this.onClick.bind(this), style: style },
        _react2.default.createElement(
          'div',
          { className: 'toggle-group' },
          _react2.default.createElement(
            'label',
            { className: labelOneClass },
            this.props.options[0]
          ),
          _react2.default.createElement(
            'label',
            { className: labelTwoClass },
            this.props.options[1]
          ),
          _react2.default.createElement('span', { className: 'toggle-handle btn btn-default' })
        )
      );
    }
  }]);

  return ReactBootstrapSwitcher;
}(_react2.default.Component);

exports.default = ReactBootstrapSwitcher;

ReactBootstrapSwitcher.propTypes = {
  labelOneClass: _react2.default.PropTypes.string,
  labelTwoClass: _react2.default.PropTypes.string,
  height: _react2.default.PropTypes.string,
  width: _react2.default.PropTypes.string,
  options: _react2.default.PropTypes.array,
  active: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func

};

ReactBootstrapSwitcher.defaultProps = {
  labelOneClass: 'btn-primary',
  labelTwoClass: 'btn-default',
  width: '100',
  height: '35',
  options: ['Yes', 'No'],
  active: true

};