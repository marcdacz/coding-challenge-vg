describe("👀  Validating getNavPriceList Endpoint", () => {
    const chai = require("chai");
    const expect = chai.expect;
    chai.use(require("chai-as-promised"));
    chai.use(require("chai-json-schema"));
    const superagent = require("superagent");
    const jsonp = require("superagent-jsonp");

    let endpoint = "https://www.vanguardinvestments.com.au/retail/mvc/getNavPriceList";
    if (process.env.NODE_ENV === "dev") {
        endpoint = "https://www.vanguardinvestments.com.au/retail/mvc/getNavPriceList";
    } else {
        endpoint = "https://int.vanguardinvestments.com.au/retail/mvc/getNavPriceList";
    }

    it("😊  Should return correct schema", async () => {
        let priceListResponse = await superagent.get(endpoint).use(jsonp);
        let priceList = JSON.parse(Buffer.from(priceListResponse.body, "base64").toString());
        let priceListSchema = require("../data/priceListSchema.json");
        expect(priceList).to.be.jsonSchema(priceListSchema);
    });

    it("😢  Should return error response when requesting using POST method", async () => {
        await expect(superagent.post(endpoint).use(jsonp)).to.eventually.be.rejectedWith("Forbidden");
    });

    it("😢  Should return error response when requesting using PUT method", async () => {
        await expect(superagent.put(endpoint).use(jsonp)).to.eventually.be.rejectedWith("Forbidden");
    });

    it("😢  Should return error response when requesting using PATCH method", async () => {
        await expect(superagent.patch(endpoint).use(jsonp)).to.eventually.be.rejectedWith("Forbidden");
    });

    it("😢  Should return error response when requesting using DELETE method", async () => {
        await expect(superagent.delete(endpoint).use(jsonp)).to.eventually.be.rejectedWith("Forbidden");
    });
});
