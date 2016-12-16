/* globals MashupPlatform, MockMP, beforeAll, beforeEach, describe, it, expect*/
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
