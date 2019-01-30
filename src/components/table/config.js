/**
 * @Author: yuhongliang
 * @Date:   2018-09-06T23:13:46+08:00
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-09-06T23:14:11+08:00
 */

export const meetTableColumnsConfig = {
  columns: [
    {
      id: 'id',
      label: '编号',
      width: 100,
    },
    {
      id: 'title',
      label: '主题',
      width: 180,
    },
    {
      id: 'time',
      label: '时间',
    },
    {
      id: 'addr',
      label: '地址',
    },
    {
      id: 'ticketPrice',
      label: '票价',
    },
    {
      id: 'sponsor',
      label: '主办方',
    }
  ]
};

export const authorTableColumnsConfig = {
  columns: [
    {
      id: 'id',
      label: '编号',
      width: 100,
    },
    {
      id: 'name',
      label: '姓名',
      width: 100,
    },
    {
      id: 'summary',
      label: '简介',
      width: 200,
    },
    {
      id: 'avatarImgUrl',
      label: '头像',
      width: 100,
      template: true,
    },
    {
      id: 'positionalTitle',
      label: '职称',
    },
    {
      id: 'profession',
      label: '从事行业',
    },
    {
      id: 'company',
      label: '任职公司',
    },
    {
      id: 'blogSiteUrl',
      label: '博客地址',
      template: true,
    },
    {
      id: 'github',
      label: 'github',
      template: true,
    },
    {
      id: 'interest',
      label: '兴趣爱好',
    }
  ]
};
