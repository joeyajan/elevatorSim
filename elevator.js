class Elevator {
  constructor(id, controller) {
    this.id = id;
    this.controller = controller;
    this.floor = 1; // current floor
    this.occupied = false;
    this.floorsPassed = 0;
    this.doorOpen = false;
    this.goingUp = true;
    this.destination = 1;
    this.inService = true;
    this.pendingDestinations = [];
  }

  moveTo(floor, dest) {
    this.occupied = true;
    this.doorOpen && this.closeDoor();
    this.destination = floor;

    // set direction
    this.goingUp = floor > this.floor;

    let self = this;
    (function mover() {
      if (self.goingUp) {
        self.floor++;
      } else {
        self.floor--;
      }

      self.floorsPassed++;
      self.controller.log({event: 'floorChanged', value: self.floor, id: self.id});

      if (self.floor === self.destination) {
        // landed at current dest for pickup or drop off
        self.openDoor();
        self.occupied = false;

        // if a dest was set, add it to the list
        if (dest) {
          self.pendingDestinations.push(dest);
        }

        // if there is a pending dest, move to it
        let pending = self.pendingDestinations.pop();
        if (pending) {
          self.moveTo(pending);
        }
      } else {
        setTimeout(mover, 1000);
      }
    })();

    // done after every move
    if (this.floorsPassed >= 100) {
      this.inService = false;
    }
  }


  checkFloor() {

  }

  // move needs to have a destination in mind
  // each tick is a move, then test floor for if dest
      // if dest, open and set unoccupied
  // if not dest, then tick


  openDoor() {
    this.doorOpen = true;
    this.controller.log({event: 'doorOpened', id: this.id});
  }

  setOccupied() {
    this.occupied = true;
  }

  closeDoor() {
    this.doorOpen = false;
    this.controller.log({event: 'doorClosed', id: this.id});
  }
}

module.exports = Elevator;
