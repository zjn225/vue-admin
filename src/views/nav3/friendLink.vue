<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.title" placeholder="输入网站名称"></el-input>
                </el-form-item>
               
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="links" highlight-current-row  @selection-change="selectLinks" style="width: 100%;">
            <!-- 加入接口后补充 v-loading="listLoading"  -->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="name" label="网站名称" max-width="160" sortable>
            </el-table-column>
            <el-table-column prop="link" label="网站链接" max-width="220" sortable>
            </el-table-column>
            <el-table-column label="操作" width="350">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <!--换页-->
            <el-pagination layout="prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
import util from "../../common/js/util";
import { getLinkList , getLinkOne, deleteLinks} from "../../api/api";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      links: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [] //列表选中列
    };
  },
  methods: {

    ...mapMutations(["SAVE_FRIENDLINK"]),
  
    handleCurrentChange(val) {
      this.page = val;
      this.getLinkList();
    },
   
    selectLinks(selection, row) {
      this.sels.push(selection[selection.length - 1]);
    },
    getLinkList() {
      this.listLoading = true;
      getLinkList().then(res => {
        let { links,  code, msg } = res.data;
        if (code === 200) {
          this.total = links.length;
          this.links = links;
        } else {
          this.$message({
            message: msg,
            type: "error"
          });
        }
        this.listLoading = false;

        //NProgress.done();
      },(e)=>{
          this.loading = false;
          this.$message({
              message: '服务器错误',
              type: "error"
          });
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
          let links = [
            { id: this.links[index].id}
          ];
        
          deleteLinks({links}).then(res => {
            this.listLoading = false;
            let { code, msg } = res.data;
            if (code === 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getLinkList();
            } else {
              this.$message({
                message: msg,
                type: "error"
              });
            }
          });
        },(e)=>{
            this.loading = false;
            this.$message({
                message: '服务器错误',
                type: "error"
            });
        })
        .catch(() => {});
    },
    //显示编辑界面
     handleEdit: async function(index, row) {
      const id = this.links[index].id;
      const result = await getLinkOne({ id });
      const { data, code, msg } = result.data;
      if (code === 200) {
        this.SAVE_FRIENDLINK(data[0]);
        this.$router.push({ path: "/editLink" });
      } else {
        this.$message({
          message: msg,
          type: "error"
        });
      }

    },

    //新增
    handleAdd: function() {
      this.$router.push({ path: "/addFriendLink" });
    },

    //批量删除
    batchRemove: function() {

      var links = this.sels.map(item => ({ id: item.id}));
      
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          deleteLinks({ links }).then(res => {
            this.listLoading = false;
            let { code, msg } = res.data;
            if (code === 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getLinkList();
            } else {
              this.$message({
                message: msg,
                type: "error"
              });
            }
          });
        },(e)=>{
            this.loading = false;
            this.$message({
                message: '服务器错误',
                type: "error"
            });
        })
        .catch(() => {});
    }  
     
  },
  mounted() {
    this.getLinkList();
  }
};
</script>

<style scoped>

</style>