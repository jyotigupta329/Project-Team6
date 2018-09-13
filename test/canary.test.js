var expect = require("chai").expect;

function validation(text) {
  if (typeof text !== "string") {
    throw new Error("It's not a string")
  } else {
    return text;
  }
}

describe("validation test", function () {

  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("should pass this number test", function () {
    expect(validation(happy2)).to.throw(Error);
  });
  // it("should pass this special character test", function () {
  //   expect(true).to.be.true;
  // });
});
