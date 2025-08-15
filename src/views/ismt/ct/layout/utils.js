export function dragHandle(event, { move, end }) {
  let startX = event.clientX;
  let startY = event.clientY;
  event.preventDefault && event.preventDefault();
  event.stopPropagation && event.stopPropagation();
  document.addEventListener("mousemove", mousemove, false);
  document.addEventListener("mouseup", up, false);
  function mousemove(e) {
    let clientX = e.clientX;
    let clientY = e.clientY;
    let xOffset = clientX - startX;
    let yOffset = clientY - startY;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    window.getSelection
      ? window.getSelection().removeAllRanges()
      : document.selection.empty();
    move &&
      move({
        clientX,
        clientY,
        xOffset,
        yOffset,
      });
  }
  function up(e) {
    document.removeEventListener("mousemove", mousemove, false);
    document.removeEventListener("mouseup", up, false);
    let clientX = e.clientX;
    let clientY = e.clientY;
    let xOffset = clientX - startX;
    let yOffset = clientY - startY;
    end &&
      end({
        clientX,
        clientY,
        xOffset,
        yOffset,
      });
  }
}

let cacheID = 0;
export class Widget {
  constructor({ position = {}, layout = {}, data = {} } = {}) {
    let { width = 0, height = 0, top = 0, left = 0 } = position;
    this.id = ++cacheID;
    this.position = {
      width,
      height,
      top,
      left,
      // 预览状态下的位置偏移量
      previewOffset: 0,
    };
    this.data = data;
    this.refresh(layout);
  }
  refresh({ gridSize = 0, gutter = 0 } = {}) {
    let { width, height, top, left, previewOffset } = this.position;
    this.screenPosition = {
      width: width * gridSize - gutter + "px",
      height: height * gridSize - gutter + "px",
      top: (top + previewOffset) * gridSize + "px",
      left: left * gridSize + "px",
    };
  }
  refreshData(data) {
    this.data = data;
  }
  setPosition(obj, layout) {
    let keys = "width,height,top,left".split(",");
    keys.forEach((key) => {
      if (typeof obj[key] === "number") {
        this.position[key] = obj[key];
      }
    });
    this.refresh(layout);
  }
  applyOffset() {
    this.position.top += this.position.previewOffset;
    this.setOffset(0);
  }
  setOffset(num) {
    this.position.previewOffset = num || 0;
  }
  getOffset() {
    return this.position.previewOffset;
  }
  parse() {
    return {
      ...this.data,
      card_top: this.position.top,
      card_left: this.position.left,
    };
  }
  parseTemp() {
    return {
      card_portrait: this.position.width,
      card_transver: this.position.height,
      card_top: this.position.top,
      card_left: this.position.left,
    };
  }
}

export function sortWidgetList(list) {
  // 将 widgets 按垂直方向排序，水平方向为第二顺序
  list.sort((widgetA, widgetB) => {
    let verticalCompare = widgetA.position.top - widgetB.position.top;
    return verticalCompare !== 0
      ? verticalCompare
      : widgetA.position.left - widgetB.position.left;
  });
}

// 判断两条线段是否相交
export function isLineCollision(x1, w1, x2, w2) {
  return !(x1 >= x2 + w2 || x1 + w1 <= x2);
}

// 矩形碰撞检测
export function isRectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x1 >= x2 && x1 >= x2 + w2) {
    return false;
  } else if (x1 <= x2 && x1 + w1 <= x2) {
    return false;
  } else if (y1 >= y2 && y1 >= y2 + h2) {
    return false;
  } else if (y1 <= y2 && y1 + h1 <= y2) {
    return false;
  }
  return true;
}

// 数组去重
export function uniqueArray(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i]);
    }
  }
  return res;
}
