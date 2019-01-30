/**
 * @Author: yuhongliang
 * @Date:   2018-08-27T17:04:25+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: submit.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-27T17:05:39+08:00
 */

import request from '../util/request.js';
import Alert from './Alert.js';
import {
  isArray,
  isObject,
} from '../util/index.js';

const checkRule = (model, input) => {
  // const props = Object.keys(input);
  // console.log('checkRule', input);
  const props2 = Object.keys(model);
  for (let i = 0, len = props2.length; i < len; i++) {
    const prop = props2[i];
    // const attr = model[prop];
    const attr = input[prop];
    if (attr === undefined) {
      throw new Error(`模块未定义属性${prop}->${attr}`);
      return;
    }
    const { require, rule } = model[prop];
    const inputValue = attr; // input[prop];

    //1. 必填没有值
    //2. 必填有值，有格式要求且不符合
    //3. 非必填有值，有格式要求且不符合
    if (require && (!inputValue || inputValue.length === 0)
      || (require && rule && !rule.test(inputValue))
      || (!require && (inputValue && rule && !rule.test(inputValue)))
    ) {
      return {
        isError: true,
        msg: model[prop].comment,
      };
    }
  }
  return {
    isError: false,
  };
};
const check = (model, data) => {
  let isOK = true;
  let tipMsg = '';

  // 数组
  if (isArray(data)) {
    for (let i = 0, len = data.length; i < len; i++) {
      const {
        isError,
        msg = '',
      } = checkRule(model, data[i]);
      // 有错误，退出
      if (isError) {
        isOK = false;
        tipMsg = msg;
        break;
      };
    }
  }
  // 对象
  if (isObject(data)) {
    const {
      isError,
      msg = '',
    } = checkRule(model, data);
    isOK = !isError;
    tipMsg = msg;
  }
  return {
    isOK,
    tipMsg,
  };
};
const noop = () => {};
export const ajaxSubmit = (option) => {
  const {
    url,
    model,
    data,
    preSubmit = noop,
  } = option;
  const { isOK, tipMsg } = check(model, data);

  if (!isOK) {
    Alert.message.warning(`请正确输入必填字段->${tipMsg}`);
    return;
  }

  return request({
    method: 'POST',
    url,
    data,
  });
}
