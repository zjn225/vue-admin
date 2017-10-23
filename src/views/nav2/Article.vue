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
                            @change="getArticleList()">
                    </el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.title" placeholder="输入文章标题查找"></el-input>
                </el-form-item>
                <el-button type="primary" v-on:click="getArticleList()">筛选</el-button>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="articles" highlight-current-row style="width: 100%;" @selection-change='selectArticle'>
            <!-- 加入接口后补充 v-loading="listLoading"  -->
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
    import {getCatalog,  deleteArticle, editArticle, getArticle} from '../../api/xh_api';

    export default {
        data() {
            return {
                selectedOptions: [],  //级联选择器
                options: [
                    {
                        value: 'information',
                        label: '科研资讯',
                        children: [{
                            value: '1',
                            label: '流通所新闻',
                        }, {
                            value: '2',
                            label: '基地资讯',
                        }, {
                            value: '3',
                            label: '媒体报道',
                        }]
                    },
                    {
                        value: 'research',
                        label: '科学研究',
                        children: [{
                            value: '1',
                            label: '课题研究',

                        }, {
                            value: '2',
                            label: '课题招标',

                        }, {
                            value: '3',
                            label: '成果影响',
                        }]
                    },
                    {
                        value: 'achievement',
                        label: '科研成果',
                        children: [{
                            value: '1',
                            label: '学术论文',

                        }, {
                            value: '2',
                            label: '著作',

                        }, {
                            value: '3',
                            label: '研究报告',
                        }]
                    },
                    {
                        value: 'exchange',
                        label: '学术交流',
                        children: [{
                            value: '1',
                            label: '来访交流',

                        }, {
                            value: '2',
                            label: '调研考察',

                        }, {
                            value: '3',
                            label: '主办年会',
                        }, {
                            value: '4',
                            label: '流通论坛',
                        }]
                    },
                    {
                        value: 'train',
                        label: '咨询培训',
                        children: [{
                            value: '1',
                            label: '咨询顾问',

                        }, {
                            value: '2',
                            label: '企业策划',

                        }, {
                            value: '3',
                            label: '专家培训',
                        }]
                    },
                    {
                        value: 'construction',
                        label: '智库建设',
                        children: [{
                            value: '1',
                            label: '名家百人讲座',

                        }, {
                            value: '2',
                            label: '智库动态',

                        }]
                    },
                ],
                filters: {
                    title: ''
                },
                articles: [],
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

                this.articles = result.data.data;
            },
            selectArticle(selection, row) {
                console.log(selection[selection.length - 1].id)
                this.sels.push(selection[selection.length - 1])
            },
            //获取文章列表
            async getArticleList() {

                if (this.selectedOptions.length === 0) {
                    this.$confirm('请选择分类后进行文章管理，否则无数据显示。', '温馨提示', {
                        type: 'warning'
                    })
                    return;
                }
                const sort = this.selectedOptions[0];
                const type = this.selectedOptions[1];
                const start = this.statr;
                const result = await getCatalog({sort, type, start});

                // let para = {
                //     page: this.page,
                //     title: this.filters.title
                // };
                this.listLoading = true;
                this.articles = result.data.data;
                this.total = result.data.pageCount;

            },
            ...mapMutations([
                'SAVE_ARTICLEINFO',
            ]),
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                  
                    //NProgress.start();
                    let article =[{id: this.articles[index].id,  type: this.articles[index].type}];
                    let sort = this.selectedOptions[0];
                    deleteArticle({article,sort}).then((res) => {
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
            async  handleEdit  (index, row) {
                var id = this.articles[index].id;
                var type = this.articles[index].type;
                var sort = this.selectedOptions[0];
                const result = await getArticle ({ type, sort,id})
                this.SAVE_ARTICLEINFO(result.data.data);
                this.$router.push({path: '/writeArticle'})


            },
            //批量删除
            batchRemove: function () {
                var article = this.sels.map(item => ({id: item.id, type: item.type}));
                var sort = this.selectedOptions[0];
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                     deleteArticle({article, sort}).then((res) => {
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
        mounted(){
            this.getArticleList();
        }
    }

</script>

<style scoped>

</style>