/*
 * @Author: Xavier Yin
 * @Date: 2019-08-06 14:52:11
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2019-08-14 15:44:50
 */
const gulp = require("gulp");
const gulpRename = require("gulp-rename");
const path = require("path");

/**
 * 复制资源文件到指定目录
 * @param {string} srcRoot 小程序源代码根目录路径
 * @param {string} assetsOutDir 资源文件输出目录路径
 */
function copyAssets(srcRoot, dirname, assetsOutDir) {
  let re = new RegExp(`\\.${dirname}\\b`, "g");
  return new Promise((resolve, reject) => {
    let srcPath = path.join(srcRoot, "**", "." + dirname, "**", "*");
    gulp
      .src([srcPath])
      .pipe(
        gulpRename(path => {
          path.dirname = path.dirname.replace(re, dirname);
        })
      )
      .pipe(gulp.dest(assetsOutDir))
      .on("error", reject)
      .on("end", resolve);
  });
}

module.exports = {
  copyAssets
};
