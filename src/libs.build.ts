/*
 * @Author: Xavier Yin 
 * @Date: 2018-11-15 17:28:34 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-11-16 12:16:10
 */
import webpack from 'webpack'
import fs from 'fs'
import path from 'path';
import gulp from 'gulp'
import gulpRename from 'gulp-rename';

import { AppConfig } from './matrix.config'

function buildLibs(appConfig: AppConfig) {
  return new Promise((resolve, reject) => {
    if (!appConfig.src) return reject('未指定小程序目录');
    
  });
}