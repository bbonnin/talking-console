const speechSynthesis = window.speechSynthesis

function playLogMessage(type, ...text) {
    const msg = new SpeechSynthesisUtterance()

    switch (type) {
    case 'log':
        msg.text = 'There is a new log'
        msg.volume = 0.1
        break
    case 'warn':
        msg.text = 'Warn, something weird happened'
        msg.volume = 0.5
        break
    case 'error':
        msg.text = 'Oh my god, stop this application ! There is an error'
        msg.volume = 1
        break
    }

    msg.text += ' and the content is ' + text.join(' ')

    speechSynthesis.speak(msg)
}

function speakingConsole(consolefct) {
    return function() {
        playLogMessage(consolefct.name, ...arguments)
        consolefct(...arguments)
    }
}

console.log = speakingConsole(console.log)
console.warn = speakingConsole(console.warn)
console.error = speakingConsole(console.error)

