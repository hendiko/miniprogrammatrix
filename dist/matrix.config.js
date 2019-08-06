"use strict";
/*
 * @Author: Xavier Yin
 * @Date: 2018-11-14 16:52:03
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-11-15 17:24:41
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
class Matrix {
    constructor(configuration) {
        this.defaultLibs = 'libs';
        this.defaultLibsDest = 'matrix.libs.js';
        this.defaultComponents = 'components';
        this.defaultComponentsDest = 'matrixComponents';
        let { globals = {}, apps } = configuration;
        this.root = process.cwd();
        this.globals = new GlobalsConfig(globals, this);
        this.apps = apps.reduce((memo, item) => {
            memo[item.id] = new AppConfig(item, this);
            return memo;
        }, {});
    }
    resolve(pathname) {
        return path.resolve(this.root, pathname);
    }
}
class AppConfig {
    constructor(config, matrix) {
        this._config = config;
        this._matrix = matrix;
    }
    get id() { return this._config.id; }
    get src() { return this._config.src; }
    get libs() { return this._config.libs || this._matrix.globals.libs; }
    get libsDest() { return this._config.libsDest || this._matrix.globals.libsDest; }
    get components() { return this._config.components || this._matrix.globals.components; }
    get componentsDest() { return this._config.componentsDest || this._matrix.globals.componentsDest; }
}
class GlobalsConfig {
    constructor(config, matrix) {
        this._config = config;
        this._matrix = matrix;
    }
    get libs() { return this._config.libs || this._matrix.globals.libs; }
    get libsDest() { return this._config.libsDest || this._matrix.globals.libsDest; }
    get components() { return this._config.components || this._matrix.globals.components; }
    get componentsDest() { return this._config.componentsDest || this._matrix.globals.componentsDest; }
}
exports.default = Matrix;
//# sourceMappingURL=matrix.config.js.map