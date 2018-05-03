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
  }

  moveTo(floor) {
    this.doorOpen && this.closeDoor();
    this.destination = floor;

    // set direction
    this.goingUp = floor > this.floor;

    while(this.floor !== floor) {
      if (this.goingUp) {
        this.floor++;
      } else {
        this.floor--;
      }

      this.floorsPassed++;
      this.controller.log({event: 'floorChanged', value: this.floor, id: this.id});
    }

    this.openDoor();
    this.occupied = false;

    if (this.floorsPassed >= 100) {
      this.inService = false;
    }
  }

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
