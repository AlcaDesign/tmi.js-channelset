/*
	Expected Timeline:
	
	[0.000]: connected
	[0.100]: joined first channel
	[2.100]: joined second channel
	[2.200]: parted first channel
	[4.100]: disconnected
*/

const tmijs = require('tmi.js'),
	ChannelSet = require('..'),
	
	utils = require('tmi.js/lib/utils');

let joinTheseChannels = [ 'alca', 'twitchplayspokemon' ],
	
	client = new tmijs.client({
			connection: { reconnect: true },
			channels: [ 'alca', 'twitchplayspokemon' ]
		}),
	channels = new ChannelSet(client),
	
	start = false;

function log(...text) {
	if(start === false) {
		start = Date.now();
	}
	let now = new Date(new Date() - start),
		seconds = now.getSeconds(),
		milli = ('00' + now.getMilliseconds()).slice(-3);
	text.unshift(`[${seconds}.${milli}]`);
	console.log.apply(console, text);
}

function colorize(code) {
	return (...text) => `\u001b[${code}m${text.join(' ')}\u001b[39m`;
}

let red = colorize(91),
	green = colorize(92),
	cyan = colorize(96),
	grey = colorize(90),
	white = colorize(97);

function check(reason) {
	log(white('Checking channels:'), reason ? grey(`(${reason})`) : '');
	joinTheseChannels.forEach(name => {
		log(' -', (channels.has(name) ? green : red)(name));
	});
}

client.connect()
	.then(() => check('connected'))
	.then(() => utils.promiseDelay(4000))
	.then(() => client.disconnect());

client.on('join', (channel, username, self) => {
	if(self) {
		check(`joined ${channel}`);
		if(joinTheseChannels.indexOf(channel.replace('#', '')) === 0) {
			setTimeout(client.part.bind(client), 2000, channel);
		}
	}
});

client.on('part', (channel, username, self) => {
	if(self) check(`parted ${channel}`);
});

client.on('disconnected', reason => {
	check(`disconnected: ${reason}`);
});
