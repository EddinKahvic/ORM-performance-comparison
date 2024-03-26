const newman = require('newman');

const COLLECTION_PATH = './Collections/MikroORM/MikroORM-create-advanced.json';
const OUTPUT_CSV = 'test.csv';

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
