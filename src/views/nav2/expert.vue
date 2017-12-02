<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名" @keyup.enter.native='handleReacher(0)'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleReacher(0)" icon='el-icon-search'>查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd" icon='el-icon-circle-plus-outline'>新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="experts" highlight-current-row v-loading="isLoading" @selection-change="selsChange"
                  style="width: 100%;" id='mytable'>
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="name" label="姓名" sortable>
            </el-table-column>
            <el-table-column prop="position" label="职称" sortable>
            </el-table-column>
            <el-table-column label="操作" width="600">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" icon="el-icon-caret-top"
                               @click="upIt(scope.$index, scope.row)"></el-button>
                    <el-button type="success" size="mini" icon="el-icon-caret-bottom"
                               @click="downIt(scope.$index, scope.row)"></el-button>
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)"
                               icon="el-icon-edit">编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)"
                               icon="el-icon-delete">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length<=0">批量删除</el-button>
            <el-pagination layout="prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
    import util from "../../common/js/util";
    import {mapMutations} from "vuex";
    import {
        getPersonList,
        getPerson,
        deletePerson,
        searchPerson,
        exchangePersonIndex
    } from "../../api/api";

    export default {
        data() {
            return {
                filters: {
                    name: ""
                },
                experts: [],
                total: 0,
                page: 1,
                isLoading: false,
                sels: [], //列表选中列
                isReacher: "",
                editFormVisible: false, //编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [{required: true, message: "请输入姓名", trigger: "blur"}]
                },

                addFormVisible: false, //新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{required: true, message: "请输入姓名", trigger: "blur"}]
                }
            };
        },
        methods: {
            ...mapMutations(["SAVE_EXPERTONE"]),
            handleCurrentChange(currentPage) {
                const start = (currentPage - 1) * 20 + currentPage - 1;

                if (this.isReacher) {
                    this.handleReacher(start);
                } else {
                    this.getExperts(start);
                }
            },
            //获取用户列表
            getExperts(start = 0) {
                this.isLoading = true;
                getPersonList({start,sort:'expert'}).then(data => {
                    if (this.total === 0) {
                        this.total = data.pageCount;
                    }
                    this.experts = data.list;
                    this.isLoading = false;
                    this.isReacher = false;
                    console.log(this.experts)
                },()=>{
                    this.loading = false;
                    this.$message({
                        message: '服务器错误',
                        type: "error"
                    });
                });
            },


            //删除
            handleDel: function (index, row) {
                this.$confirm("确认删除该记录吗?", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        this.isLoading = true;
                        let list = [{id: row.id}];
                        deletePerson({list,sort:'expert'}).then(res => {
                            this.isLoading = false;
                            let {code, msg} = res.data;
                            if (code === 200) {
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                this.getExperts();
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
                    .catch(() => {
                    });
            },
              //批量删除
            batchRemove: function () {
                let list = this.sels.map(item => ({id: item.id}));
                this.$confirm("确认删除选中记录吗？", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        this.isLoading = true;
                        //NProgress.start();
                        batchRemoveUser({list,sort:'expert'}).then(res => {
                            this.isLoading = false;
                            let {code, msg} = res;
                            if (code === 200) {
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                // this.getExperts();
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
                    .catch(() => {
                    });
            },
            //搜索专家
            handleReacher(start = 0) {

                const name = this.filters.name;

                this.listLoading = true;
                searchPerson({name, start,sort:'expert'}).then(data => {
                    this.listLoading = false;
//                    console.log(data)
                    let {code, msg, list, pageCount} = data;
                    if (code === 200) {
                        this.experts = list;
                        this.isReacher = true;
                        this.total = pageCount;
                    } else {
                        this.$message({
                            message: msg,
                            type: "error"
                        });
                    }
                },(e)=>{
                    this.loading = false;
                    this.$message({
                        message: '服务器错误',
                        type: "error"
                    });
                });
            },
            //显示编辑界面
            handleEdit: async function (index, row) {
                const id = this.experts[index].id;

                const result = await getPerson({id,sort:'expert'});
                const {data, code, msg} = result.data;
                if (code === 200) {
                    this.SAVE_EXPERTONE(data[0]);
                    this.$router.push({path: "/editExpert"});
                } else {
                    this.$message({
                        message: msg,
                        type: "error"
                    });
                }
            },

            /*向下移动*/
            downIt: function (_index, row) {
                if (this.experts[_index] === this.experts[this.experts.length - 1]) {
                    return
                }
                let thisP = this.experts[_index],
                    nextP = this.experts[_index + 1],
                    id = [],
                    rank = [];

                id[0] = thisP.id;
                rank[0] =  nextP.rank;
                id[1] =  nextP.id;
                rank[1] = thisP.rank;



               exchangePersonIndex({id,rank,sort:'expert'}).then((data)=>{
                    let {code} = data;
                    if (code === 200) {
                        thisP.rank = rank[0];
                        nextP.rank = rank[1];
                        /*Vue 不能检测以下变动的数组：1、索引修改 2、长度修改*/
                        this.experts.splice(_index, 1, nextP)

                        this.experts.splice(_index + 1, 1, thisP)

                    } else {
                        this.$message({
                            message: 'error',
                            type: "error"
                        });
                    }
                },(e)=>{
                   this.loading = false;
                   this.$message({
                       message: '服务器错误',
                       type: "error"
                   });
               })

            },

            /*向上移动*/
            upIt: function (_index, row) {
                if (this.experts[_index] === this.experts[0]) {
                    return
                }
                let thisP = this.experts[_index],
                    lastP = this.experts[_index - 1],
                    id = [],
                    rank = [];
                id[0] = thisP.id;
                rank[0] = lastP.rank;
                id[1] = lastP.id;
                rank[1] =thisP.rank;

                console.log(id, rank)

               exchangePersonIndex({id,rank,sort:'expert'}).then((data)=>{
                    let {code} = data;

                    if (code === 200) {
                        thisP.rank = rank[0];
                        lastP.rank = rank[1];
                        this.experts.splice(_index - 1, 1, thisP)
                        this.experts.splice(_index, 1, lastP);

                    } else {
                        this.$message({
                            message: 'error',
                            type: "error"
                        });
                    }
                },(e)=>{
                   this.loading = false;
                   this.$message({
                       message: '服务器错误',
                       type: "error"
                   });
               })

            },

            //新增
            handleAdd: function () {
                this.$router.push({path: "/addExpert"});
            },
            selsChange: function (sels) {
                this.sels = sels;
            }
          
        },
        mounted() {
            this.getExperts();
        }
    };
</script>

<style scoped>

</style>