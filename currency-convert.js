const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
      const resp = await axios.get('http://data.fixer.io/api/latest?access_key=f97ec14b5bbf2d10246a59df1cdddbe8');
      const euro = 1 / resp.data.rates[from];
      const rate = euro * resp.data.rates[to];
      if (isNaN(rate)) {
        throw new Error();
      }
      return rate;
  } catch (e) {
    throw new Error('unable to get Exchange rate');
  }
};

const getCountries = async (currencyCode) => {
  try {
      const resp = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
      return resp.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`unabled to get countries with ${currencyCode}`);
  }
};

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const convAmount = (amount * rate).toFixed(2);
  const countries = await getCountries(to);
  return `${amount} ${from} is worth ${convAmount}. It can be used in ${countries}`;
};


convertCurrency('EUR', 'USD', 4000).then((response) => {
  console.log(response);
}).catch((e) => {
  console.log(e);
});