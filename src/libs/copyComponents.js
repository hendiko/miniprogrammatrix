const path = require("path");
const fse = require("fs-extra");
const gulp = require("gulp");

// 确保路径是以 `.json` 结尾，即 Component 的 `.json` 文件
function makeEndingWithJSON(name) {
  return name.endsWith(".js") ? item + "on" : path.join(name, "index.json");
}

/** 解析出单个组件依赖的其他的组件路径 */
function parseUsingComponents(jsonPath) {
  let json = fse.readJsonSync(jsonPath, { throws: false });
  let { usingComponents = {} } = json || {};
  return Object.values(usingComponents).map(name => {
    return path.resolve(path.dirname(jsonPath), name + ".json");
  });
}

/** 找到所有依赖的组件路径 */
function findComponents(components, result = []) {
  for (let item of components) {
    if (!result.includes(item)) result.push(item);
    let using = parseUsingComponents(item);
    findComponents(using, result);
  }
  return result;
}

/** 复制依赖的公共组件到指定目录 */
function copyComponents(app) {
  let { external } = app;
  let { components } = external;
  let { src, dest, using = [] } = components;

  // 找到所有定义的组件 `.json` 文件路径
  let definedComponents = using.map(name =>
    path.resolve(app.fileDir, src, makeEndingWithJSON(name))
  );

  let allComponents = findComponents(definedComponents).map(uri =>
    path.resolve(path.dirname(uri), "**")
  );

  return new Promise((resolve, reject) => {
    gulp
      .src(allComponents, { base: path.resolve(app.fileDir, src), dot: true })
      .pipe(gulp.dest(path.resolve(app.fileDir, dest)))
      .on("error", reject)
      .on("end", resolve);
  });
}

module.exports = {
  copyComponents
};
