const thirdPartyService = require('../services/thirdPartyService');
const windowService = require('../services/windowService');
const { StatusCodes } = require('http-status-codes');

class NumbersController {
  async getNumbers(req, res) {
    try {
      const { numberid } = req.params;
      
      const validTypes = ['p', 'f', 'e', 'r'];
      if (!validTypes.includes(numberid)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Invalid number type. Use p, f, e, or r'
        });
      }

      const fetchedNumbers = await thirdPartyService.fetchNumbers(numberid);

      const windowUpdate = windowService.addNumbers(fetchedNumbers);

      const average = windowService.calculateAverage();

      const response = {
        windowPrevState: windowUpdate.windowPrevState,
        windowCurrState: windowUpdate.windowCurrState,
        numbers: fetchedNumbers,
        avg: average
      };

      res.json(response);
    } catch (error) {
      console.error('Error in getNumbers:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Internal server error'
      });
    }
  }
}

module.exports = new NumbersController();