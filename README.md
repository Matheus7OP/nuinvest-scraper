# Summary
The goal of this project is to facilitate extracting investment data from [NuInvest](https://nuinvest.com.br/). The extracted data is written in a local '.csv' file, ready to be exported to a spreadsheet (so that you may keep better track of your investments).

## How to use?

1. Login and go to your [investments page](https://www.nuinvest.com.br/acompanhar/investimentos).
2. Inspect the page (common shortcut: F12) and go to network.
3. With the network tab opened, reload the page.
4. Search for 'custody-position'. Right click, then copy cURL (bash). This step is required to give the crawler access to the data.
5. Go to 'https://curlconverter.com/node-axios/' and paste the cURL.
6. Copy the headers generated and paste them on 'index.js', inside the 'getData' function.
7. From the root of the project, call 'npm start'. A file 'investments.csv' will be generated with your investments data.

## Format of the extracted data
The data is extracted to a '.csv' file with the following columns for each investment:
*Investment Name | Current Financial Value | Invested Capital | Delta.*

- Investment Name: the name, nickname or code of your investment (this could be a stock code, for example).
- Current Financial Value: how much your investment is worth at this moment.
- Invested Capital: how much you invested.
- Delta: how much you gained or lost in this investment based on the invested capital and the current financial value. This value is given as a percentage.