export default class HolbertonClass {
  constructor(size, location) {
    this._size = size;
    this._location = location;
  }

  // Type conversion to Number
  valueOf() {
    return this._size;
  }

  // Type conversion to String
  toString() {
    return this._location;
  }
}
