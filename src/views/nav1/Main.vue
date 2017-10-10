<template>
    <div class="wrap">
        <div class="overview">
            <span>目前有<em>{{postsNum}}</em>篇文章，</span>
            <span> <em>{{cardNum}}</em>个栏目，</span>
            <span>专家<em>{{expertNum}}</em>人</span>
        </div>

        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content  bg-purple-light">
                    <h3>最近发布的文章</h3>
                    <div class="posts">
                        <a href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">6</a>
                        <a href="#">7</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content  bg-purple-light">
                    <h3>热门文章</h3>
                    <div class="posts">
                        <a href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">6</a>
                        <a href="#">7</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                        <a href="#">8</a>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                postsNum: 10,
                cardNum: 22,
                expertNum: 13
            }
        }
    }

</script>

<style lang="scss" scoped>
    .wrap {
        .overview {
            margin: 20px 0;
            span {
                font-size: 20px;
                color: #999999;
            }
            em {
                color: #444;
            }
        }
        .overview:after{
            content: '';
            display: block;
            width: 100%;
            height: .5px;
            background-color: #DDDDDD;
            margin-top: 30px;
        }

        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .el-col {
            border-radius: 4px;
        }

        .bg-purple-light {
            background: #F7F7F7;
        }

        .grid-content {
            border-radius: 4px;
            min-height: 36px;
            h3{
                padding-top: 20px;
                padding-left: 20px;
            }
        }
        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }

        .posts {
            a {
                display: block;
                text-decoration: none;
                color: #333333;
                font-size: 18px;
                margin: 10px 30px;
            }
        }
    }


</style>