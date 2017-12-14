<template>
    <section>
        <el-tabs :tab-position="tabPosition" style="height: 200px;">

            <!--未读的-->
            <el-tab-pane label="全部"> <!--列表-->
                <el-table :data="Readfeeds" highlight-current-row v-loading="isLoading" @selection-change="selsChange"
                          style="width: 100%;" id='mytable'>
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column type="index" label="序号">
                    </el-table-column>
                    <el-table-column prop="title" label="标题" >
                    </el-table-column>
                    <el-table-column prop="isread" label="状态" >
                    </el-table-column>
                    <el-table-column prop="time" label="时间" >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                           
                            <el-button type="primary" size="small" @click="look(scope.$index, scope.row)">查看
                            </el-button>
                            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
                    <el-pagination layout="prev, pager, next,jumper" @current-change="handleCurrentChange"
                                   :page-size="20"
                                   :unReadTotal="unReadTotal" style="float:right;">
                    </el-pagination>
                </el-col>
            </el-tab-pane>
            <!--未读的-->
            <el-tab-pane label="未读"> <!--列表-->
                <el-table :data="unReadfeeds" highlight-current-row v-loading="isLoading" @selection-change="selsChange"
                          style="width: 100%;" id='mytable'>
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column type="index" label="序号">
                    </el-table-column>
                    <el-table-column prop="title" label="标题" >
                    </el-table-column>
                    <el-table-column prop="isread" label="状态" >
                    </el-table-column>
                    <el-table-column prop="time" label="时间" >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                           
                            <el-button type="primary" size="small" @click="look(scope.$index, scope.row)">查看
                            </el-button>
                            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
                    <el-pagination layout="prev, pager, next,jumper" @current-change="handleCurrentChange"
                                   :page-size="20"
                                   :unReadTotal="unReadTotal" style="float:right;">
                    </el-pagination>
                </el-col>
            </el-tab-pane>

            <!--已读的-->
            <el-tab-pane label="已读"> <!--列表-->
                <el-table :data="isReadfeeds" highlight-current-row v-loading="isLoading" @selection-change="selsChange"
                          style="width: 100%;" id='mytable'>
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column type="index" label="序号">
                    </el-table-column>
                    <el-table-column prop="title" label="标题" >
                    </el-table-column>
                    <el-table-column prop="isread" label="状态" >
                    </el-table-column>
                    <el-table-column prop="time" label="时间" >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="look(scope.$index, scope.row)">查看
                            </el-button>
                            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
                    <el-pagination layout="prev, pager, next,jumper" @current-change="handleCurrentChange"
                                   :page-size="20"
                                   :isReadTotal="isReadTotal" style="float:right;">
                    </el-pagination>
                </el-col>
            </el-tab-pane>
        </el-tabs>

        <el-dialog
                title="详情页"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>{{content}}</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>

    </section>
</template>

<script>
import util from "../../common/js/util";
import { mapMutations } from "vuex";
import {
  getReadFeedList,
  removeFeeds,
  batchRemoveFeeds,
  addFeeds,
  getFeedOne,
  deleteFeed,
  lookContent
} from "../../api/api";

export default {
  data() {
    return {
      dialogVisible: false,

      tabPosition: "top",
      Readfeeds: [],
      isReadfeeds: [],
      unReadfeeds: [],
      isReadTotal: 0,
      unReadTotal: 0,
      page: 1,
      content: "",
      isLoading: false,
      sels: [] //列表选中列
    };
  },
  methods: {
    //已读的
    handleCurrentChange(currentPage) {
      const start = (currentPage - 1) * 20 + currentPage - 1;
      getIsReadFeeds(start);
    },

    //未读的
    handleCurrentChange(currentPage) {
      const start = (currentPage - 1) * 20 + currentPage - 1;
      getUnReadFeeds(start);
    },

    //获取反馈列表
    getFeeds(start = 0) {
      this.isLoading = false; //记得修改为true
      getReadFeedList({ start }).then(
        data => {
          this.isReadtotal = data.pageCount;
          console.log(data.feedback);
          this.Readfeeds = data.feedback;
          this.isLoading = false;
          this.sortReadFeeds();
        },
        e => {
          this.loading = false;
          this.$message({
            message: "服务器错误",
            type: "error"
          });
        }
      );
    },
    //分未读和已读
    sortReadFeeds() {
      this.isReadfeeds = [];
      this.unReadfeeds = [];
      for (let i = 0, len = this.Readfeeds.length; i < len; i++) {
        this.Readfeeds[i].index = i;

        console.log(this.Readfeeds[i]);
        if (this.Readfeeds[i].isread == 1) {
          this.Readfeeds[i].status = "已读";

          this.isReadfeeds.push(this.Readfeeds[i]);
        } else {
          this.Readfeeds[i].status = "未读";

          this.unReadfeeds.push(this.Readfeeds[i]);
        }
      }
    },

    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.isLoading = true;
          let feed = [{ id: row.id }];
          deleteFeed({ feed }).then(
            data => {
              this.isLoading = false;
              let { code, msg } = data;
              if (code === 200) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getFeeds(0);
              } else {
                this.$message({
                  message: msg,
                  type: "error"
                });
              }
            },
            e => {
              this.loading = false;
              this.$message({
                message: "服务器错误",
                type: "error"
              });
            }
          );
        })
        
    },

    //查看详情列表
    look: function(index, row) {
      this.isLoading = true;

      this.Readfeeds[row.index].isread = 1;
      this.sortReadFeeds();
      let id = row.id;

      getFeedOne({ id }).then(
        data => {
          this.isLoading = false;
          let { feed, code, msg } = data;
          if (code === 200) {
            this.content = feed.content;
            this.dialogVisible = true; //打开弹出框，里面是详情
          } else {
            this.$message({
              message: msg,
              type: "error"
            });
          }
        },
        e => {
          this.loading = false;
          this.$message({
            message: "服务器错误",
            type: "error"
          });
        }
      );
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //详情页的关闭
    handleClose(done) {
      done();
    },
    //批量删除
    batchRemove: function() {
      var feed = this.sels.map(item => ({ id: item.id }));
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.isLoading = true;

          deleteFeed({ feed }).then(
            res => {
              this.isLoading = false;
              let { code, msg } = res;
              if (code === 200) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getFeeds(0);
              } else {
                this.$message({
                  message: msg,
                  type: "error"
                });
              }
            },
            e => {
              this.loading = false;
              this.$message({
                message: "服务器错误",
                type: "error"
              });
            }
          );
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getFeeds(0);
  }
};
</script>

<style scoped>

</style>