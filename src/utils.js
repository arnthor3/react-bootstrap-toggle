const PADDING = {
  RIGHT: 'padding-right',
  LEFT: 'padding-left',
  TOP: 'padding-top',
  BOTTOM: 'padding-bottom',
};

const MARGIN = {
  RIGHT: 'margin-right',
  LEFT: 'margin-left',
  TOP: 'margin-top',
  BOTTOM: 'margin-bottom',
};

const getStyle = (el, str) =>
  parseInt(getComputedStyle(el).getPropertyValue(str), 10);

const getTextNodeBoundingClientRect = (node) => {
  const newNode = node.length ? node[node.length - 1] : node;
  if (typeof document.createRange === 'function') {
    const range = document.createRange();
    if (range.getBoundingClientRect) {
      range.selectNodeContents(newNode);
      return range.getBoundingClientRect();
    }
  }
  return 0;
};


export const compareWithMarginOfError = (num1, num2, isSet) =>
  (isSet || Math.abs(num1 - num2) < 1.01);

export const getDimension = (node) => {
  const margin = {};

  const padding = {
    right: getStyle(node, PADDING.RIGHT),
    left: getStyle(node, PADDING.LEFT),
    top: getStyle(node, PADDING.TOP),
    bottom: getStyle(node, PADDING.BOTTOM),
  };

  if (node.childElementCount) {
    const child = node.childNodes[0];
    margin.height = getStyle(child, MARGIN.BOTTOM) + getStyle(child, MARGIN.TOP);
    margin.width = getStyle(child, MARGIN.LEFT) + getStyle(child, MARGIN.RIGHT);

    return {
      width: (child.scrollWidth || child.offsetWidth) +
      margin.width + padding.left + padding.right,
      height: (child.scrollHeight || child.offsetHeight) +
      margin.height + padding.top + padding.bottom,
    };
  }

  const range = getTextNodeBoundingClientRect(node.childNodes);

  return {
    width: range.width + padding.right + padding.left,
    height: range.height + padding.bottom + padding.top,
  };
};

