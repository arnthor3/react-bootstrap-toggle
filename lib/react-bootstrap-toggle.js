'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PADDING = {
  RIGHT: 'padding-right',
  LEFT: 'padding-left',
  TOP: 'padding-top',
  BOTTOM: 'padding-bottom'
};

var MARGIN = {
  RIGHT: 'margin-right',
  LEFT: 'margin-left',
  TOP: 'margin-top',
  BOTTOM: 'margin-bottom'
};

var getStyle = function getStyle(el, str) {
  return parseInt(getComputedStyle(el).getPropertyValue(str), 10);
};

var getTextNodeBoundingClientRect = function getTextNodeBoundingClientRect(node) {
  node = node.length ? node[node.length - 1] : node;
  if (document.createRange) {
    var range = document.createRange();
    if (range.getBoundingClientRect) {
      range.selectNodeContents(node);
      return range.getBoundingClientRect();
    }
  }
  return 0;
};

var getDimension = function getDimension(node) {
  var margin = {},
      padding = {
    right: getStyle(node, PADDING.RIGHT),
    left: getStyle(node, PADDING.LEFT),
    top: getStyle(node, PADDING.TOP),
    bottom: getStyle(node, PADDING.BOTTOM)
  };

  if (node.childElementCount) {
    var child = node.childNodes[0];
    margin.height = getStyle(child, MARGIN.BOTTOM) + getStyle(child, MARGIN.TOP);
    margin.width = getStyle(child, MARGIN.LEFT) + getStyle(child, MARGIN.RIGHT);

    return {
      width: (child.scrollWidth || child.offsetWidth) + margin.width + padding.left + padding.right,
      height: (child.scrollHeight || child.offsetHeight) + margin.height + padding.top + padding.bottom
    };
  }

  var range = getTextNodeBoundingClientRect(node.childNodes);

  return {
    width: range.width + padding.right + padding.left,
    height: range.height + padding.bottom + padding.top
  };
};

var ReactBootstrapToggle = function (_React$Component) {
  _inherits(ReactBootstrapToggle, _React$Component);

  function ReactBootstrapToggle(props) {
    _classCallCheck(this, ReactBootstrapToggle);

    var _this = _possibleConstructorReturn(this, (ReactBootstrapToggle.__proto__ || Object.getPrototypeOf(ReactBootstrapToggle)).call(this, props));

    _this.state = { width: null, height: null };
    return _this;
  }

  _createClass(ReactBootstrapToggle, [{
    key: 'onClick',
    value: function onClick() {
      if (this.props.disabled) return;
      this.props.onChange && this.props.onChange(!this.state.active);
      this.setState({ active: !this.state.active });
    }
  }, {
    key: 'setDimensions',
    value: function setDimensions(props) {
      var onDim = getDimension(this.refs.on);
      var offDim = getDimension(this.refs.off);

      var width = Math.max(onDim.width, offDim.width);
      var height = Math.max(onDim.height, offDim.height);
      var active = props.active !== undefined ? props.active : this.state.active;
      this.setState({
        width: props.width || width,
        height: props.height || height,
        active: active
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setDimensions(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setDimensions(props);
    }
  }, {
    key: 'getSizeClass',
    value: function getSizeClass() {
      if (this.props.size === 'large') return 'btn-lg';
      if (this.props.size === 'small') return 'btn-sm';
      if (this.props.size === 'mini') return 'btn-xs';
      return '';
    }
  }, {
    key: 'render',
    value: function render() {
      var onstyle = 'btn-' + this.props.onstyle;
      var offstyle = 'btn-' + this.props.offstyle;
      var toggleOn = 'toggle-on';
      var toggleOff = 'toggle-off';
      var sizeClass = this.getSizeClass();
      var activeClass = 'btn toggle ' + sizeClass + ' ' + onstyle;
      var inactiveClass = 'btn toggle ' + sizeClass + ' ' + offstyle + ' off';
      var onStyleClass = 'btn ' + toggleOn + ' ' + sizeClass + ' ' + onstyle;
      var offStyleClass = 'btn ' + toggleOff + ' ' + sizeClass + ' ' + offstyle;

      var style = {
        width: this.state.width,
        height: this.state.height
      };

      return _react2.default.createElement(
        'div',
        {
          ref: 'switcher',
          disabled: this.props.disabled,
          className: this.state.active ? activeClass : inactiveClass,
          onClick: this.onClick.bind(this),
          style: style },
        _react2.default.createElement(
          'div',
          { className: 'toggle-group' },
          _react2.default.createElement(
            'label',
            { ref: 'on', className: onStyleClass },
            this.props.on
          ),
          _react2.default.createElement(
            'label',
            { ref: 'off', className: offStyleClass },
            this.props.off
          ),
          _react2.default.createElement('span', { ref: 'toggle', className: 'toggle-handle btn btn-' + this.props.handlestyle })
        )
      );
    }
  }]);

  return ReactBootstrapToggle;
}(_react2.default.Component);

exports.default = ReactBootstrapToggle;


ReactBootstrapToggle.propTypes = {
  // Holds the className for label one
  onstyle: _react2.default.PropTypes.string,
  // Holds the className for label two
  offstyle: _react2.default.PropTypes.string,
  // Holds the className for the middle handle
  handlestyle: _react2.default.PropTypes.string,
  // Height prop
  height: _react2.default.PropTypes.string,
  // Width prop
  width: _react2.default.PropTypes.string,
  // The on and off elements defaults to 'On' and 'Off'
  on: _react2.default.PropTypes.node,
  off: _react2.default.PropTypes.node,
  // The initial state of the component
  active: _react2.default.PropTypes.bool,
  // Sets the button to disabled
  disabled: _react2.default.PropTypes.bool,
  // Set the size of the button defaults to normal
  size: _react2.default.PropTypes.string,
  // The onChange event, returns the state as the argument
  onChange: _react2.default.PropTypes.func
};

ReactBootstrapToggle.defaultProps = {
  onstyle: 'primary',
  offstyle: 'default',
  handlestyle: 'default',
  width: '',
  height: '',
  on: 'On',
  off: 'Off',
  disabled: false,
  size: 'normal',
  active: true
};