//constucter

let Array = function () {
  for (let i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
  }
  this.length = arguments.length;
};

// static mathods

Array.prototype[Symbol.toStringTag] = "Array";

Array.isArray = function (arg) {
  return Object.prototype.toString.call(arg) === "[object Array]";
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
  if (start < 0) start = this.length - Math.abs(start);

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

//testing area

let myArr = new Array(1, "f", null, "r");
let myArr2 = new Array([], undefined, 7);
let myArr3 = myArr.concat(myArr2);
// console.log(myArr3);
// console.log(myArr3.splice(20, 2, "fab", "test"));
console.log(myArr3);
// console.log(myArr3.reverse());
console.log(myArr3.join("-"));
