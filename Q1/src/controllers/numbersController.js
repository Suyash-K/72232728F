const thirdPartyService = require('../services/thirdPartyService');
const windowService = require('../services/windowService');
const { validateNumberId } = require('../utils/validation');
const { StatusCodes } = require('http-status-codes');

class NumbersController {
  async getNumbers(req, res) {
    const startTime = Date.now();
    
    try {
      const { numberid } = req.params;
      
      try {
        validateNumberId(numberid);
      } catch (validationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: validationError.message
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

      const responseTime = Date.now() - startTime;
      if (responseTime > 500) {
        console.warn(`Response time: ${responseTime}ms - exceeded 500ms limit`);
      }

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