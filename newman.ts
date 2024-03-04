const newman = require('newman');

const COLLECTION_PATH = './testcollection.json';
const OUTPUT_CSV = 'response_times1.csv';

newman.run({
  collection: require(COLLECTION_PATH),
  reporters: 'csv',
  iterationCount: 100,
  reporter: {
    csv: {
      export: OUTPUT_CSV,
      responseTime: true,
    },
  },
}, function (err: any) {
  if (err) {
    console.error('Postman collection run failed:', err);
  } else {
    console.log(`Postman collection run completed successfully. Response times saved to ${OUTPUT_CSV}`);
  }
});
