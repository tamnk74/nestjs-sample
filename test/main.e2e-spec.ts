import * as newman from 'newman';
import * as glob from 'fast-glob';
import * as async from 'async';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

type HandleFunction = (
  err: Error | null,
  summary: newman.NewmanRunSummary,
) => void;

(async () => {
  const files = await glob('./test/e2e/**/*.json');
  async.parallel(
    files.map(file => (done: HandleFunction) => {
      newman.run(
        {
          collection: require(`${__dirname}/../${file}`),
          reporters: 'cli',
          globals: {
            values: [
              {
                key: 'host',
                value: process.env['API_DOMAIN'],
              },
              {
                key: 'token',
                value: process.env['TOKEN'],
              },
            ],
          },
        },
        done,
      );
    }),
  );
})();
