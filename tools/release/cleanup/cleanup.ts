import { series } from 'gulp';
import * as git from 'simple-git/promise';
import { RELEASE_CONFIG } from '../config';

export const cleanup = async() => {
  const repo = await git(RELEASE_CONFIG.PROJECT_PATH);
  await repo.deleteLocalBranch(RELEASE_CONFIG.TEMPORARY_BRANCH_NAME);
}