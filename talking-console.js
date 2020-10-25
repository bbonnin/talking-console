const speechSynthesis = window.speechSynthesis

class TalkingConsole {
    constructor(options = {}) {
        this.supportedMethods = [ 'log', 'warn', 'error' ]

        this.volumes = options.volumes || {
            log: 0.2,
            warn: 0.7,
            error: 1
        }

        this.prefixMsg = options.prefixMsg || {
            log: 'There is a new log',
            warn: 'Warn, something weird happened',
            error: 'Oh my god, stop this application ! There is an error'
        }

        this.wrapConsole = typeof(options.wrapConsole) !== 'undefined' ? options.wrapConsole : true

        this.restoreMethods()
        this.setLogMethods()
    }

    restoreMethods () {
        for (const method of this.supportedMethods) {
            if (console['__' + method]) {
                console[method] = console['__' + method]
                delete console['__' + method]
            }
        }
    }

    setLogMethods () {
        for (const method of this.supportedMethods) {
            if (this.wrapConsole) {
                console['__' + method] = console[method]
                console[method] = function () {
                    this.playLogMessage(method, ...arguments)
                    console['__' + method](...arguments)
                }.bind(this)
            } else {
                this[method] = function () {
                    this.playLogMessage(method, ...arguments)
                    console[method](...arguments)
                }.bind(this)
            }
        }
    }

    playLogMessage(type, ...text) {
        const msg = new SpeechSynthesisUtterance()

        msg.volume = this.volumes[type]

        if (this.prefixMsg[type]) {
            msg.text = this.prefixMsg[type] + ' and the content is '
        }

        msg.text += text.join(' ')

        speechSynthesis.speak(msg)
    }
}

window.tconsole = new TalkingConsole({ wrapConsole: true })
