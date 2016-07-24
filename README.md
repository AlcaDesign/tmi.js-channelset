# What

This module tracks [tmi.js](https://npmjs.com/tmi.js) channel joins, channel
parts, and client disconnects as a [Set](https://mdn.io/Set) instance.

# Install

```
$ npm install --save tmi.js-channelset
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
