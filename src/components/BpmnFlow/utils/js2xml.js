/* eslint-disable */
import * as _ from "lodash";

function loadXMLDoc() {
  let xmlDoc = "";
  try {
    //Internet Explorer
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
  } catch (e) {
    try {
      //Firefox, Mozilla, Opera, etc.
      xmlDoc = document.implementation.createDocument("", "", null);
    } catch (e) {
      console.log(e.message);
    }
  }
  return xmlDoc;
}

function CreatXmlDoc(obj) {
  this.tagName = obj.tagName;
  let children = obj.children.map(function (item) {
    if (typeof item === "object") {
      item = new CreatXmlDoc(item);
    }
    return item;
  });
  this.children = children;
  this.attr = obj.attr;
}

CreatXmlDoc.prototype.render = function () {
  // let el = document.createElement(this.tagName)
  let xmlDoc = loadXMLDoc();
  if (!xmlDoc) {
    return;
  }
  let el = xmlDoc.createElement(this.tagName);

  let children = this.children || [];
  // 添加属性
  _.forEach(this.attr, (value, key) => {
    // let _attr = document.createAttribute(key)
    // _attr.value = value
    // el.setAttributeNode(_attr)
    el.setAttribute(key, value);
  });
  // 添加子元素
  _.forEach(children, (child) => {
    let childEl =
      child instanceof CreatXmlDoc
        ? child.render()
        : document.createTextNode(child);
    el.appendChild(childEl);
  });
  return el;
};

export function jsonToXmlDoc(object) {
  const doc = new CreatXmlDoc(object);
  // 最外层节点默认添加 xmlns 属性
  const reg = new RegExp(' xmlns="http://www.w3.org/1999/xhtml"', "g");
  let xmlstr = new XMLSerializer().serializeToString(doc.render());
  return xmlstr.replace(reg, "");
}

export function parseXmlString(xmlDocStr) {
  var isIEParser = window.ActiveXObject || "ActiveXObject" in window;
  if (xmlDocStr === undefined) {
    return null;
  }
  var xmlDoc;
  if (window.DOMParser) {
    var parser = new window.DOMParser();
    var parsererrorNS = null;
    // IE9+ now is here
    if (!isIEParser) {
      try {
        parsererrorNS = parser
          .parseFromString("INVALID", "text/xml")
          .getElementsByTagName("parsererror")[0].namespaceURI;
      } catch (err) {
        parsererrorNS = null;
      }
    }
    try {
      xmlDoc = parser.parseFromString(xmlDocStr, "text/xml");
      if (
        parsererrorNS != null &&
        xmlDoc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0
      ) {
        //throw new Error('Error parsing XML: '+xmlDocStr);
        xmlDoc = null;
      }
    } catch (err) {
      xmlDoc = null;
    }
  } else {
    // IE :(
    if (xmlDocStr.indexOf("<?") === 0) {
      xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf("?>") + 2);
    }
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = "false";
    xmlDoc.loadXML(xmlDocStr);
  }
  return xmlDoc;
}
