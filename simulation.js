const Controller = require('./controller');
const controller = new Controller(2, 10);

controller.requestElevator(5, 10);
controller.requestElevator(4, 1);

//console.log(controller);