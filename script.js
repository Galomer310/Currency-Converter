const apiKey = '31e459765d7fbc03f4afeee6'; 
const exchangeRateApiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;

async function fetchCurrencies() {
    try {
        const response = await fetch(exchangeRateApiUrl);
        const data = await response.json();
        const currencies = data.supported_codes; 

        const FromCurrency = document.getElementById('FromCurrency');
        const ToCurrency = document.getElementById('ToCurrency');

        currencies.forEach(([currencyCode, currencyName]) => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currencyCode;
            optionFrom.textContent = `${currencyCode} - ${currencyName}`;
            FromCurrency.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currencyCode;
            optionTo.textContent = `${currencyCode} - ${currencyName}`;
            ToCurrency.appendChild(optionTo);
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

async function convertCurrency() {
    const fromCurrency = document.getElementById('FromCurrency').value;
    const toCurrency = document.getElementById('ToCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    const conversionUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    try {
        const response = await fetch(conversionUrl);
        const data = await response.json();

        const convertedAmount = data.conversion_result;
        document.getElementById('finalAmount').textContent = 
            `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
    }
}

fetchCurrencies();

const convertBtn = document.getElementById('convertBtn');
convertBtn.addEventListener('click', convertCurrency);
