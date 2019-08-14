/*
 * miniprogrammatrix 配置对象
 */
module.exports = {
  globals: {
    // 公共依赖
    libs: {
      // 别名
      alias: "",
      // 公共依赖代码目录
      dir: ""
    },
    // 静态资源
    assets: {
      // 小程序中保存静态资源的目录名称
      dirname: "",
      // 静态资源的输出目录
      output: ""
    },
    // 公共组件
    components: {
      src: "",
      // 公共组件位于小程序中的相对路径目录
      dest: "",
      using: []
    }
  },

  apps: {}
};
