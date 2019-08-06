/*
 * @Author: Xavier Yin 
 * @Date: 2018-11-09 17:24:31 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-11-14 15:03:55
 * 
 * Matrix Configuration
 * 
 * 
 * 
 * 
 * {
 *  componentsDir: 'components',
 *  componentsDest: 'publicComponents',
 *  depsDir: 'deps'
 * }
 */


const config = {
  libs: String,
  components: String,
  componentsOutput: String,
  apps: [
    {
      id: String,
      src: String,
      components: String,
      componentsOutput: String,
      libs: String,
    }
  ]
}