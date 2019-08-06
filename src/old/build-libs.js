/*
 * @Author: Xavier Yin 
 * @Date: 2018-11-14 15:14:12 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-11-14 15:27:35
 */

const deps = '.matrix.libs.js';
const depsDest = "matrix.libs.js";

function buildLibs(matrixConfig, appId) {
  let appConfig = matrixConfig.apps[appId];
  if (!appConfig) return Promise.reject(`找不到 App ID 为 ${appId} 的配置`);
}