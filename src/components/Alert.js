/**
 * @Author: yuhongliang
 * @Date:   2018-08-20T10:58:27+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: Alert.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-20T10:58:58+08:00
 */

import {
  MessageBox,
  Message,
} from 'element-ui';

function noop () {};

const Alert = {};

Alert.confirm = (option) => {
  const {
    title = '',
    confirmText = '确定',
    cancelText = '取消',
    center = true,
    ok = noop,
  } = option;

  return MessageBox.confirm(title, '警告', {
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        type: 'warning',
        center,
      }).then(() => {
        return ok();
      }).catch(() => {});
}

Alert.message = {
  success: (title) => {
    Message.success({
      message: title,
      center: true,
    });
  },
  warning: (title) => {
    Message.warning({
      message: title,
      center: true,
    });
  },
  error: (title) => {
    Message.error({
      message: title,
      center: true,
    });
  }
}

export default Alert;
