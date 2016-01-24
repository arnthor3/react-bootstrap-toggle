## React-Bootstrap-Toggle

This is a react component of the http://www.bootstraptoggle.com/ project.

You need to include the bootstrap css file and also the bootstrap2-toggle css file in your app.

If you are using the npm version then you can include it from the module like this.

```sh
<link rel="stylesheet" href="node_modules/lib/bootstrap2-toggle.css">
```

Or you could import it to your SASS or LESS build.

```sh
@import "node_modules/lib/bootstrap2-toggle.css";
```

## NPM

```sh
npm install react-bootstrap-toggle --save
```

### Props

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-on="Enabled"`.

```html
<input type="checkbox" data-toggle="toggle" data-on="Enabled" data-off="Disabled">
<input type="checkbox" id="toggle-two">
<script>
  $(function() {
    $('#toggle-two').bootstrapToggle({
      on: 'Enabled',
      off: 'Disabled'
    });
  })
</script>
```

Name|Type|Default|Description|
---|---|---|---
on|string/html|"On"|Text of the on toggle
off|string/html|"Off"|Text of the off toggle
size|string|"normal"|Size of the toggle. Possible values are `large`, `normal`, `small`, `mini`.
onstyle|string|"primary"|Style of the on toggle. Possible values are `default`, `primary`, `success`, `info`, `warning`, `danger`
offstyle|string|"default"|Style of the off toggle. Possible values are `default`, `primary`, `success`, `info`, `warning`, `danger`
style|string| |Appends the value to the class attribute of the toggle. This can be used to apply custom styles. Refer to Custom Styles for reference.
width|integer|*null*|Sets the width of the toggle. if set to *null*, width will be calculated.
height|integer|*null*|Sets the height of the toggle. if set to *null*, height will be calculated.

### onChange
Invoked when the component state changes.


