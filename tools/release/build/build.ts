import { series } from 'gulp';
const { exec } = require('child_process');

const lernaBuild = () => exec('lerna run build --stream');

export const build = series(lernaBuild);