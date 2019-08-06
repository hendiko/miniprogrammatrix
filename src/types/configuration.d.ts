/*
 * @Author: Xavier Yin 
 * @Date: 2018-11-14 17:40:18 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-11-14 18:07:50
 */


interface IBasic {
  libs?: string,
  libsDest?: string,
  components?: string,
  componentsDest?: string
}

interface IGlobalsConfig extends IBasic {
  [prop: string]: any
}

interface IAppConfig extends IBasic {
  id: string,
  src: string,
  [prop: string]: any
}

interface IMatrixConfig {
  globals?: IGlobalsConfig,
  apps: IAppConfig[]
}