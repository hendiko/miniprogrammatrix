const fse = require("fs-extra");
const path = require("path");

/**
 * 复制默认的配置文件
 * @param {string} dest 配置文件输出路径
 */
function copyMatrixConfig(dest) {
  let srcFile = path.resolve(__dirname, "../matrix.config.js");
  return fse.copy(srcFile, dest, { overwrite: false });
}

module.exports = { copyMatrixConfig };
