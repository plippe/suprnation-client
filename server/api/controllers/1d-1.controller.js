'use strict';

var service = require('../services/1d-1.service');

exports.request = function (req, res) {
    var newSession = service.newSession();
    var result = {id: newSession.id};
    res.json(result);
};

exports.killAll = function (req, res) {
    service.killAll();
    res.json(true);
};

exports.guess = function (req, res) {
    var sessionId = req.params.sessionId;
    var body = req.body;
    var result = false;
    var session = service.getSessionById(sessionId);

    if (!!session && !!body && !!body.pattern) {
        result = service.isPatternCorrect(session, body.pattern);
        if (result) {
            session.active = false;
        }
    }
    res.json(result);
};
