import * as standardVersion from 'standard-version';
import { RELEASE_CONFIG } from '../config';
import { series } from 'gulp'; 

const generateCommit  = () => standardVersion({
  noVerify: true,
  sign: true,
  infile: RELEASE_CONFIG.PROJECT_PATH + '/docs/CHANGELOG.md',
  silent: true,
  skip: {
    bump: true,
  },
  packageFiles: [
    RELEASE_CONFIG.PROJECT_PATH + '/package.json',
  ],
  bumpFiles: []
}).catch(err => {
    console.error(`standard-version failed with message: ${err.message}`)
});

export const commitChangelogAndTag = series(generateCommit)