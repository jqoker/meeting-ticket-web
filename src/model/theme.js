export const model = {
  title: {
    type: String,
    value: '',
    require: true,
    comment: '主题名称'
  },
  content: {
    type: String,
    value: '',
    require: true,
    comment: '主题内容'
  },
  // meetId: {
  //   type: String,
  //   value: '',
  //   require: true,
  //   comment: '所属会议ID',
  // },
  authorId: {
    type: String,
    value: '',
    require: true,
    comment: '嘉宾ID',
  },
};


/// 模型对象，用于表单
const object = {};
const modelAttrs = Object.keys(model).forEach((attr, i) => {
  object[attr] = model[attr].value;
});
export const modelObject = object;
