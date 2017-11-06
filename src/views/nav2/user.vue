<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="persons" highlight-current-row v-loading="isLoading" @selection-change="selsChange"
                  style="width: 100%;" id='mytable'>
            <el-table-column type="selection" >
            </el-table-column>
            <el-table-column type="index"  label="序号">
            </el-table-column>
            <el-table-column prop="name" label="姓名"  sortable>
            </el-table-column>
            <el-table-column prop="position" label="职称"  sortable>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
import util from "../../common/js/util";
import { mapMutations } from "vuex";
import {
  getTeamList,
  removeUser,
  batchRemoveUser,
  addUser,
  getTeamOne,
  deletePerson,
  reacherPerson
} from "../../api/xh_api";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      persons: [],
      total: 0,
      page: 1,
      isLoading: false,
      sels: [], //列表选中列
      isReacher: "",
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SAVE_TEAMONE"]),
    handleCurrentChange(currentPage) {
      const start = (currentPage - 1) * 20 + currentPage - 1;

      if (this.isReacher) {
        this.handleReacher(start);
      } else {
        this.getUsers(start);
      }
    },
    //获取用户列表
    getUsers(start = 0) {
      this.isLoading = true;
      getTeamList(start).then(data => {
        console.log(data)
        if(this.total === 0) {
           this.total = data.pageCount;
        }
        this.persons = data.person;
        this.isLoading = false;
        this.isReacher = false;
      });
    },
    //搜索专家
    handleReacher(start = 0) {
      const name = this.filters.name;

      this.isLoading = true;

      reacherPerson({ name, start }).then(res => {
        this.isLoading = false;
        let { code, msg, data, pageCount } = res.data;

        if (code === 200) {
          this.person = data;
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
          this.isLoading = true;
          let person = [{ id: row.id }];
          deletePerson({ person }).then(res => {
            this.isLoading = false;
            let { code, msg } = res.data;
            if (code === 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getUsers();
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

    //显示编辑界面
    handleEdit: async function(index, row) {
      const id = this.persons[index].id;

      const result = await getTeamOne({ id });
      const { data, code, msg } = result.data;
      if (code === 200) {
        this.SAVE_TEAMONE(data[0]);
        this.$router.push({ path: "/writePerson" });
      } else {
        this.$message({
          message: msg,
          type: "error"
        });
      }
    },
    //新增
    handleAdd: function() {
      this.$router.push({ path: "/addPerson" });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var person = this.sels.map(item => ({ id: item.id }));
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.isLoading = true;
          //NProgress.start();
          batchRemoveUser({ person }).then(res => {
            this.isLoading = false;
            let { code, msg } = res;
            if (code === 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              // this.getUsers();
            } else {
              this.$message({
                message: msg,
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>
.my{
}
</style>