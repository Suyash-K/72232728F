const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());

const getRecentData = (data, mins) => {
    const now = Date.now();
    return data.filter(d => (now - new Date(d.lastUpdatedAt).getTime()) / 60000 <= mins);
};

const getCorrelation = (x, y) => {
    const n = x.length;
    const avgX = x.reduce((a, b) => a + b) / n;
    const avgY = y.reduce((a, b) => a + b) / n;
    
    let num = 0, den1 = 0, den2 = 0;
    for (let i = 0; i < n; i++) {
        num += (x[i] - avgX) * (y[i] - avgY);
        den1 += (x[i] - avgX) ** 2;
        den2 += (y[i] - avgY) ** 2;
    }
    
    return num / Math.sqrt(den1 * den2);
};

app.get('/stocks/:ticker', async (req, res) => {
    const response = await axios.get(
        `http://20.244.56.144/evaluation-service/stocks/${req.params.ticker}?minutes=${req.query.minutes}`
    );
    
    const data = getRecentData(response.data.priceHistory, req.query.minutes);
    const avg = data.reduce((sum, p) => sum + p.price, 0) / data.length;
    
    res.json({
        averageStockPrice: avg.toFixed(6),
        priceHistory: data
    });
});

app.get('/stockcorrelation', async (req, res) => {
    const [s1, s2] = await Promise.all([
        axios.get(`http://20.244.56.144/evaluation-service/stocks/${req.query.ticker[0]}?minutes=${req.query.minutes}`),
        axios.get(`http://20.244.56.144/evaluation-service/stocks/${req.query.ticker[1]}?minutes=${req.query.minutes}`)
    ]);
    
    const data1 = getRecentData(s1.data.priceHistory, req.query.minutes);
    const data2 = getRecentData(s2.data.priceHistory, req.query.minutes);
    
    res.json({
        correlation: getCorrelation(
            data1.map(d => d.price),
            data2.map(d => d.price)
        ).toFixed(4),
        stocks: {
            [req.query.ticker[0]]: {
                averagePrice: (data1.reduce((s, p) => s + p.price, 0) / data1.length).toFixed(6),
                priceHistory: data1
            },
            [req.query.ticker[1]]: {
                averagePrice: (data2.reduce((s, p) => s + p.price, 0) / data2.length).toFixed(6),
                priceHistory: data2
            }
        }
    });
});

app.listen(9876, () => console.log('Server running on port 9876'));