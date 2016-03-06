# [react-headroom](https://github.com/xiaokekeT/react-headroom)

The excellent [headroom.js](https://github.com/WickyNilliams/headroom.js) as a React.js component.

# Demo
Live demo: xiaokekeT.github.io/react-headroom

# Installation

The easiest way to use headroom is to install it from NPM and include it in your own React build process (using Browserify, Webpack, etc).

You can also use the standalone build by including dist/react-headroom.js in your page. If you use this, make sure you have already included React, and it is available as a global variable.

# Usage

```js
import React from 'react'
import Headroom from 'react-headroom'

class Root extends React.Component {
  render () {
    return (
      <Headroom tolerance={5} offset={200} classes={{
          initial: 'animated',
          pinned: 'slideInUp',
          unpinned: 'fadeOut'
        }}
      >
        Hello
      </Headroom>
    )
  }
}
```

# License
MIT
