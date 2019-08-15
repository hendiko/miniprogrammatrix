/*
 * @Author: Xavier Yin
 * @Date: 2019-08-06 14:54:35
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2019-08-15 09:29:00
 */

const path = require("path");
const fs = require("fs");
const pkg = require("../package.json");
const yargs = require("yargs");

const { packDepsJs } = require("./libs/packDepsJs");
const { MatrixConfig } = require("./libs/parseConfig");
const { copyAssets } = require("./libs/copyAssets");
const { copyComponents } = require("./libs/copyComponents");
const { copyMatrixConfig } = require("./libs/copyMatrixConfig");

const absPath = (config, name) => path.resolve(config, name);

/**
 * 读取配置
 * @param {strign} configFile 配置文件路径
 */
function readMatrixConfig(configFile) {
  let filePath = path.resolve(process.cwd(), configFile || "matrix.config.js");
  return new Promise((resolve, reject) => {
    fs.exists(filePath, exists => {
      if (exists) {
        const config = require(filePath);
        resolve(new MatrixConfig(config, filePath));
      } else {
        reject(`${filePath} not found`);
      }
    });
  });
}

/**
 * 在当前工作目录自动生成 matrix.config.js 文件
 */
function generateMatrixConfigFile(dest) {
  return copyMatrixConfig(
    path.resolve(process.cwd(), dest || ".", "matrix.config.js")
  );
}

/**
 * 构建依赖 JS 文件
 * @param {AppConfig} config 配置对象
 */
function buildDependencies(config) {
  let root = absPath(config.fileDir, config.miniprogram.root || ".");
  let { src, dest } = config.miniprogram.dependency;
  let { alias, dir } = config.external.libs;
  if (src) {
    return packDepsJs(
      root,
      src,
      dest,
      alias,
      absPath(config.fileDir, dir || ".")
    );
  } else {
    console.log("没有指定依赖入口文件，终止构建依赖文件任务。");
    return Promise.resolve();
  }
}

/**
 * 输出静态资源文件
 * @param {AppConfig} config 配置对象
 */
function buildAssets(config) {
  const { dirname = "assets", output } = config.external.assets || {};
  if (output) {
    return copyAssets(
      absPath(config.fileDir, config.miniprogram.root),
      dirname,
      absPath(config.fileDir, output)
    );
  } else {
    console.log("没有指定静态资源输出目录，终止输出静态资源任务。");
    return Promise.resolve();
  }
}

/**
 * 复制依赖的公共组件
 * @param {AppConfig} config 配置对象
 */
function buildComponents(config) {
  if (config.external.components) {
    return copyComponents(config);
  } else {
    console.log("没有指定公共组件，终止构建公共组件任务。");
    return Promise.resolve();
  }
}

/**
 * 执行任务
 * @param {string} config 配置文件路径
 * @param {string} app 指定小程序名称
 * @param {array} task 任务列表
 */
async function executeTask(config, app, task) {
  try {
    let matrix = await readMatrixConfig(config);
    let appConfig = matrix.getConfig(app);

    if (task.includes(0)) {
      await buildDependencies(appConfig);
    }
    if (task.includes(1)) {
      await buildComponents(appConfig);
    }
    if (task.includes(2)) {
      await buildAssets(appConfig);
    }
  } catch (e) {
    console.error("[Matrix Build Error]\n", e);
  }
}

function main() {
  yargs
    .scriptName("mpmatrix")
    .version(pkg.version)
    .alias({ h: "help", v: "version" })
    .command(
      "init",
      "初始化目录同时生成默认配置文件",
      yargs =>
        yargs.option("d", {
          alias: "dir",
          type: "string",
          describe: "需要进行初始化的目录"
        }),

      argv => {
        generateMatrixConfigFile(argv.dir);
      }
    )
    .command(
      "build <app>",
      "为指定小程序构建公共组件、外部依赖或输出静态资源文件",
      yargs =>
        yargs
          .option("t", {
            alias: "task",
            default: [0, 1, 2],
            type: "array",
            describe:
              "指定构建任务，默认全选。\n0 - 生成依赖文件\n1 - 复制公共组件\n2 - 输出静态资源文件"
          })
          .option("c", {
            alias: "config",
            type: "string",
            describe: "指定配置文件路径"
          }),
      argv => {
        let { task, config, app } = argv;
        executeTask(config, app, task);
      }
    ).argv;
}

if (require.main === module) {
  main();
}

module.exports = { main };
