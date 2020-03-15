describe("👀  Validating Product Compare Page", () => {
    let browser, page, context;
    const compareProductsMethods = require("../methods/compareProductsMethods");
    const productCompareUrl =
        "https://tool.vanguardinvestments.com.au/mstar/au/fundcompare.htm?site_code=ret##target=fct";

    const fundFamiliesList = require("../data/fundFamilies.json");
    const expectedAvailableProducts = _.filter(fundFamiliesList.fundfamilies.fundfamilies, {
        fundFamilyName: "Vanguard"
    })[0].funds.map((fund) => {
        return {
            fundId: fund.fund_id,
            fundName: fund.fund_name,
            identifier: fund.ticker,
            category: fund.category
        };
    });

    before(async () => {
        browser = await playwright[browserType].launch();
        context = await browser.newContext();
        page = await context.newPage();
        await page.setViewportSize({
            width: 1920,
            height: 1080
        });
    });

    after(async () => {
        await browser.close();
    });

    it("😊  Should display compare products page", async () => {
        await page.goto(productCompareUrl);
        await page.waitForSelector("#addButton0");
        await page.screenshot({ path: `screenshots/${browserType}/compareProductsPage.png` });

        const addFundBox = await page.$$(".addFundBox");
        expect(addFundBox.length).to.equal(4);

        const addButton1 = await page.$("#addButton0:not(.disableBtn)");
        expect(addButton1).to.not.be.null;

        const addButton2 = await page.$("#addButton1.disableBtn");
        expect(addButton2).to.not.be.null;

        const addButton3 = await page.$("#addButton2.disableBtn");
        expect(addButton3).to.not.be.null;

        const addButton4 = await page.$("#addButton3.disableBtn");
        expect(addButton4).to.not.be.null;
    });

    it("😊  Should display all available products", async () => {
        await page.click(`#addButton0`);

        let actualAvailableProducts = await page.$$(`input[type="checkbox"]:not([name="sections"])`);
        // expect(actualAvailableProducts.length).to.equal(expectedAvailableProducts.length);

        for (const expectedProduct of expectedAvailableProducts) {
            let actualProduct = await page.evaluate((fundId) => {
                return document.querySelector(`input[name="${fundId}"]`).parentElement.parentElement.innerText;
            }, expectedProduct.fundId);

            expect(actualProduct).to.include(expectedProduct.fundName);
            expect(actualProduct).to.include(expectedProduct.identifier);
            // expect(actualProduct).to.include(expectedProduct.category);
        }

        await page.screenshot({ path: `screenshots/${browserType}/allProducts.png` });
    });

    it("😊  Should allow user to select products to add", async () => {
        await page.click(`input[name="${expectedAvailableProducts[0].fundId}"]`);
        await page.click(`input[name="${expectedAvailableProducts[1].fundId}"]`);
        await page.click(`input[name="${expectedAvailableProducts[2].fundId}"]`);
        await page.click(`input[name="${expectedAvailableProducts[3].fundId}"]`);

        await page.screenshot({ path: `screenshots/${browserType}/addProducts.png` });
    });

    it("😊  Should allow user to display product comparison table", async () => {
        await page.click(`#compareFundBtn`);
        await page.waitForSelector("#fundManagerDataPnt");

        let expectedFundDetails = await compareProductsMethods.getFundDetails(
            expectedAvailableProducts[0].fundId,
            expectedAvailableProducts[1].fundId,
            expectedAvailableProducts[2].fundId,
            expectedAvailableProducts[3].fundId
        );

        const actualProductNames = await page.$$eval(".addFundBox", (e) => e.map((n) => n.innerText));
        expect(actualProductNames.length).to.equal(4);

        for (let index = 0; index < actualProductNames.length; index++) {
            let expectedProductData = _.find(
                expectedFundDetails.body.fundDetailsList.fundDetailsList[index].subgroups,
                {
                    sectionHeader: "Product Facts"
                }
            );
            let expectedProductDataFundName = _.find(expectedProductData.dataPoints, { attribute: "fundName" });
            expect(actualProductNames[index]).to.include(expectedProductDataFundName.value);
        }

        await page.screenshot({ path: `screenshots/${browserType}/compareProductsTable.png` });
    });
});
