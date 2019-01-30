<template lang="html">
  <div class="meet-detail">
    <el-row v-for="(label, index) in labelMap">
      <el-col :span="2">
        <div class="grid-content">{{label.value}}</div>
      </el-col>
      <el-col v-if="label.name !== 'themes'" :span="22">
        <div class="grid-content">{{meet[label.name]}}</div>
      </el-col>
      <el-col :span="22" v-else>
        <div class="meet-detail-theme" v-for="(theme, index) in meet['themes']">
          <div class="meet-detail-theme-order">
            {{index}}
          </div>
          <el-row>
            <el-col :span="2">
              <div class="grid-content">名称</div>
            </el-col>
            <el-col :span="22">
              <div class="grid-content theme-title">{{theme.title}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <div class="grid-content">内容</div>
            </el-col>
            <el-col :span="22">
              <div class="grid-content">{{theme.content}}</div>
            </el-col>
          </el-row>
          <el-row v-if="theme.author">
            <el-col :span="2">
              <div class="grid-content">嘉宾</div>
            </el-col>
            <el-col :span="22">
              <el-popover
                placement="top-start"
                trigger="hover"
              >
                <div class="meet-theme-author">
                  <div class="author-avatar-img">
                    <img :src="theme.author.avatarImgUrl" alt="头像" />
                  </div>
                  <div class="author-info">
                    <div class="author-name">
                      {{theme.author.name}}
                    </div>
                    <div class="author-meta">
                      <span class="author-profession">{{theme.author.profession}}</span>
                      <span class="author-company">{{theme.author.company}}</span>
                      <span v-if="!theme.author.praise" class="author-praise">{{theme.author.praise}}</span>
                    </div>
                  </div>
                </div>
                <div slot="reference" class="slot-author-name">{{theme.author.name || ''}}</div>
              </el-popover>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  const labelMap = [
    {
      name: 'title',
      value: '会议',
    },
    {
      name: 'time',
      value: '时间',
    },
    {
      name: 'summary',
      value: '简介',
    },
    {
      name: 'addr',
      value: '地址',
    },
    {
      name: 'ticketPrice',
      value: '票价',
    },
    {
      name: 'themes',
      value: '主题',
    },
    {
      name: 'sponsor',
      value: '主办方',
    },
    {
      name: 'coSponsor',
      value: '协办方',
    }
  ];
  export default {
    props: [
      'meet'
    ],
    data() {
      return {
        labelMap,
      };
    },
  }
</script>

<style lang="css">
  .meet-detail {
    border: 1px solid #ebeef5;
    color: #6e6d6d;
    line-height: 1.5;
  }
  .meet-detail .el-row {
    padding: 14px;
    border-bottom: 1px solid #ebeef5;
  }
  .meet-detail .el-row:last-child {
    border-bottom: none;
  }
  .meet-detail .meet-detail-theme {
    margin-bottom: 10px;
    border: 1px solid #ebeef5;
  }
  .meet-detail .meet-theme-author {
  }
  .meet-theme-author .author-avatar-img {
    display: inline-block;
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  .meet-theme-author .author-avatar-img img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .meet-theme-author .author-info {
    display: inline-block;
    font-size: 12px;
    vertical-align: top;
  }
  .meet-theme-author .author-info .author-name {
    color: #333;
    font-weight: 600;
  }
  .meet-theme-author .author-info .author-meta {
    font-size: 10px;
    color: #606266;
    margin-top: 5px;
  }
  .meet-theme-author .author-info .author-meta span {
    padding: 0;
    margin: 0 5px 0 0;
  }
  .meet-detail-theme {
    position: relative;
  }
  .meet-detail-theme .slot-author-name {
    display: inline-block;
    font-weight: 600;
    color: #409EFF;
  }
  .meet-detail-theme .slot-author-name:hover {
    cursor: pointer;
  }
  .meet-detail-theme .theme-title {
    margin: 0;
    font-weight: 600;
  }
  .meet-detail-theme .meet-detail-theme-order {
    position: absolute;
    left: -20px;
    top: 2%;
    background-color: #409EFF;
    color: #fff;
    width: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
  }
</style>
