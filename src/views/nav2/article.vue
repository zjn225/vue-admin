<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-cascader
                            expand-trigger="hover"
                            :options="options"
                            v-model="selectedOptions"
                            @change="getArticleList(0)">
                    </el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.title" placeholder="输入文章标题查找"></el-input>
                </el-form-item>
                <el-button type="primary" v-on:click="handleReacher()" icon='el-icon-search'>搜索</el-button>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="articles" v-loading="listLoading" highlight-current-row style="width: 100%;"
                  @selection-change='selectArticle'>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="title" label="标题" max-width="420" sortable>
            </el-table-column>
            <el-table-column prop="author" label="作者" width="200" sortable>
            </el-table-column>
            <el-table-column prop="source" label="文章来源" width="200" sortable>
            </el-table-column>
            <el-table-column prop="time" label="发布时间" width="200" sortable>
            </el-table-column>
            <el-table-column label="操作" width="350">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
                    <el-button type="primary" size="small" @click="showColumn(false,scope.$index)" >移动栏目</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length<=1">批量删除</el-button>
            <el-button type="primary" @click="showColumn(true)" :disabled="this.sels.length<=1">批量移动</el-button>
            <!--换页-->
            <el-pagination @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--移动分类时候的弹窗-->
        <el-dialog title="请选择要移动到的分类" :visible.sync="dialogFormVisible">
            <el-cascader
                    expand-trigger="hover"
                    :options="optionsNEW"
                    v-model="column"
            >
            </el-cascader>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="batchMove" v-if='isBatch'>确 定</el-button>
                <el-button type="primary" @click="handleMove" v-if='!isBatch'>确 定</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
import util from "../../common/js/util";
import { mapMutations } from "vuex";
import { mapState } from "vuex";

import {
  getCatalog,
  deleteArticle,
  editArticle,
  getArticle,
  searchArticle,
  moveArticle
} from "../../api/xh_api";

export default {
  data() {
    return {
      column: [],
      dialogFormVisible: false,
      selectedOptions: [], //级联选择器
      isBatch: true, //判断是否是批量删除
      removeID :0, 
      options: [
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
              label: "学术年会"
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
        }
      ],
      optionsNEW: [
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
              label: "学术年会"
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
        }
      ],
      filters: {
        title: ""
      },
      isReacher: false,
      articles: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [] //列表选中列
    };
  },
  methods: {
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      const start = (currentPage - 1) * 14 + currentPage - 1;

      if (this.isReacher) {
        this.handleReacher(start);
      } else {
        console.log(start);
        this.getArticleList(start);
      }
    },
    selectArticle(selection, row) {
      this.sels = selection;
    },
    //获取文章列表
    getArticleList(start) {
      const sort = this.selectedOptions[0];
      const type = this.selectedOptions[1];
      this.listLoading = false;

      getCatalog({ sort, type, start }).then(res => {
        this.listLoading = false;
        let { code, msg, data, pageCount } = res.data;
        if (code === 200) {
          this.articles = data;
          this.isReacher = true;
          if (this.total === 0) {
            this.total = pageCount;
          }
          this.listLoading = false;

          this.isReacher = false;
        } else {
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    },
    ...mapMutations(["SAVE_ARTICLEINFO"]),

    handleReacher(start = 0) {
      console.log(this.selectedOptions);
      const sort = this.selectedOptions[0];
      const type = this.selectedOptions[1];
      const title = this.filters.title;

      this.listLoading = true;
      searchArticle({ sort, type, title, start }).then(res => {
        this.listLoading = false;
        let { code, msg, data, pageCount } = res.data;

        if (code === 200) {
          this.articles = data;
          this.isReacher = true;
          this.total = pageCount;
        } else {
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;

          //NProgress.start();
          let article = [
            {
              id: this.articles[index].id,
              type: this.articles[index].type,
              isbanner: this.articles[index].isbanner
            }
          ];
          let sort = this.selectedOptions[0];
          deleteArticle({ article, sort }).then(res => {
            this.listLoading = false;
            let { code, msg } = res.data;
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
        id: item.id,
        type: item.type,
        isbanner: item.isbanner
      }));
      const sort = this.selectedOptions[0];

      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.listLoading = true;
        //NProgress.start();
        deleteArticle({ article, sort }).then(res => {
          this.listLoading = false;
          let { code, msg } = res.data;
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
      var id = this.articles[index].id;
      var type = this.articles[index].type;
      var sort = this.selectedOptions[0];
      const result = await getArticle({ type, sort, id });
      const { data, code, msg } = result.data;
      if (code === 200) {
        data.selectedOptions = this.selectedOptions;
        this.SAVE_ARTICLEINFO(data);
        this.$router.push({ path: "/editArticle" });
      } else {
        this.$message({
          message: msg,
          type: "error"
        });
      }
    },

    /*显示批量移动界面*/
    showColumn: function(flag,index) {
      this.isBatch = flag;
      flag || (this.removeID = index);
      this.dialogFormVisible = true;
    },
    handleMove: function(index, row) {
      this.$confirm("确认移动该文章吗?", "提示", {
        type: "warning"
      }).then(() => {
        const sort = this.selectedOptions[0];
        const type = this.selectedOptions[1];
        const column = this.column;

        //NProgress.start();
        const article =[{
            id : this.articles[this.removeID].id

        }];

     
        moveArticle({ article, sort, type, column }).then(data => {
          let { code, msg } = data;
          if (code === 200) {
            this.dialogFormVisible = false;
            this.$message({
              message: "移动成功",
              type: "success"
            });
            this.getArticleList(0);
          } else {
            this.dialogFormVisible = false;
            this.$message({
              message: msg,
              type: "error"
            });
          }
        });
      });
    },
    /*批量移动界面里的确定触发此方法*/
    batchMove: function() {
      const article = this.sels.map(item => ({ id: item.id }));
      const column = this.column;
      const sort = this.selectedOptions[0];
      const type = this.selectedOptions[1];

      if (
        column[0] === this.selectedOptions[0] &&
        column[1] === this.selectedOptions[1]
      ) {
        this.$message({
          message: "当前文章已在您选择的这个分类，请不要重复移动",
          type: "error"
        });
        return;
      }

      moveArticle({ article, sort, type, column }).then(data => {
        let { code, msg } = data;
        if (code === 200) {
          this.dialogFormVisible = false;
          this.$message({
            message: "移动成功",
            type: "success"
          });
          this.getArticleList(0);
        } else {
          this.dialogFormVisible = false;
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    }
  },
  computed: {
    ...mapState(["article"])
  },
  mounted() {
    this.selectedOptions = this.article.selectedOptions || ["information", "1"];
    console.log(this.selectedOptions);
    console.log(this.article.selectedOptions);
    console.log(this.article);
    this.getArticleList(0);
  }
};
</script>

<style scoped>

</style>