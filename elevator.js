class Elevator {
  constructor(id, controller) {
    this.id = id;
    this.controller = controller;
    this.floor = 0; // current floor
    this.occupied = false;
    this.floorsPassed = 0;
    this.doorOpen = false;
  }

  moveUp(floors=1) {
    this.floor++;
    this.floorsPassed++;
    this.controller.log({event: 'floorChanged', value: this.floor, id: this.id});
  }

  moveDown(floors=1) {
    this.floor--;
    this.floorsPassed++;
    this.controller.log({event: 'floorChanged', value: this.floor, id: this.id});
  }

  openDoor() {
    this.doorOpen = true;
    this.controller.log({event: 'doorOpened', id: this.id});
  }

  closeDoor() {
    this.doorOpen = false;
    this.controller.log({event: 'doorClosed', id: this.id});
  }
}

module.exports = Elevator;