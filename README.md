# talking-console

Overrides the console methods with speech synthesis... Useless, but fun :)

## How to use

By default, a new global object `tconsole` is created. This object overrides the methods `log`, `warn` and `error` of console.
So, you just have to use the method `console.log`, `console.warn` and `console.error` as usual.

If you want to override the options, you can create a new instance:

```javascript
window.tconsole = new TalkingConsole({
	volumes: {
        log: 0.2,
        warn: 0.7,
        error: 1
    },
	prefixMsg: {
        log: 'New log',
        warn: 'New warn',
        error: 'New error'
    },
    wrapConsole: false
})
``` 

If `wrapConsole` is set to `false`, the methods of console are not overridden, you will have to use `tconsole`.
