/**
 * @Author: yuhongliang
 * @Date:   2018-08-23T12:18:55+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: meet.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-23T12:22:43+08:00
 */

export const model = {
  title: {
    type: String,
    value: '',
    require: true,
    comment: '会议标题',
  },
  time: {
    type: String,
    value: '',
    require: true,
    comment: '会议时间',
  },
  imgUrl: {
    type: String,
    value: '',
    require: false,
    comment: '主题图片'
  },
  addr: {
    type: String,
    value: '',
    require: true,
    comment: '举办地址',
  },
  ticketPrice: {
    type: String,
    value: '',
    require: true,
    comment: '会议门票',
  },
  summary: {
    type: String,
    value: '',
    require: true,
    comment: '会议简介',
  },
  ids: {
    type: Array,
    value: '',
    require: true,
    comment: '会议主题',
  },
  // themes: {
  //   type: Array,
  //   value: '',
  //   require: true,
  //   comment: '会议主题',
  // },
  sponsor: {
    type: String,
    value: '',
    require: true,
    comment: '主办方',
  },
  coSponsor: {
    type: String,
    value: '',
    require: true,
    comment: '协办方',
  },
  publish: {
    type: Boolean,
    value: true,
    require: false,
    comment: '是否上线',
  },
};

/// 模型对象，用于表单
const object = {};
const modelAttrs = Object.keys(model).forEach((attr, i) => {
  object[attr] = model[attr].value;
});
export const modelObject = object;
