const path = require("path");
const _ = require("lodash");

class MatrixConfig {
  constructor(config, filePath) {
    this.config = config;
    this.filePath = filePath; // 配置文件绝对路径
    this.fileDir = path.dirname(this.filePath);
  }

  getConfig(appName) {
    let { globals, apps } = this.config;
    let app = apps ? apps[appName] : null;
    if (app) {
      let { miniprogram } = app;
      let external = Object.assign(
        {},
        globals,
        _.pick(app, ["libs", "assets", "components"])
      );
      if (miniprogram) {
        return new AppConfig(miniprogram, external, this.filePath);
      } else {
        throw new Error(`The field miniprogram is missing`);
      }
    } else {
      throw new Error(`The configuration of app ${appName} not found`);
    }
  }
}

class AppConfig {
  constructor(miniprogram, external, filePath) {
    this.miniprogram = new MiniprogramField(this, miniprogram);
    this.external = new ExternalField(this, external);
    this.filePath = filePath;
    this.fileDir = path.dirname(filePath);
  }

  toJSON() {
    return {
      miniprogram: this.miniprogram.toJSON(),
      external: this.external.toJSON()
    };
  }
}

class MiniprogramField {
  constructor(app, miniprogram) {
    this.app = app;
    this.miniprogram = miniprogram;
  }

  get root() {
    return this.miniprogram.root;
  }

  get dependency() {
    let { deps } = this.miniprogram;
    let { src = "", dest = "" } = deps || {};
    return { src, dest };
  }

  get componentsDir() {
    let { componentsDir } = this.miniprogram;
    return path.join(this.root, componentsDir || "");
  }

  toJSON() {
    return {
      root: this.root,
      dependency: this.dependency
    };
  }
}

class ExternalField {
  constructor(app, external) {
    this.app = app;
    this.external = external;
  }

  get libs() {
    let { alias, dir } = this.external.libs || {};
    if (alias && !dir) dir = this.app.miniprogram.root;
    return { alias, dir };
  }

  get assets() {
    return this.external.assets;
  }

  get components() {
    let dest = this.app.miniprogram.componentsDir;
    let { dir: src, using = [] } = this.external.components || {};
    if (using.length) {
      if (!src) {
        throw new Error("未指定公共组件目录");
      }
      return { src, dest, using };
    } else {
      return null;
    }
  }

  toJSON() {
    return {
      libs: this.libs,
      assets: this.assets,
      components: this.components
    };
  }
}

module.exports = {
  MatrixConfig
};
