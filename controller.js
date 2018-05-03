const Elevator = require('./elevator');

class ElevatorController {
  constructor(elevators=1, floors=1) {
    // init the requested # of elevators
    this.elevators = new Array(4).map((a, i) => new Elevator(i, this));
    this.floors = floors;
  }

  requestElevator(from, to) {
    // determine which elevator gets it
    const closest = this.elevators.reduce((ret, elevator) => {
      if (ret === false || ret > (Math.abs(elevator.floor - from))) {
        ret = elevator;
      }
      return ret;
    }, false);

    const occupiedPassing = this.elevators.reduce((ret, elevator) => {
      if (elevator.occupied) {
        // and will pass from     and direction
        ret = elevator;
      }
      return ret;
    }, false);


  }

  log(event) {
    console.log(`Elevator ${event.id} ${event} ${event.value ? `to ${event.value}`: ''}`);
  }
}
