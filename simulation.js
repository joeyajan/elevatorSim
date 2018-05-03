const Controller = require('./controller');
const controller = new Controller(2, 10);

controller.requestElevator(5, 10);
controller.requestElevator(3, 5);

//console.log(controller);