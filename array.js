//constucter

const Array = function () {
  if (arguments.length === 1) {
    this.length = arguments[0];
    return;
  }
  for (let i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
  }
  this.length = arguments.length;
};

const array = function () {
  if (arguments.length === 1) {
    const res = new Array(arguments[0]);
    return res;
  }
  const res = new Array();
  for (let i = 0; i < arguments.length; i++) {
    res.push(arguments[i]);
  }
  return res;
};

// static mathods

Array.prototype[Symbol.toStringTag] = "Array";

Array.isArray = function (arg) {
  return Object.prototype.toString.call(arg) === "[object Array]";
};

Array.of = function () {
  const res = new Array();
  for (let i = 0; i < arguments.length; i++) {
    res.push(arguments[i]);
  }
  return res;
};

//push mathod

Array.prototype.push = function () {
  for (let i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i];
    this.length++;
  }
  return this.length;
};

//pop mathod

Array.prototype.pop = function () {
  let temp;
  temp = this[this.length - 1];
  delete this[this.length - 1];
  this.length--;
  return temp;
};

// unshift mathod

Array.prototype.unshift = function (el) {
  //loop in reverse untill the end and unshift all the elements by the amount of arguments givin (to make place for the new ones)
  for (let i = this.length; i >= 0; i--) {
    this[i + arguments.length - 1] = this[i - 1];
  }
  // fill up the array with the arguments givin
  for (let i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
    this.length++;
  }

  return this.length;
};

// shift mathod

Array.prototype.shift = function () {
  let temp = this[0];
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i + 1];
  }
  this.length--;
  delete this[this.length];
  return temp;
};

// concat mathod

Array.prototype.concat = function () {
  // create a new array to return results
  let res = new Array();

  // first push the array called from
  for (let i = 0; i < this.length; i++) {
    res.push(this[i]);
  }

  //push in the arguments
  for (let i = 0; i < arguments.length; i++) {
    // if the argument is an array
    if (Array.isArray(arguments[i])) {
      // push each el from the array
      for (let j = 0; j < arguments[i].length; j++) {
        res.push(arguments[i][j]);
      }

      // else push only the el
    } else {
      res.push(arguments[i]);
    }
  }

  return res;
};

// splice mathod

Array.prototype.splice = function (start, deleteAmount) {
  // if either start or deleteAmount is not a number throw  an error
  if (isNaN(start) || isNaN(deleteAmount))
    throw "Both start and deleteCount must be a number!";
  //If greater than the length of the array, start will be set to the length of the array
  if (start > this.length) start = this.length;

  //If array.length + start is less than 0, it will begin from index 0
  if (this.length + start < 0) start = 0;

  //If negative, it will begin that many elements from the end of the array
  if (start < 0) start = this.length + start;

  // If deleteCount is omitted, or if its value is equal to or larger than array.length - start
  if (deleteAmount >= this.length - start || deleteAmount === undefined)
    deleteAmount = this.length - start;

  let temp = new Array();
  let shouldAdd = arguments.length > 2;
  let argumentIndex = 2;
  let argumentsDiff = start + arguments.length - 2;

  //is there any items to delete?
  if (deleteAmount > 0) {
    //push the deleted elements to temp array
    for (let i = 0; i < deleteAmount; i++) {
      temp.push(this[start + i]);
    }
    // shift the array down
    for (let i = start; i < this.length; i++) {
      this[i] = this[i + deleteAmount];
    }
    // delete the left overs
    for (let i = this.length - deleteAmount; i < this.length; i++) {
      delete this[i];
    }

    this.length -= deleteAmount;
  }

  //is there any items to add?
  if (shouldAdd) {
    // loop down till the givin start and unshift all elements by the amount of arguments givin (to make place for the new ones)
    for (let i = this.length; i >= start; i--) {
      this[i + arguments.length - 3] = this[i - 1];
    }
    //fill up the array starting with the start givin with all the arguments givin(starting by the arguments index of 2)
    for (let i = start; i < argumentsDiff; i++) {
      this[i] = arguments[argumentIndex];
      argumentIndex++;
      this.length++;
    }
  }

  return temp;
};

// reverse mathod

