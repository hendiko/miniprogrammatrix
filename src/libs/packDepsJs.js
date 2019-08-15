/*
 * @Author: Xavier Yin
 * @Date: 2019-08-06 15:23:13
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2019-08-14 18:05:35
 */

const webpack = require("webpack");
const fs = require("fs");
const path = require("path");

function getDepFileNames(src, dest) {
  if (!src.endsWith(".js")) src += ".js";
  if (!dest) {
    dest = src.replace(/\.js$/, ".matrix.js");
  }
  dest = dest.replace(/(^|\/)(\.+)/g, "$1");
  if (!dest.endsWith(".js")) dest += ".js";
  return { src, dest };
}

/**
 * 编译外部依赖
 * @param {string} srcRoot 源代码根目录路径
 * @param {string} depSrcFileName 依赖导入文件的文件名（路径）
 * @param {string} depOutFileName 依赖导入文件的编译后文件名（路径）
 * @param {string} libsRoot 外部依赖库根目录
 * @param {string} aliasOfLibs 外部依赖库别名
 */
function packDepsJs(
  srcRoot,
  depSrcFileName,
  depOutFileName,
  aliasOfLibs,
  libsRoot
) {
  let { src: depSrc, dest: depDest } = getDepFileNames(
    depSrcFileName,
    depOutFileName
  );

  let depSrcPath = path.join(srcRoot, depSrc);

  return new Promise((resolve, reject) => {
    fs.exists(depSrcPath, exists => {
      if (exists) {
        webpack(
          {
            entry: depSrcPath,
            output: {
              path: srcRoot,
              filename: depDest,
              libraryTarget: "commonjs2"
            },
            module: {
              rules: [
                {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use: {
                    loader: "babel-loader",
                    query: {
                      presets: [["es2015", { loose: true }]]
                    }
                  }
                }
              ]
            },
            resolve: aliasOfLibs
              ? {
                  alias: {
                    // 如果指定别名，却未指定 libs 目录，则默认指向小程序根目录
                    [aliasOfLibs]: libsRoot || srcRoot
                  }
                }
              : {}
          },
          (err, status) => {
            if (err) {
              reject(err);
            } else {
              // console.log(status);
              resolve(status);
            }
          }
        );
      } else {
        reject(new Error(`${depSrcPath} not found.`));
      }
    });
  });
}

module.exports = {
  packDepsJs
};
