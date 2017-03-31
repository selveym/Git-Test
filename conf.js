var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var reporters = require('jasmine-reporters');

exports.config = {
    //framework: 'jasmine',
    seleniumAddress: 'http://TEW98CE9.gridlastic.com/wd/hub',
    specs: ['Test Scripts/**.js'],
    //specs: ['Test Scripts/**.js'],
    capabilities: {
        gridlasticUser: '1gXg6iAvQdjN64lx7SNB3PVul7rMvlqn',
        gridlasticKey: 'rdtomUJ2XTFUOQhLyVcsAXMMV3ogfEux',
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 2,
        video: 'True'
    },
    onPrepare: function () {

        /*        jasmine.getEnv().addReporter(
                    new Jasmine2HtmlReporter({
                        savePath: 'screenshots',
                        takeScreenshots: true,
                        takeScreenshotsOnlyOnFailures: true

                    })
                );*/

        var jasmineReporters = require('jasmine-reporters');

        return browser.getProcessedConfig().then(function (config) {
            var browserName = config.capabilities.browserName;

            var junitReporter = new jasmineReporters.JUnitXmlReporter({
                savePath: 'testresults',
                consolidateAll: false,
                filePrefix: 'xmlresults',
                /*filePrefix: 'xmloutput',*/
                modifyReportFileName: function (generatedFileName, suite) {
                    // this will produce distinct file names for each capability, 
                    // e.g. 'firefox.SuiteName' and 'chrome.SuiteName' 
                    return browserName + '.' + generatedFileName;
                }
            });
            jasmine.getEnv().addReporter(junitReporter);
            
        });
    },
    restartBrowserBetweenTests: true,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000
    }/*,
    onComplete: function() {
     var browserName, browserVersion;
     var capsPromise = browser.getCapabilities();
 
     capsPromise.then(function (caps) {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version');
 
        var HTMLReport = require('protractor-html-reporter');
 
        testConfig = {
            reportTitle: 'Test Execution Report',
            outputPath: './',
            screenshotPath: './screenshots',
            testBrowser: browserName,
            browserVersion: browserVersion,
            modifiedSuiteName: false,
            screenshotsOnlyOnFailure: true
        };
        new HTMLReport().from(['testresults/*.xml'], testConfig);
    });
 }*/

    /*capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['--user-data-dir="C:\Users\SelveyM\Documents\2017\Agile Designer\chrome args"']
        }
    }*/
};