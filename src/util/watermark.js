let watermark = {};

let setWatermark = (str, str2) => {
  let id = "1.23452384164.123412416";

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }

  let can = document.createElement("canvas");
  can.width = 300;
  can.height = 200;
  let cans = can.getContext("2d");
  cans.rotate((-10 * Math.PI) / 90);
  cans.font = "18px Vedana";
  cans.fillStyle = "rgba(200, 200, 200, 0.30)";
  cans.textAlign = "center";
  cans.textBaseline = "Middle";
  cans.fillText(str, 100, 120);
  cans.fillText(str2, 100, 160);

  let div = document.createElement("div");
  div.id = id;
  div.style.pointerEvents = "none";
  div.style.top = "0px";
  div.style.left = "0px";
  div.style.position = "fixed";
  div.style.zIndex = "1000";
  div.style.width = document.documentElement.clientWidth + "px";
  div.style.height = document.documentElement.clientHeight + "px";
  div.style.background =
    "url(" + can.toDataURL("image/png") + ") left top repeat";
  document.body.appendChild(div);
  return id;
};

watermark.set = (str, str2) => {
  let id = setWatermark(str, str2);
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str, str2);
    }
  }, 500);
  window.onresize = () => {
    setWatermark(str, str2);
  };
};

export default watermark;
