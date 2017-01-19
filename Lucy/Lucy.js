const discord = require('discord.js')
const moment = require('moment')

const Cmd = require('./Cmd')
const EventHandlers = require('./EventHandlers')
const Recording = require('./Recording')
const Services = require('./Services')

class Lucy {
	constructor (cfg) {
		// store config
		this.cfg = cfg

		// set up empty objects
		this.lastAnnouncedShow = this.cache = {}

		// load some libraries
		this.cmd = new Cmd()
		this.eventHandlers = new EventHandlers()
		this.recording = new Recording(this)
		this.services = new Services()

		// instanciate a Discord bot
		this.bot = new discord.Client()

		// set things up
		this.bot.on('ready', () => {
			this.eventHandlers.onReady.call(this)
		})

		// set moment locale
		moment.locale('de')
	}

	login () {
		return this.bot.login(this.cfg.bot_token)
	}

	setGame (game) {
		return this.bot.user.setGame(game, 'https://bronyradiogermany.com')
	}

	setStatus (status) {
		return this.bot.user.setStatus(status)
	}

	broadcast (message) {
		return this.bot.channels.get(this.cfg.channel_id).sendMessage(message)
	}
}

module.exports = Lucy