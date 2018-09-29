module.exports = {
  sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // Run console.log except in test environment
  logExceptInTest: (str) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(str);
      return true;
    }
    return false;
  },

  padDisplay: (value, places) => {
    let valueStr = value.toString();
  
    if (valueStr.length < places) {
      valueStr = '0' + valueStr;
    }
  
    return valueStr;
  }
};