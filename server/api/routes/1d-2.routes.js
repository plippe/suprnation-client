module.exports = function(app) {
    var controller = require('../controllers/1d-2.controller');

    const feature = '1d-2';

    app.route(`/${feature}/request`)
        .get(controller.request);

    app.route(`/${feature}/killall`)
        .get(controller.killAll);

    app.route(`/${feature}/guess/:sessionId`)
        .post(controller.guess);

};
