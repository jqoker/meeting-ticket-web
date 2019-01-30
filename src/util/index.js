const toStr = Object.prototype.toString;
const genUuid = () => {
  return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
};
export const isArray = (arg) => {
  return Array.isArray(arg) || toStr.call(arg) === '[object Array]';
};
export const isObject = (arg) => toStr.call(arg) === '[object Object]';
export const invalidateKey = (o) => Object.keys(o).some((key) => !o[key]);
export const genUploadUrl = (file) => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();
  const uuid = genUuid();
  const ext = (file.name || '').split('.')[1];
  const prefixUrl = `static/upload/images/${year}/${month}/${day}`;
  return `${prefixUrl}/${uuid}.${ext}`;
};
