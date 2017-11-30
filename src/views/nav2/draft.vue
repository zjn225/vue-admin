<template>
    <section>
          
        <!--列表-->
        <el-table :data="drafts" v-loading="listLoading" highlight-current-row style="width: 100%;"
                  @selection-change='selectArticle'>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="title" label="标题" max-width="320">
            </el-table-column>
            <el-table-column prop="author" label="作者" width="100">
            </el-table-column>
            <el-table-column prop="_sort" label="类别" width="100" sortable>
            </el-table-column>
            <el-table-column prop="_type" label="子类别" width="100">
            </el-table-column>
            <el-table-column prop="source" label="文章来源" width="100">
            </el-table-column>
            <el-table-column prop="time" label="文章发布时间" width="130" sortable>
            </el-table-column>
            <el-table-column prop="draftTime" label="上次修改时间" width="200" sortable>
            </el-table-column>
            <el-table-column label="操作" width="420">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="postArticle(scope.$index)"icon='el-icon-upload2' >发布</el-button>
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)"
                               icon="el-icon-edit">编辑
                    </el-button>
                    <el-button type="primary" size="small" @click="showColumn(false,scope.$index)">移动栏目</el-button>

                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)"
                               icon="el-icon-delete">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
          <!--移动分类时候的弹窗-->
        <el-dialog title="请选择要移动到的分类" :visible.sync="dialogFormVisible" width="25%" center>
           <div style="text-align: center;">
              <el-cascader
                    expand-trigger="hover"
                    :options="options"
                    v-model="column"
            >
            </el-cascader>
           </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleMove">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
           
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length<=1">批量删除</el-button>
           
            <!--换页-->
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
import util from "../../common/js/util";
import { mapMutations } from "vuex";
import { mapState } from "vuex";

import {
  getDraftCatalog,
  publishDraft,
  deleteDraft,
  editDraft,
  getDraft,
  moveDraft
} from "../../api/api";

