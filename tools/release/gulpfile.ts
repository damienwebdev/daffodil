import { series } from 'gulp';

import { prepare } from './prepare/prepare';
import { version } from './version/version';
import { build } from './build/build';
import { commitChangelogAndTag } from './commit/commitChangelogAndTag';

const release = series(
  prepare, 
  build,
  version,
  commitChangelogAndTag
  // publish,
  // cleanup
);

export default release;




