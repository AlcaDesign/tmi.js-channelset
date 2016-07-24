# What

This module tracks channels joins, channels parts, and client disconnects as a
Set instance.

# Install

```
$ npm install tmi.js-channelset
```

# Usage

```javascript
const ChannelSet = require('tmi.js-channelset');

let client = new tmijs.client({
			/* ... */
		}),
	channels = ChannelSet(client);
```

# Example

```
$ git clone https://github.com/AlcaDesign/tmi.js-channelset.git
$ cd tmi.js-channelset
$ npm install
$ node examples\basic.js
```
