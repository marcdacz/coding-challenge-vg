const superagent = require("superagent");
const jsonp = require("superagent-jsonp");

async function getFundDetails(fundId1 = null, fundId2 = null, fundId3 = null, fundId4 = null) {
    return await superagent
        .get(
            `https://tool.vanguardinvestments.com.au/mstar/au/mvc/GetFundDetails.json?fundId1=${fundId1}&fundId2=${fundId2}&fundId3=${fundId3}&fundId4=${fundId4}`
        )
        .use(jsonp);
}

async function getCompareProductRowData(page, rowHeader) {
    let rowData = await page.$$eval(`//strong[@id='${rowHeader}']/../../td`, (e) => e.map((n) => n.innerText));
    let rowDataWithoutHeader = rowData.slice(1);
    expect(rowDataWithoutHeader.length).to.equal(4);
    return rowDataWithoutHeader;
}

module.exports = {
    getFundDetails,
    getCompareProductRowData
};
