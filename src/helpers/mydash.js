export const identity = (value) => value;

export const last = (list) => {
  if (Array.isArray(list) && !!list.length) {
    return list[list.length - 1];
  }
  return undefined;
};

export const first = (list) => {
  if (Array.isArray(list) && !!list.length) {
    return list[0];
  }
  return undefined;
};

export const range = (start, end, step, isRight) => {
  if (end !== undefined) {
    const arr = [];

    for (
      let i = start;
      step === 0 ? arr.length + 1 < end : end < 1 ? i > end : i < end;
      i = i + (step !== undefined ? step : 1)
    ) {
      arr.push(i);
    }

    return arr;
  }

  if (start < 0) {
    const arr = [];

    for (let i = 0; i > start; --i) {
      arr.push(i);
    }

    return arr;
  }
  if (isRight) {
    return [...new Array(start).keys()].reverse();
  }
  return [...new Array(start).keys()];
};

function getTag(value) {
  if (value === null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return toString.call(value);
}

export const isEmpty = (value) => {
  if (
    typeof value === "boolean" ||
    value === undefined ||
    value === null ||
    typeof value === "number" ||
    value.length === 0
  )
    return true;

  if (Array.isArray(value) || typeof value === "object" || value.length !== 0) {
    return false;
  }
  const tag = getTag(value);
  if (tag === "[object Map]" || tag === "[object Set]") {
    return !value.size;
  }

  return true;
};
