var commonService = require('./common.service');
var socketService = require('./socket.service');
var data = require('./../data/2d-2');

var sessions = {};

exports.newSession = function () {
    commonService.deactivateSessions(sessions);

    var sessionId = commonService.randomString(8);
    sessions[sessionId] = {id: sessionId, pattern: data, active: false};

    var socketX = new Promise(function (resolve, reject) {
        sessions[sessionId].socketX = socketService.initSocket(sessionId + '-x', function (socket) {
                console.log(`Session [${sessionId}] Socket [X] Connected to :  ${socket.id}`);
                resolve();
            },
            function (socket) {
                console.log(`Session [${sessionId}] Socket [X] Disconnected from :  ${socket.id}`);
            });
    });

    var socketY = new Promise(function (resolve, reject) {
        sessions[sessionId].socketY = socketService.initSocket(sessionId + '-y', function (socket) {
                console.log(`Session [${sessionId}] Socket [Y] Connected to :  ${socket.id}`);
                resolve();
            },
            function (socket) {
                console.log(`Session [${sessionId}] Socket [Y] Disconnected from :  ${socket.id}`);
            });
    });

    Promise.all([socketX, socketY]).then(function () {
        initStream(sessions[sessionId]);
        sessions[sessionId].active = true;
    });

    return sessions[sessionId];
};

exports.killAll = function () {

};

exports.getSessionById = function (sessionId) {
    return sessions[sessionId];
};

exports.isPatternCorrect = function (session, pattern) {
    return commonService.test2DPattern(session.pattern, pattern);
};

function initStream(session) {
    var pattern = session.pattern;
    var count = 0;
    // TODO turn off after x amount of minutes
    var startTime = new Date();
    var interval = setInterval(function () {
        if (session.active) {
            // console.log(pattern[count % pattern.length].x);
            socketService.emit(session.socketX, {id: count, value: pattern[count % pattern.length].x});
            // console.log(pattern[count % pattern.length].y);
            socketService.emit(session.socketY, {id: count, value: pattern[count % pattern.length].y});
            count++;
        } else {
            clearInterval(interval);
        }
    }, 50);
}
