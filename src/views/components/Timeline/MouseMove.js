class MouseMove {
  constructor() {
    this.start = false;
    this.x = 0;
    this.offset = {
      value: 0,
    };
    this.startx = 0;
  }
  handleMousewhell(event) {
    const { wheelDelta } = event;
    this.offset = {
      value: wheelDelta / 2,
    };
    if (event.preventDefault) {
      event.preventDefault();
      return false;
    }
  }
}
export default new MouseMove();
