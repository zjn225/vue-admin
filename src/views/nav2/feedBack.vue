<template>
    <section>
        <el-tabs :tab-position="tabPosition" style="height: 200px;">

            <!--未读的-->
            <el-tab-pane label="未读"> <!--列表-->
                <el-table :data="unReadfeeds" highlight-current-row v-loading="isLoading" @selection-change="selsChange"
                          style="width: 100%;" id='mytable'>
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column type="index" label="序号">
                    </el-table-column>
                    <el-table-column prop="title" label="标题" sortable>
                    </el-table-column>
                    <el-table-column prop="isRead" label="状态" sortable>
                    </el-table-column>
                    <el-table-column prop="time" label="时间" sortable>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="hasLook(scope.$index, scope.row)">已读
                            </el-button>
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
                    <el-table-column prop="title" label="标题" sortable>
                    </el-table-column>
                    <el-table-column prop="isRead" label="状态" sortable>
                    </el-table-column>
                    <el-table-column prop="time" label="时间" sortable>
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
    import {mapMutations} from "vuex";
    import {
        getIsReadFeedList,
        getUnReadFeedList,
        removeFeeds,
        batchRemoveFeeds,
        addFeeds,
        getFeedOne,
        deleteFeeds,
        lookContent
    } from "../../api/xh_api";

    export default {
        data() {
            return {
                dialogVisible: false,

                tabPosition: 'top',
                isReadfeeds: [
                    {id: 1, title: "测试已读", time: "2017年11月3日19:29:13", isRead: 'true'},
                ],
                unReadfeeds: [
                    {id: 1, title: "测试未读", isRead: 'false', time: "2017年11月3日19:29:13",},
                    {id: 2, title: "测试未读2", isRead: 'false', time: "2017年11月3日19:33:13",}
                ],
                isRead: 'false',
                isReadTotal: 0,
                unReadTotal: 0,
                page: 1,
                isLoading: false,
                sels: [], //列表选中列
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

            //获取已读的反馈列表
            getIsReadFeeds(start = 0) {
                this.isLoading = false; //记得修改为true
                getIsReadFeedList(start).then(res => {

                    this.isReadtotal = res.data.pageCount;
                    this.isReadfeeds = res.data.feed;
                    this.isLoading = false;
                });
            },
//            获取未读的反馈列表
            getUnReadFeeds(start = 0) {
                this.isLoading = false; //记得修改为true
                getUnReadFeedList(start).then(res => {

                    this.unReadtotal = res.data.pageCount;
                    this.unReadfeeds = res.data.feed;
                    this.isLoading = false;
                });
            },

            //删除
            handleDel: function (index, row) {
                this.$confirm("确认删除该记录吗?", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        this.isLoading = true;
                        let feed = [{id: row.id}];
                        deleteFeeds({feed}).then(res => {
                            this.isLoading = false;
                            let {code, msg} = res.data;
                            if (code === 200) {
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                this.getIsReadFeeds();
                            } else {
                                this.$message({
                                    message: msg,
                                    type: "error"
                                });
                            }
                        });
                    })
                    .catch(() => {
                    });
            },

            //点击已读
            hasLook: function (index, row) {

            },
            //查看详情列表
            look: function (row) {
//                this.isLoading = true;
                let feed = [{id: row.id}];
                lookContent(feed).then(res => {
                    this.isLoading = false;
                    let {data, code, msg} = res.data
                    if (code === 200) {
                        feed.content = data[2];
                        this.dialogVisible = true; //打开弹出框，里面是详情
                    } else {
                        this.$message({
                            message: msg,
                            type: "error"
                        });
                    }
                })

            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //详情页的关闭
            handleClose(done) {
                done();
            },
            //批量删除
            batchRemove: function () {
                var feed = this.sels.map(item => ({id: item.id}));
                this.$confirm("确认删除选中记录吗？", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        this.isLoading = true;
                        //NProgress.start();
                        batchRemoveFeeds({feed}).then(res => {
                            this.isLoading = false;
                            let {code, msg} = res;
                            if (code === 200) {
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                // this.getIsReadFeeds();
                            } else {
                                this.$message({
                                    message: msg,
                                    type: "error"
                                });
                            }
                        });
                    })
                    .catch(() => {
                    });
            }
        },
        mounted() {
            this.getIsReadFeeds();
            this.getUnReadFeeds();
        }
    };
</script>

<style scoped>

</style>