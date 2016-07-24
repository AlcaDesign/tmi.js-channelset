const tmijsClient = require('tmi.js').client,
	
	normalizeChannel = require('tmi.js/lib/utils').channel;

class ChannelSet extends Set {
	constructor(client) {
		if(!(client instanceof tmijsClient)) {
			throw new TypeError('parameter 1 is not of type \'tmijs.client\'.');
		}
		super(client.channels || []);
		this.client = client;
		
		this.client.on('join', (channel, username, self) => {
			if(self) {
				this.add(channel);
			}
		});
		this.client.on('part', (channel, username, self) => {
			if(self) {
				this.delete(channel);
			}
		});
		this.client.on('disconnected', reason => {
			this.clear();
		});
	}
	
	add(value) {
		return super.add(normalizeChannel(value));
	}
	delete(value) {
		return super.delete(normalizeChannel(value));
	}
	has(value) {
		return super.has(normalizeChannel(value));
	}
}

module.exports = ChannelSet;
