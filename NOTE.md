## NOTE

### webpack打包
1. webpack多chunk时，extract-text-webpack-plugin插件配置需为如下形式
```
new ExtractTextPlugin({
  filename: 'css/[name].css',
  allChunks: true,
})

```
2. VueRouter懒加载，需要webpack code split功能支持，并将vender包独立开来

### vue相关
1. vue中data必须实现为函数形式
2. vuex中应该使用namespace来隔离模块，否则在mapActions时如果有重名的action，那么该action会重复执行多次。使用命名空间后，vue文件中需要使用createNamespacedHelpers函数来重新定义mapState,mapActions。注意mapState中取值是的嵌套层次

### vue-router相关
1. 懒加载，配合webpack的code split功能
2. 使用beforeEach钩子来执行登录校验

### 归档相关
1. 接口url使用常量来定义归档
2. 为了能统一配置，需使用项目全局配置文件，如config.js文件
3. 对于需要保证代码多处值一致的情况，应该将相关变量定义成常量后再被使用，否则很难保证一致性

### 组件化相关
1. 输入表单模型对象，该模型应该具有类型、值、是否必填、数据格式规则等基本属性
2. 对于表单输入，将表单组件化并使用父子组件间通过引用类型传值
3. 对于固定外壳样式的组件可以通过slot方式来动态填坑

### 登录相关
1. 独立出auth模块，用于处理用户登录

### 样式相关
1. 全局样式应该独立成统一文件管理，如global.css文件
2. 针对element-ui定制的样式，修改方式为通过web inspector检查器，获取class后修改。如果需要全局改变，那么可以写入global.css文件中并且不使用子选择器的方式限制样式生效范围，否则使用子选择器限制样式生效范围
3. 虽然vue针对样式提供了scoped选项，但是本质上是通过使用属性选择器来强化。由于属性选择器本身存在一定优先级，并且scoped选项值只针对本组件生效，对于组件嵌套情况，容易导致样式混乱，调试困难，因此不建议采用。
