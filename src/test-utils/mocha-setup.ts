declare global {
  var assert: typeof chai.assert;
  var expect: typeof chai.expect;
}

import chai from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

global.assert = chai.assert;
global.expect = chai.expect;
