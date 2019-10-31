import { RELEASE_CONFIG } from '../config';
import { parallel, series } from 'gulp';
import { clean } from './clean';
import * as git from 'simple-git/promise';

const errorOnExistingBranch = (branchName: string) => (result: boolean) : void => {
  if(result) {
    throw(`You have a local copy of the "${branchName}" branch, please delete it before proceeding.`)
  }
}

const branchExists = async (branchName: string): Promise<boolean> => {
    const repo = await git(RELEASE_CONFIG.PROJECT_PATH);
    const branches = await repo.branchLocal();
    return branches[branchName] !== undefined;
}

const verifyDevelopBranch = () : Promise<void> => {
  return branchExists("develop").then(errorOnExistingBranch("develop"));
}

const verifyMasterBranch = () : Promise<void> => {
  return branchExists("master").then(errorOnExistingBranch("master"));
}

/**
 * Function which determines whether or not the current workspace is dirty (git).
 */
const verifyWorkspace = async (callback: Function): Promise<any> => {
  const repo = await git(RELEASE_CONFIG.PROJECT_PATH);
  const status = await repo.status();

  if(status.files.length === 0){
    callback();
  }
  else {
    callback(new Error("The repository is not in a clean state, please cleanup your project before proceeding."));
  }
}

export const prepare = series(
  parallel(
    verifyDevelopBranch, 
    verifyMasterBranch, 
    verifyWorkspace
  ),
  clean
);