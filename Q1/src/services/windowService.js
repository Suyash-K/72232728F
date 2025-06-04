const config = require('../config/server');

class WindowService {
  constructor() {
    this.window = [];
    this.maxSize = config.windowSize;
  }

  addNumbers(newNumbers) {
    const prevState = [...this.window];
    

    const uniqueNumbers = newNumbers.filter(num => !this.window.includes(num));

    this.window.push(...uniqueNumbers);
    

    while (this.window.length > this.maxSize) {
      this.window.shift();
    }
    
    return {
      windowPrevState: prevState,
      windowCurrState: [...this.window],
      numbersAdded: uniqueNumbers
    };
  }

  calculateAverage() {
    if (this.window.length === 0) return 0;
    const sum = this.window.reduce((acc, num) => acc + num, 0);
    return parseFloat((sum / this.window.length).toFixed(2));
  }

  getCurrentState() {
    return [...this.window];
  }
}

module.exports = new WindowService();