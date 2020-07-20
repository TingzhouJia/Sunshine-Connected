const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),   
 
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#F1C331' },
        localIdentName: '[local]--[hash:base64:5]' 
       // 自定义 CSS Modules 的 localIdentName
    }),
);
