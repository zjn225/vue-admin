<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.title" placeholder="输入文章标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getArticleList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="articles" highlight-current-row  style="width: 100%;" @selection-change='selectArticle'>
            <!-- 加入接口后补充 v-loading="listLoading"  -->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="220" sortable>
            </el-table-column>
            <el-table-column prop="author" label="作者" width="200" sortable>
            </el-table-column>
            <el-table-column prop="source" label="文章来源" width="200" sortable>
            </el-table-column>
            <el-table-column prop="time" label="发布时间" max-width="200" sortable>
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
            <el-pagination @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;" >
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import { getArticleListPage, removeArticle, batchRemoveArticle, editArticle ,getArticle} from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    title: ''
                },
                articles: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                start :0,//第一篇文章起始位置
            }
        },
        methods: {
            async handleCurrentChange(currentPage) {
                

                const start = (currentPage - 1)*14 + currentPage - 1;
                this.start = start;
                const result = await getArticleListPage({sort:'information','type' : 1,'start':start});

                this.articles = result.data.data;
            },
            selectArticle(selection, row){
                console.log(selection[selection.length - 1].id)
                this.sels.push(selection[selection.length - 1])
            },
            //获取文章列表
            async getArticleList() {

                const result = await getArticleListPage({sort:'information','type' : 1, 'start' : this.statr});
                console.log(result);
                let para = {
                    page: this.page,
                    title: this.filters.title
                };
                this.listLoading = true;
                this.articles = result.data.data;
                this.total = result.data.pageCount;
               
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    console.log(this.articles[index].id)
                    //NProgress.start();
                    let para = { id: this.articles[index].id, sort:'information',type:this.articles[index].type};
                    console.log(para);
                    removeArticle(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getArticleList();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                var id   = this.articles[index].id;
                var type = this.articles[index].type;
                var sort = 'information';//需要获取值，当前只是为了调试

                getArticle({id,type,sort});
            },
            //批量删除
            batchRemove: function () {
                var params = this.sels.map(item =>  ({id : item.id,type : item.type}));
                var sort = 'information';//需要获取值，当前只是为了调试
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    batchRemoveArticle({params,sort}).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getArticleList();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getArticleList();
        }
    }

</script>

<style scoped>

</style>