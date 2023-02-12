const path = require('node:path');
const axios = require('axios');
const fs = require('fs');

const clearFile = (filePath) => {
    if(fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if(err) console.error(err);
        });
    }
}

const getInvestmentData = (investment) => {
    var data;
    switch(investment.securityType) {
        case 'STOCK':
            data = {
                name: investment.nickName,
                currentValue: investment.financialCurrentValue,
                investedCapital: investment.averagePrice * investment.totalQuantity
            };
            break;
        case 'TD':
            data = {
                name: investment.nickName,
                currentValue: investment.grossValue,
                investedCapital: investment.investedCapital
            };
            break;
        default:
            throw new Error(
                'Behavior for investment type ' + investment.securityType + 
                ' not implemented in this crawler.');
    }

    data.delta = ((data.currentValue / data.investedCapital) - 1) * 100.0;
    return data;
}

const writeDataToFile = (investmentsRaw) => {
    const filePath = path.join(__dirname, 'investments.csv');
    clearFile(filePath);
    
    var investments = [];
    for(investment of investmentsRaw) {
        investments.push( getInvestmentData(investment) );
    }
    investments.sort((a, b) => b.currentValue - a.currentValue);

    for(investment of investments) {
        const content = new String(
            investment.name + ", " + investment.currentValue + ", " + 
            investment.investedCapital + ", " + investment.delta + '%'
        );
        fs.appendFileSync(filePath, content + '\n', err => {
            if(err) console.error(err);
        });
    }
}

const getData = async() => {
    try {
        const response = await axios.get(
            'https://www.nuinvest.com.br/api/samwise/v2/custody-position', 
            {
                headers: {} // Place the headers for 'custody-position' requisition here.
            }
        );
        writeDataToFile(response.data.investments);
        console.log('Done!');
    } catch(err) {
        throw new Error('Failed to make the request. ' + err);
    }
}

console.log('Getting data and writing it to file.');
getData();