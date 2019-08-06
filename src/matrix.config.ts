/*
 * @Author: Xavier Yin 
 * @Date: 2018-11-14 16:52:03 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-11-17 23:28:54
 */

const path = require('path');

interface IApps {
  [prop: string]: AppConfig
}

class Matrix {
  globals: GlobalsConfig;
  apps: IApps;
  root: string;

  defaults: object = {
    libs: 'libs',
    fileName: '.deps.js'
  }


  defaultLibs: string = 'libs';
  defaultLibsSrcFileName: string = ".deps.js";
  defaultLibsDestFileName: string = 'deps.js';
  defaultComponents: string = 'components';
  defaultComponentsDest: string = 'matrix-components';

  constructor(configuration: IMatrixConfig) {
    let { globals = {}, apps } = configuration;
    this.root = process.cwd();
    this.globals = new GlobalsConfig(globals, this);
    this.apps = apps.reduce((memo: IApps, item) => {
      memo[item.id] = new AppConfig(item, this);
      return memo;
    }, {});
  }

  resolve(pathname: string) {
    return path.resolve(this.root, pathname);
  }
}

export class AppConfig {
  _config: IAppConfig;
  _matrix: Matrix;

  constructor(config: IAppConfig, matrix: Matrix) {
    this._config = config;
    this._matrix = matrix;
  }

  get id(): string { return this._config.id }
  get src(): string { return this._config.src }
  get libs(): string { return this._config.libs || this._matrix.globals.libs }
  get libsDestFileName(): string { return this._config.libsDestFileName || this._matrix.globals.libsDestFileName }
  get components(): string { return this._config.components || this._matrix.globals.components }
  get componentsDest(): string { return this._config.componentsDest || this._matrix.globals.componentsDest }

  get libsSrcFileName(): string {

    return
  }
}

class GlobalsConfig {
  _config: IGlobalsConfig;
  _matrix: Matrix;

  constructor(config: IGlobalsConfig, matrix: Matrix) {
    this._config = config;
    this._matrix = matrix;
  }

  get libs(): string { return this._config.libs || this._matrix.defaultLibs }
  get libsSrcFileName(): string { return this._config.libsSrcFileName || this._matrix.defaultLibsSrcFileName }
  get libsDestFileName(): string { return this._config.libsDestFileName || this._matrix.defaultLibsDestFileName }
  get components(): string { return this._config.components || this._matrix.defaultComponents }
  get componentsDest(): string { return this._config.componentsDest || this._matrix.defaultComponentsDest }
}

export default Matrix