Array.prototype.reverse = function () {
  // create a temp array
  let temp = new Array();
  //loop in reverse and push the el to temp array
  for (let i = this.length - 1; i >= 0; i--) {
    temp.push(this[i]);
  }
  // push the new array the the old (mutate)
  for (let i = 0; i < this.length; i++) {
    this[i] = temp[i];
  }
};

// toString mathod

Array.prototype.toString = function () {
  let separator = ",";

  // Create an empty string
  let str = "";
  // add each el + seprator
  for (let i = 0; i < this.length; i++) {
    // if el is an empty array just add an empty space
    if (Array.isArray(this[i]) && !this[i].length) {
      str += "";
    }
    //if el is an array call array.toString()
    if (Array.isArray(this[i]) && this[i].length) {
      str += this[i].toString();
      // if its the lest round dont add the separator (it should not add one to the end)
      if (i < this.length - 1) str += separator;
    }
    // if el is null or undefind add an empty space
    else if (this[i] === null || this[i] === undefined) {
      str += "";
      if (i < this.length - 1) str += separator;
    } else {
      str += this[i];
      // if its the lest round dont add the separator (it should not add one to the end)
      if (i < this.length - 1) str += separator;
    }
  }
  return String(str);
};

// join mathod

Array.prototype.join = function (separator) {
  //If separator omitted, the array elements are separated with a comma (",").
  if (separator === undefined) separator = ",";
  // Create an empty string
  let str = "";
  // add each el + seprator
  for (let i = 0; i < this.length; i++) {
    // if el is an empty array just add an empty space
    if (Array.isArray(this[i]) && !this[i].length) {
      str += "";
    }
    //if el is an array call array.toString()
    if (Array.isArray(this[i]) && this[i].length) {
      str += this[i].toString();
      // if its the lest round dont add the separator (it should not add one to the end)
      if (i < this.length - 1) str += separator;
    }
    // if el is null or undefind add an empty space
    else if (this[i] === null || this[i] === undefined) {
      str += "";
      if (i < this.length - 1) str += separator;
    } else {
      str += this[i];
      // if its the lest round dont add the separator (it should not add one to the end)
      if (i < this.length - 1) str += separator;
    }
  }
  return String(str);
};

//indexOf mathod

Array.prototype.indexOf = function (searchElement, fromIndex) {
  // from index is optinal if ommit start from 0
  if (fromIndex === undefined) fromIndex = 0;
  //If the provided index value is a negative number, it is taken as the offset from the end of the array. Note: if the provided index is negative, the array is still searched from front to back.
  if (fromIndex < 0) fromIndex = this.length + fromIndex;
  // search the array
  for (let i = fromIndex; i < this.length; i++) {
    if (this[i] === searchElement) return i;
  }
  return -1;
};

//lastIndexOf mathod

Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
  // from index is optinal Defaults to the array's length minus one (arr.length - 1),
  if (fromIndex === undefined) fromIndex = this.length - 1;
  //If negative, it is taken as the offset from the end of the array. Note that even when the index is negative, the array is still searched from back to front
  if (fromIndex < 0) fromIndex = this.length + fromIndex;
  // search the array
  for (let i = fromIndex; i >= 0; i--) {
    if (this[i] === searchElement) return i;
  }
  return -1;
};

// includes mathod

Array.prototype.includes = function (searchElement, fromIndex) {
  // from index is optinal if ommit start from 0
  if (fromIndex === undefined) fromIndex = 0;
  //if the provided index is negative, the array is still searched from front to back
  if (fromIndex < 0) fromIndex = this.length + fromIndex;
  // search the array
  for (let i = fromIndex; i < this.length; i++) {
    if (this[i] === searchElement) return true;
  }
  return false;
};

//slice mathod

Array.prototype.slice = function (start, end) {
  //If start is undefined, slice starts from the index 0
  if (start === undefined) start = 0;
  // A negative index can be used, indicating an offset from the end of the sequence. slice(-2) extracts the last two elements in the sequence.
  if (start < 0) start = this.length + start;
  //If end is omitted, slice extracts through the end of the sequence (arr.length).
  if (end === undefined) end = this.length;
  //A negative index can be used, indicating an offset from the end of the sequence. slice(2,-1) extracts the third element through the second-to-last element in the sequence.
  if (end < 0) end = this.length + end;
  //If end is greater than the length of the sequence, slice extracts through to the end of the sequence (arr.length).
  if (end > this.length) end = this.length;

  let res = new Array();
  for (let i = start; i < end; i++) {
    res.push(this[i]);
  }
  return res;
};

