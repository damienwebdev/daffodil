import { series } from 'gulp';
import { exec } from 'gulp-execa';

const lernaBuild = async () => await exec('lerna run build --stream');

export const build = series(lernaBuild);