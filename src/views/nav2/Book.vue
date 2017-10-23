<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="输入著作名称查找"></el-input>
                </el-form-item>
                <el-button type="primary" v-on:click="getBookList()">查找</el-button>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="books" highlight-current-row style="width: 100%;" @selection-change='selectBook'>
            <!-- 加入接口后补充 v-loading="listLoading"  -->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="name" label="著作名称" max-width="420" sortable>
            </el-table-column>
            <el-table-column prop="time" label="发布时间" width="200" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <!--换页-->
            <el-pagination @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import {mapMutations} from 'vuex'
    import {getCatalog, deleteBook, editBook, getBook} from '../../api/xh_api';

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                books: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                start: 0,//第一篇文章起始位置
            }
        },
        methods: {
            async handleCurrentChange(currentPage) {
                const start = (currentPage - 1) * 14 + currentPage - 1;
                this.start = start;
                const result = await getCatalog({sort: 'information', 'type': 1, 'start': start});

                this.books = result.data.data;
            },
            handleAdd: function () {
                this.$router.push({path:'/writeBook'})
            },
            selectBook(selection, row) {
                console.log(selection[selection.length - 1].id)
                this.sels.push(selection[selection.length - 1])
            },
            //获取著作列表
            async getBookList() {
                const start = this.statr;
                const result = await getCatalog({sort, type, start});

                // let para = {
                //     page: this.page,
                //     name: this.filters.name
                // };
                this.listLoading = true;
                this.books = result.data.data;
                this.total = result.data.pageCount;

            },
            ...mapMutations([
                'SAVE_BOOKINFO',
            ]),
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;

                    //NProgress.start();
                    let book = [{id: this.books[index].id, type: this.books[index].type}];
                    let sort = this.selectedOptions[0];
                    deleteBook({book, sort}).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getBookList();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            async handleEdit(index, row) {
                var id = this.books[index].id;
                var time = this.books[index].time;
                var content = this.books[index].content;

                const result = await getBook({id})
                this.SAVE_ARTICLEINFO(result.data.data);
                this.$router.push({path: '/writeBook'})


            },
            //批量删除
            batchRemove: function () {
                var book = this.sels.map(item => ({id: item.id, type: item.type}));
                var sort = this.selectedOptions[0];
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    deleteBook({book, sort}).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getBookList();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getBookList();
        }
    }

</script>

<style scoped>

</style>