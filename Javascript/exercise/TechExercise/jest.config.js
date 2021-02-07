module.exports = {
  "roots": [
    "<rootDir>/tests"
  ],
 // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.tsx?$",
  // Module file extensions for importing
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}