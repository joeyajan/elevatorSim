const Elevator = require('./elevator');

class ElevatorController {
  constructor(elevators=1, floors=1) {
    // init the requested # of elevators
    this.elevators = new Array(4).map((a, i) => new Elevator(i, this));
    this.floors = floors;
  }

  log(event) {
    console.log(`Elevator ${event.id} ${event} ${event.value ? `to ${event.value}`: ''}`);
  }
}
