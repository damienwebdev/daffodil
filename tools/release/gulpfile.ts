import { series } from 'gulp';

import { prepare } from './prepare/prepare';
import { version } from './version/version';
import { build } from './build/build';

const release = series(
  prepare, 
  build,
  version,
  // makeReleaseBranch,
  // mergeReleaseToDevelop,
  // mergeReleaseToMaster,
  // pushToRemote,
  // publish,
  // cleanup
);

export default release;




