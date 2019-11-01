import { series } from 'gulp';
import * as git from 'simple-git/promise';
import { RELEASE_CONFIG } from '../config';

const mergeToMaster = async() => {
  const repo = await git(RELEASE_CONFIG.PROJECT_PATH);
  await repo.mergeFromTo(RELEASE_CONFIG.TEMPORARY_BRANCH_NAME, 'origin/master');
}

export const pushToRemote = async () => {
  const repo = await git(RELEASE_CONFIG.PROJECT_PATH);
  await repo.push([RELEASE_CONFIG.GIT_REMOTE_NAME, 'HEAD:' + RELEASE_CONFIG.BASE_BRANCH] as any);
  // await repo.push('origin', 'origin/master');
  // await repo.pushTags();
}

export const publish = series(
  // mergeToDevelop,
  // mergeToMaster,
  pushToRemote
);