## React-Bootstrap-Toggle
[![Build Status](https://travis-ci.org/arnthor3/react-bootstrap-toggle.svg?branch=master)](https://travis-ci.org/arnthor3/react-bootstrap-toggle)
[![Coverage Status](https://coveralls.io/repos/github/arnthor3/react-bootstrap-toggle/badge.svg?branch=master)](https://coveralls.io/github/arnthor3/react-bootstrap-toggle?branch=master)

This is a react component of the http://www.bootstraptoggle.com/ project.

### Usage

You need to include the bootstrap css file and also the bootstrap2-toggle css file in your app.

If you are using the npm version then you can include it from the module like this.

```html
<link rel="stylesheet" href="node_modules/lib/bootstrap2-toggle.css">
```

Or you could import it to your SASS or LESS build.

```css
@import "node_modules/lib/bootstrap2-toggle.css";
```

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Toggle from 'react-bootstrap-toggle';

class Form extends Componentn {
  constructor() {
    super();
    this.state = { toggleActive: false };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  render() {
    return (
      <form>
        <input type="text">
        <input type="number">
        .....
        <Toggle
          onClick={this.onToggle}
          on={<h2>ON</h2>}
          off={<h2>OFF</h2>}
          active={this.state.toggleActive}
        />
      </form>
    )
  }

}

ReactDOM.render(<ReactBootstrapToggle
                on={on}
                off={off}
                active={false}
                onChange={onChange} />, document.getElementById('app') );

```

## Install via NPM

```sh
npm install react-bootstrap-toggle --save
```

### Props

Name|Type|Default|Description|
---|---|---|---
active|boolean|true| Sets the initial state of the toggle
on|string/html|"On"|Text of the on toggle
off|string/html|"Off"|Text of the off toggle
size|string|"normal"|Size of the toggle. Possible values are `large`, `normal`, `small`, `mini`.
onstyle|string|"primary"|Style of the on toggle. Possible values are `default`, `primary`, `success`, `info`, `warning`, `danger`
offstyle|string|"default"|Style of the off toggle. Possible values are `default`, `primary`, `success`, `info`, `warning`, `danger`
width|integer|*null*|Sets the width of the toggle. if set to *null*, width will be calculated.
height|integer|*null*|Sets the height of the toggle. if set to *null*, height will be calculated.
onClick|function|*null*|A Callback that returns the current state of the toggle

### Updates

