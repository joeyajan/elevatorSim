const Elevator = require('./elevator');

class ElevatorController {
  constructor(elevators=1, floors=1) {
    // init the requested # of elevators
    this.elevators = [];
    for(let x=0; x<elevators; x++) {
      this.elevators.push(new Elevator(x + 1, this));
    }
    this.floors = floors;
  }

  requestElevator(from, to) {
    if (to < 1 || to > this.floors) {
      throw new Error('Invalid direction');
    }
    // determine which elevator takes a request

    // find closest, unoccupied, in service elevator to requested floor
    const closest = this.elevators.reduce((ret, elevator) => {
      if (!elevator.inService || elevator.occupied) return ret;
      if (ret === false || ret > (Math.abs(elevator.floor - from))) {
        ret = elevator;
      }
      return ret;
    }, false);

    // find an occupied elevator that will pass the requested floor
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

    if (occupiedPassing /* @TODO && !closestDistance === 0*/) {
      console.log(`Using elevator ${occupiedPassing.id} to pickup from ${from} and deliver to ${to}`);
      occupiedPassing.destination = from;
      occupiedPassing.pendingDestinations.push(to);
    } else {
      if (closest) {
        console.log(`Using elevator ${closest.id} to pickup from ${from} and deliver to ${to}`);
        closest.moveTo(from, to);
      } else {
        console.log('All elevators busy...');
        // @TODO: log request and add a pending bucket
      }
    }
  }

  log(event) {
    console.log(`Elevator ${event.id} ${event.event} ${event.value ? `to ${event.value}`: ''}`);
  }
}

module.exports = ElevatorController;
