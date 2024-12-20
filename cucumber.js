
                                                                
module.exports = {
  default: {
    formatOptions: {
        snippetInterface: "async-await"
    },
    paths: [
        "features/"
    ],
    require: ['step-definitions/*.ts', './setup/hooks.ts'],
    format: ['html:report-cucumber/cucumber-report.html', 'json:report-cucumber/cucumber-report.json'],
    requireModule: [
        "ts-node/register"
    ],
    tags: '@INNSERV1',
    publishQuiet: true
  }
};