// copyWithin mathod

Array.prototype.copyWithin = function (target, start, end) {
  //If target is at or greater than arr.length, nothing will be copied.
  if (target >= this.length) return this;
  //If target is positioned after start, the copied sequence will be trimmed to fit arr.length.
  if (target > start) end = target - start;

  //If start is omitted, copyWithin will copy from index 0.
  if (start === undefined) start = 0;
  //If negative, start will be counted from the end.
  if (start < 0) start = this.length + start;

  //If end is omitted, copyWithin will copy until the last index (default to arr.length).
  if (end === undefined) end = this.length;
  //If negative, end will be counted from the end.
  if (end < 0) end = this.length + end;

  const tempArr = new Array();
  for (let i = start; i < end; i++) {
    tempArr.push(this[i]);
  }
  for (let i = 0; i < tempArr.length; i++) {
    this[target + i] = tempArr[i];
  }
  return this;
};

// every mathod

Array.prototype.every = function (fn, thisArg) {
  let arr = null;
  if (thisArg === undefined) {
    arr = this;
  } else {
    arr = thisArg;
  }
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i], i, arr)) return false;
  }
  return true;
};

// some mathod

Array.prototype.some = function (fn, thisArg) {
  let arr = null;
  if (thisArg === undefined) {
    arr = this;
  } else {
    arr = thisArg;
  }
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) return true;
  }
  return false;
};

// fill mathod
Array.prototype.fill = function (value, start, end) {
  //If start is omitted, copyWithin will copy from index 0.
  if (start === undefined) start = 0;
  //If negative, start will be counted from the end.
  if (start < 0) start = this.length + start;

  //If end is omitted, copyWithin will copy until the last index (default to arr.length).
  if (end === undefined) end = this.length;
  //If negative, end will be counted from the end.
  if (end < 0) end = this.length + end;

  for (let i = start; i < end; i++) {
    this[i] = value;
  }

  return this;
};

// filter mathod

Array.prototype.filter = function (fn, thisArg) {
  let arr = null;
  if (thisArg === undefined) {
    arr = this;
  } else {
    arr = thisArg;
  }
  const res = new Array();
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) res.push(arr[i]);
  }
  return res;
};

// map mathod
Array.prototype.map = function (fn, thisArg) {
  let arr = null;
  if (thisArg === undefined) {
    arr = this;
  } else {
    arr = thisArg;
  }
  const res = new Array();
  for (let i = 0; i < arr.length; i++) {
    res.push(fn(arr[i], i, arr));
  }
  return res;
};

// find mathod

Array.prototype.find = function (fn, thisArg) {
  let arr = null;
  if (thisArg === undefined) {
    arr = this;
  } else {
    arr = thisArg;
  }
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) return this[i];
  }
  return undefined;
};

// findIndex mathod

Array.prototype.findIndex = function (fn, thisArg) {
  let arr = null;
  if (thisArg === undefined) {
    arr = this;
  } else {
    arr = thisArg;
  }
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) return i;
  }
  return -1;
};

// forEach mathod
Array.prototype.forEach = function (fn, thisArg) {
  let arr = null;
  if (thisArg === undefined) {
    arr = this;
  } else {
    arr = thisArg;
  }
  for (let i = 0; i < arr.length; i++) {
    if (this[i]) fn(arr[i], i, arr);
  }
};

// Reduce Method 
Array.prototype.reduce = function (callbackFn, initialValue) {
  let acc = initialValue;
  for(let i = 0 ; i < this.length; i ++) {
  console.log("this",this[i])
    acc = callbackFn(acc, this[i])
    console.log("acc",acc)
  }
  return acc
};

//testing area

// Todo....

/*

reduceRight
*/

//iterrators

/*
@@iterator(symbol)
keys
values
entries
*/

// algorithems

//sort

