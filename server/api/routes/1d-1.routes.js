module.exports = function(app) {
    var controller = require('../controllers/1d-1.controller');

    const feature = '1d-1';

    app.route(`/${feature}/request`)
        .get(controller.request);

    app.route(`/${feature}/killall`)
        .get(controller.killAll);

    app.route(`/${feature}/guess/:sessionId`)
        .post(controller.guess);

};
