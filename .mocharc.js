module.exports = {
  require: ["ts-node/register", "./src/test-utils/mocha-setup.ts"],
  extension: ["ts"],
  timeout: 3000,
};
