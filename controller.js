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
      if (!elevator.inService) return ret;
      if (ret === false || ret > (Math.abs(elevator.floor - from))) {
        ret = elevator;
      }
      return ret;
    }, false);

    const occupiedPassing = this.elevators.reduce((ret, elevator) => {
      if (elevator.occupied) {
        let requestedFloorDirection = from - elevator.floor > 0;
        if (requestedFloorDirection) {
          // requested floor(5) is higher than elevators current floor(1)
          // elevator must be moving up past from
          if (elevator.goingUp && elevator.destination >= from) {
            ret = elevator;
          }
        } else {
          // requested floor(1) is lower than elevators current floor(5)
          // elevator must be moving down further than from
          if (!elevator.goingUp && elevator.destination <= from) {
            ret = elevator;
          }
        }
      }
      return ret;
    }, false);

    if (closest === 0 || !occupiedPassing) {
      closest.moveTo(from);
      closest.occupied = true;
      closest.moveTo(to);
    } else {
      occupiedPassing.destination = from;
    }
  }

  log(event) {
    console.log(`Elevator ${event.id} ${event} ${event.value ? `to ${event.value}`: ''}`);
  }
}
