/**
 * 一个输入model应该至少包括
 * 名称、类型、是否必填、说明、校验规则几大属性
 */

// 这里的类型均为string类型
export const model = {
  name: {
    type: String,
    value: '',
    require: true,
    comment: '嘉宾姓名',
  },
  summary: {
    type: String,
    value: '',
    require: true,
    comment: '嘉宾简介',
  },
  avatarImgUrl: {
    type: String,
    value: '',
    require: false,
    comment: '嘉宾头像',
  },
  positionalTitle: {
    type: String,
    value: '',
    require: false,
    comment: '职称',
  },
  profession: {
    type: String,
    value: '',
    require: true,
    comment: '从事行业',
  },
  company: {
    type: String,
    value: '',
    require: true,
    comment: '任职公司',
  },
  blogSiteUrl: {
    type: String,
    value: '',
    require: false,
    comment: '博客地址',
  },
  githubSiteUrl: {
    type: String,
    value: '',
    require: false,
    comment: 'github地址',
  },
  interest: {
    type: String,
    value: '',
    require: false,
    comment: '兴趣爱好',
  },
  telephone: {
    type: String,
    value: '',
    require: false,
    rule: /^1[3-9][0-9]{9}$/,
    comment: '联系电话',
  },
  email: {
    type: String,
    value: '',
    require: true,
    rule: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    comment: '邮箱',
  },
};

/// 模型对象，用于表单
const object = {};
const modelAttrs = Object.keys(model).forEach((attr, i) => {
  object[attr] = model[attr].value;
});
export const modelObject = object;
