// This example adapted from Matt Gallagher's "Minimalist Cocoa Programming"
// blog article:
//    http://cocoawithlove.com/2010/09/minimalist-cocoa-programming.html
var $ = require('NodObjC')

$.import('Cocoa')
$.import('WebKit')

var pool = $.NSAutoreleasePool('alloc')('init')
  , app  = $.NSApplication('sharedApplication')

app('setActivationPolicy', $.NSApplicationActivationPolicyRegular)

var menuBar = $.NSMenu('alloc')('init')('autorelease')
  , appMenuItem = $.NSMenuItem('alloc')('init')('autorelease')

menuBar('addItem', appMenuItem)
app('setMainMenu', menuBar)

var appMenu = $.NSMenu('alloc')('init')('autorelease')
  , appName = $('Hello NodeJS!')
  , quitTitle = $('Quit ')('stringByAppendingString', appName)
  , quitMenuItem = $.NSMenuItem('alloc')('initWithTitle', quitTitle
                                        ,'action', 'terminate:'
                                        ,'keyEquivalent', $('q'))('autorelease')
appMenu('addItem', quitMenuItem)
appMenuItem('setSubmenu', appMenu)

var styleMask = $.NSTitledWindowMask
              | $.NSResizableWindowMask
              | $.NSClosableWindowMask

var frame = $.NSMakeRect(0,0,640,480)
var window = $.NSWindow('alloc')('initWithContentRect', frame
                                ,'styleMask', styleMask
                                ,'backing', $.NSBackingStoreBuffered
                                ,'defer', false)('autorelease')
window('cascadeTopLeftFromPoint', $.NSMakePoint(20,20))
window('setTitle', appName)
window('makeKeyAndOrderFront', window)

var webView = $.WebView('alloc')('initWithFrame', frame)
window('setContentView', webView)

webView('mainFrame')('loadRequest', $.NSURLRequest('requestWithURL', $.NSURL('URLWithString', $('http://www.google.com'))))

// set up the app delegate
var AppDelegate = $.NSObject.extend('AppDelegate')
AppDelegate.addMethod('applicationDidFinishLaunching:', 'v@:@', function (self, _cmd, notif) {
    console.log('got applicationDidFinishLauching')
    console.log(notif)


})
AppDelegate.register()

var delegate = AppDelegate('alloc')('init')
app('setDelegate', delegate)

app('activateIgnoringOtherApps', true)
app('run')
