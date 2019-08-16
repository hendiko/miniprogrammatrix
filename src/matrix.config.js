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
      dir: "",
      // 公共组件位于小程序中的相对路径目录
      using: []
    }
  },

  apps: {
    // 小程序ID(自定义ID作为小程序在 mpmatrix 中的唯一标识)
    yourapp: {
      miniprogram: {
        // 小程序源代码根路径
        root: "",
        deps: {
          // 导入外部依赖的入口文件路径
          src: "",
          // 外部依赖编译后输出文件路径
          dest: ""
        },
        // 存放公共组件的目录路径
        componentsDir: ""
      }
    }
  }
};
