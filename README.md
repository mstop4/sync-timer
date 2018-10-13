# Sync Timer

[![Build Status](https://travis-ci.com/mstop4/sync-timer.svg?branch=master)](https://travis-ci.com/mstop4/sync-timer)

An online stopwatch service. Multiple clients can display a synchronized timer by sharing and controlling a common timer on the server. Supports multiple timers simultaneously.

### The Problem

😐 "A group is practicing a presentation in the front of the room and they need help keeping track of time."

😄 "I know! I can use a timer app with a large display on my laptop and turn my screen towards them."

😲 "Oh no, now I can't easily see the screen to check the time or access the keyboard or touchpad to start and stop the timer."

🙂 "I know! I'll setup a second timer on my phone and start both timers simultaneously."

🤔 "Gee, I wish there was a way an easier way to synchronize these two timers..."

## Demos

[![Heroku](https://img.shields.io/website-up-down-green-red/https/sync-timer.herokuapp.com.svg?label=) https://sync-timer.herokuapp.com](https://sync-timer.herokuapp.com)  
[![Azure](https://img.shields.io/website-up-down-green-red/https/sync-timer.azurewebsites.net.svg?label=) https://sync-timer.azurewebsites.net](https://sync-timer.azurewebsites.net)  

## Stack

* Node 8.12.0
* Express 4
* Socke<span>t.io</span> 2
* Pug
* Sass
* uniqid

### Testing

* Mocha + Chai
* Puppeteer
* jsdom
* socket.io-client
