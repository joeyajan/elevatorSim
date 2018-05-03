const Controller = require('./controller');
const controller = new Controller(2, 10);

controller.requestElevator(3, 5);
controller.requestElevator(5, 10);

// after both are off floor 1, add another request
setTimeout(function() {
  controller.requestElevator(1, 5);
}, 500);
