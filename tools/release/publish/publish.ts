import { series } from 'gulp';
import { exec } from 'child_process';

// merge into develop
// merge into master
// push master
// push develop
// push tag


const runPackagePublish = () => exec('lerna run publish');

export const publish = series(runPackagePublish);