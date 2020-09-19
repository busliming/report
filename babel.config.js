/*
 * @Desc: 
 * @Date: 2020-05-13 16:33:09
 * @LastEditors: Nice
 * @LastEditTime: 2020-06-12 21:42:08
 */ 
module.exports = {
  presets: [
    ['@quasar/babel-preset-app',{
      presetEnv:{
        modules: false,
        loose: false,
        useBuiltIns: 'usage',
        corejs: 2
      }
    }]
  ],
  sourceType: 'unambiguous',
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
}
