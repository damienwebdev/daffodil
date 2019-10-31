import { series } from 'gulp';
import { rootVersion } from './root-version';
import { leafVersion } from './leaf-version';
import { commitChangelogAndTag } from './generate-commit';

export const version = series(
  rootVersion, 
  leafVersion,
  commitChangelogAndTag
); 