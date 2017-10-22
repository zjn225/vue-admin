<template>
    <div class="wrap">
        <h3>网站配色选择</h3>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="18">
                <el-radio class="radio" v-model="radio" label="1">松石绿</el-radio>
                <div class="grid-content bg-purple-green"></div>
            </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="18">
                <el-radio class="radio" v-model="radio" label="2">天空蓝</el-radio>
                <div class="grid-content bg-purple-blue"></div>
            </el-col>
        </el-row>

        <el-button type="primary" native-type="submit" class="submit">确认</el-button>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                radio: '1'
            };
        }
    }
</script>

<style lang="scss" scoped>
    .wrap {
        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .el-col {
            border-radius: 4px;
        }
        .bg-purple-green {
            background: #06A3B1;
        }
        .bg-purple-blue {
            background: #7BBFEA;
        }
        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }
        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
        .submit{
            position: absolute;
            top: 30%;
            left: 85%;
        }
    }
</style>
