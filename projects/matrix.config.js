/*
 * @Author: Xavier Yin
 * @Date: 2019-08-14 15:45:55
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2019-08-16 14:39:48
 *
 * 测试用 matrix 配置文件
 */
module.exports = {
  apps: {
    // 小程序名称（唯一标识）
    minimap: {
      miniprogram: {
        // 小程序源代码根路径
        root: "./apps/minimap/src",
        // 外部依赖 js 导入文件
        deps: { src: ".deps/index", dest: "build/deps" }, // or ".deps"

        componentsDir: "./build/components"
      },

      // 外部依赖目录及别名
      libs: { alias: "@libs", dir: "./common/libs" }, // or "./common/libs"

      // 静态资源输出目录
      assets: {
        dirname: "assets",
        output: "./build/minimap"
      },

      // 公共组件
      components: {
        dir: "./common/components",
        using: ["Welcome"]
      }
    }
  }
};
