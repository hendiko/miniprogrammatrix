/*
 * @Author: Xavier Yin 
 * @Date: 2018-11-14 10:57:50 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-11-14 16:03:56
 */


const config = {
  globals: {
    libs: String,  // 公共 libs
    libsOutput: String,
    components: String,  // 公共 components
    componentsOutput: String, // 小程序存放公共 components 的目录
  },
  apps: [
    {
      id: String,  // 小程序唯一标识
      src: String,  // 小程序项目根目录所在路径
      components: String,  // 该小程序的公共组件位置
      componentsOutput: String, // 该小程序的公共组件存放位置
      libs: String,  // 小程序公共 js 库
      libsOutput: String
    }
  ]
}

const path = require('path');

class MatrixConfig {
  constructor(configuration, root) {
    this.root = root;
    this.configuration = configuration;
    let { libs = 'libs', components = 'components', componentsOutput, libsOutput, apps = [] } = configuration;
    this.globals = { libs, components, componentsOutput, libsOutput };
    this.apps = apps.reduce((memo, item) => {
      if (item.id) {
        memo[item.id] = { libs, components, componentsOutput, libsOutput, ...item };
      }
      return memo;
    }, {});
  }

  path(relativePath) {
    return path.resolve(this.root, relativePath);
  }
}


class GlobalConfig {
  constructor(data) {
    this.data = data || {};
  }

  get libs() {
    return this.data.libs || 'libs'
  }
}

class AppConfig {

}

module.exports = MatrixConfig;