export default {
  data() {
    return {
      currentPage: 1,
      column: [],
      dialogFormVisible: false,
      removeID: 0,
      options:  [
          {
              value: "information",
              label: "科研资讯",
              children: [
                  {
                      value: "1",
                      label: "科研简讯"
                  },
                  {
                      value: "2",
                      label: "媒体报道"
                  }
              ]
          },
          {
              value: "research",
              label: "科学研究",
              children: [
                  {
                      value: "1",
                      label: "课题研究"
                  },
                  {
                      value: "2",
                      label: "调研考察"
                  }
              ]
          },
          {
              value: "achievement",
              label: "科研成果",
              children: [
                  {
                      value: "1",
                      label: "著作"
                  },
                  {
                      value: "2",
                      label: "学术论文"
                  },
                  {
                      value: "3",
                      label: "研究报告"
                  }
              ]
          },
          {
              value: "exchange",
              label: "学术交流",
              children: [
                  {
                      value: "1",
                      label: "学术会议"
                  },
                  {
                      value: "2",
                      label: "流通论坛"
                  },
                  {
                      value: "3",
                      label: "来访交流"
                  }
              ]
          },
          {
              value:"advisory",
              label:"咨询服务",
              children:[
                  {
                      value:"1",
                      label:"政府咨询"
                  },
                  {
                      value:"2",
                      label:"企业咨询"
                  },
                  {
                      value:"3",
                      label:"培训课程"
                  }
              ]
          },
          {
              value:"expert",
              label:"智库专家",
              children:[
                  {
                      value:"1",
                      label:"专家动态"
                  },
              ]
          }
      ],
     
      filters: {
        title: ""
      },
      drafts: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [] //列表选中列
    };
  },
  methods: {
    ...mapMutations(["SAVE_DRAFTINFO"]),

    /*翻页*/
    handleCurrentChange(currentPage) {
      const start = (currentPage - 1) * 14 + currentPage - 1;
      this.getArticleList(start, false);
    },
    selectArticle(selection, row) {
      this.sels = selection;
    },
    format(target) {
      let drafts = [];
      let options = this.options;
      target.forEach(draft => {
        let temp = options.filter(item => {
           return item.value === draft.sort
        });
        drafts.push(temp);
      });
      drafts.forEach((element,index) => {
          let ele = element[0];
            let type = parseInt(target[index].type) - 1;
          target[index]._sort = ele.label;
          target[index]._type = ele.children[type].label;
      });
      this.drafts = target;
      this.listLoading = false;
      
    },
    //获取文章列表
    getArticleList(start, flag = true) {
      this.listLoading = false;

      getDraftCatalog(start).then(res => {
        let { code, msg, data, pageCount } = res;
        if (code === 200) {
          this.format(data)
          flag && (this.total = pageCount);
        } else {
        this.listLoading = false;
            
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    },
     postArticle(index){
        this.$confirm("确认发布该草稿吗?", "提示", {
            type: "warning"
        })
        .then(() => {
          this.listLoading = true;
          let id = this.drafts[index].id;
          publishDraft({id}).then(data=>{
          this.listLoading = false;
            
            let { code, msg } = data;
            if (code === 200) {
                   
              this.$message({
                message: "发布成功",
                type: "success"
              });
              this.getArticleList(0);
            } else {
              this.$message({
                message: msg,
                type: "error"
              });
            }
          })  

        })
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该草稿吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;

          let article = [
            {
              id: this.drafts[index].id
            }
          ];

          deleteDraft({ article }).then(data => {
            this.listLoading = false;
            let { code, msg } = data;
            if (code === 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getArticleList(0);
            } else {
              this.$message({
                message: msg,
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },

    //批量删除
    batchRemove: function() {
      const article = this.sels.map(item => ({
        id: item.id
      }));

      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.listLoading = true;
        deleteDraft({ article }).then(data => {
          this.listLoading = false;
          let { code, msg } = data;
          if (code === 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getArticleList(0);
          } else {
            this.$message({
              message: msg,
              type: "error"
            });
          }
        });
      });
    },
    //显示编辑界面
    async handleEdit(index, row) {
      let id = this.drafts[index].id;

      const result = await getDraft({ id });
      const { data, code, msg,dratTime } = result;
      if (code === 200) {
        this.SAVE_DRAFTINFO(data);
        this.$router.push({ path: "/editDraft" });
      } else {
        this.$message({
          message: msg,
          type: "error"
        });
      }
    },

    /*显示批量移动界面*/
    showColumn: function(flag, index) {
      this.isBatch = flag;
      flag || (this.removeID = index);
      this.column[0] = this.drafts[index].sort;
      this.column[1] = ""+this.drafts[index].type;
      console.log(typeof this.column[1])
      this.dialogFormVisible = true;
    },
    handleMove: function() {
      const column = this.column;
      console.log(typeof this.column[1])
      
      const sort = this.drafts[this.removeID].sort;
      const type = this.drafts[this.removeID].type;
      const id = this.drafts[this.removeID].id;
      if (column[0] === sort && column[1] === type) {
        this.$message({
          message: "当前文章已在您选择的这个分类，请不要重复移动",
          type: "error"
        });
        return;
      }
      this.$confirm("确认移动该文章吗?", "提示", {
        type: "warning"
      }).then(() => {
        
        moveDraft({ id, sort:column[0],type:column[1] }).then(data => {
          let { code, msg } = data;
          if (code === 200) {
            this.dialogFormVisible = false;
            this.$message({
              message: "移动成功",
              type: "success"
            });
            this.getArticleList(0);
            this.column = [];
          } else {
            this.dialogFormVisible = false;
            this.$message({
              message: msg,
              type: "error"
            });
          }
        });
      });
    }
  },
  mounted() {
    this.getArticleList(0);
  }
};
</script>

<style scoped>

</style>