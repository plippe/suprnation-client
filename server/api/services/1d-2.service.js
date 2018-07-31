var commonService = require('./common.service');
var socketService = require('./socket.service');

var sessions = {};

exports.newSession = function () {
    commonService.deactivateSessions(sessions);

    var sessionId = commonService.randomString(8);
    const text = "Next Up: Pixel Coordinates!";
    var pattern = commonService.convertStringToASCII(commonService.convertStringToRandomCase(text));

    var socket = socketService.initSocket(sessionId, function (socket) {
            console.log(`Session [${sessionId}] Connected to :  ${socket.id}`);
        },
        function (socket) {
            console.log(`Session [${sessionId}] Disconnected from :  ${socket.id}`);
        });

    sessions[sessionId] = {id: sessionId, pattern: pattern, socket: socket, active: true};
    initStream(sessions[sessionId]);

    return sessions[sessionId];
};

exports.killAll = function () {

};

exports.getSessionById = function (sessionId) {
    return sessions[sessionId];
};

exports.isPatternCorrect = function (session, pattern) {
    return commonService.test1DPattern(session.pattern, pattern);
};

function initStream(session) {
    var count = 0;
    // TODO turn off after x amount of minutes
    var startTime = new Date();
    var interval = setInterval(function () {
        if (session.active) {
            // console.log(session.pattern[count % session.pattern.length]);
            socketService.emit(session.socket, {value: session.pattern[count % session.pattern.length]});
            count++;
        } else {
            clearInterval(interval);
        }
    }, 50);
}
