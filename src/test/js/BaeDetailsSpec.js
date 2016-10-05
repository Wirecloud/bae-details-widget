/*global $, MashupPlatform, MockMP, BaeDetails, beforeAll, afterAll, beforeEach*/
(function () {
    "use strict";

    describe("Test BaeDetails", function () {
        beforeAll(function () {
            window.MashupPlatform = new MockMP.MockMP();
        });

        beforeEach(function () {
            MashupPlatform.reset();
        });

        it("Dummy test", function () {
            expect(true).toBeTruthy();
        });

    });
})();
