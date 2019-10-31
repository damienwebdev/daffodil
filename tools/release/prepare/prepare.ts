import * as Git from 'nodegit';
import { RELEASE_CONFIG } from '../config';
import { parallel, series } from 'gulp';
import { clean } from './clean';

const errorOnExistingBranch = (branchName: string) => (result: boolean) : void => {
  if(result) {
    throw(`You have a local copy of the "${branchName}" branch, please delete it before proceeding.`)
  }
}

const branchExists = async (branchName: string): Promise<boolean> => {
  try {
    const repo = await Git.Repository.open(RELEASE_CONFIG.PROJECT_PATH + '/.git');
    const branch = await repo.getBranch(branchName);
    return true;
  }
  catch (error) {
    //If this hits an error, it means that the branch does not exist.
    return false;
  }
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
  const repo = await Git.Repository.open(RELEASE_CONFIG.PROJECT_PATH + '/.git');
  const status = await repo.getStatus();

  if(status.length === 0){
    callback();
  }
  else {
    callback(new Error("The repository is not in a clean state, please cleanup your project before proceeding."));
  }
}

export const prepare = series(
  parallel(verifyDevelopBranch, verifyMasterBranch, verifyWorkspace),
  clean
);