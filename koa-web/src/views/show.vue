<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo logo-width">
                {{sysName}}
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <el-col :span="6" class="pie">
                <el-col :span="24" class="pan-title">
                    医费分类统计
                </el-col>
                <el-col :span="24" id="chartPie" style="height:440px;">
                </el-col>
            </el-col>
            <el-col :span="18" class="line">
                <el-col :span="24" class="pan-title">
                    医费中心作业数据排行
                </el-col>
                <el-col :span="24" id="chartBar" style="height:440px;">
                </el-col>
            </el-col>
        </el-col>
        <el-col :span="24" class="pan-title table-title">
            医费中心作业数据top10
        </el-col>
        <el-col :span="24" class="table">
            <el-table :span="24" :data="tableData" border :row-class-name="tableRowClassName">
                <el-table-column prop="date" label="编号">
                </el-table-column>
                <el-table-column prop="name" label="名称">
                </el-table-column>
                <el-table-column prop="province" label="感染性">
                </el-table-column>
                <el-table-column prop="city" label="损伤性">
                </el-table-column>
                <el-table-column prop="address" label="物理性">
                </el-table-column>
                <el-table-column prop="zip" label="化学性">
                </el-table-column>
                <!-- <el-table-column fixed="right" label="操作" width="100">
                        <template scope="scope">
                            <el-button @click="handleClick" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column> -->
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            sysName: '医废中心管理系统',
            tableData: [{
                date: '1',
                name: '酒泉医费中心',
                province: '30吨',
                city: '20吨',
                address: '80吨',
                zip: '60吨'
            }, {
                date: '2',
                name: '酒泉医费中心',
                province: '30吨',
                city: '20吨',
                address: '80吨',
                zip: '60吨'
            }, {
                date: '3',
                name: '酒泉医费中心',
                province: '30吨',
                city: '20吨',
                address: '80吨',
                zip: '60吨'
            }, {
                date: '4',
                name: '酒泉医费中心',
                province: '30吨',
                city: '20吨',
                address: '80吨',
                zip: '60吨'
            }, {
                date: '5',
                name: '酒泉医费中心',
                province: '30吨',
                city: '20吨',
                address: '80吨',
                zip: '60吨'
            }, {
                date: '6',
                name: '酒泉医费中心',
                province: '30吨',
                city: '20吨',
                address: '80吨',
                zip: '60吨'
            }, {
                date: '7',
                name: '酒泉医费中心',
                province: '30吨',
                city: '20吨',
                address: '80吨',
                zip: '60吨'
            }, {
                date: '8',
                name: '酒泉医费中心',
                province: '30吨',
                city: '20吨',
                address: '80吨',
                zip: '60吨'
            }, {
                date: '9',
                name: '酒泉医费中心',
                province: '30吨',
                city: '20吨',
                address: '80吨',
                zip: '60吨'
            }, {
                date: '10',
                name: '酒泉医费中心',
                province: '30吨',
                city: '20吨',
                address: '80吨',
                zip: '60吨'
            }]
        }
    },
    methods: {
        tableRowClassName(row, index) {
            return 'table-b';
        },
        drawBarChart() {
            this.chartBar = echarts.init(document.getElementById('chartBar'));
            this.chartBar.setOption({
                  tooltip: {},
                  xAxis: {
                      data: ["第1医费", "第2医费", "第3医费", "第4医费", "第5医费", "第6医费", "第7医费", "第8医费", "第9医费", "第10医费", "第11医费", "第12医费", "第13医费", "第14医费", "第15医费", "第16医费"]
                  },
                  yAxis: {},
                  series: [{
                      name: '销毁量',
                      type: 'bar',
                      data: [160,150,140,130,120,110,100,90,80,70,60,50,40,30,20,10]
                    }]
                });
        },
        drawPieChart() {
            this.chartPie = echarts.init(document.getElementById('chartPie'));
            this.chartPie.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: '类型占比',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: '损伤性' },
                            { value: 310, name: '感染性' },
                            { value: 234, name: '化学性' },
                            { value: 135, name: '药物性' },
                            { value: 1548, name: '病理性' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        }
    },
    mounted() {
        this.drawPieChart();
        this.drawBarChart();
        // var user = sessionStorage.getItem('user');
        // if (user) {
        // 	user = JSON.parse(user);
        // 	this.sysUserName = user.name || '';
        // 	this.sysUserAvatar = user.avatar || '';
        // }

    }
}

</script>

<style scoped lang="scss">
@import '~scss_vars';

.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .pan-title {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        background: #4B47D2;
        padding: 0 20px;
    }
    .header {
        height: 60px;
        line-height: 60px;
        background: $color-primary;
        color: #fff;
        .logo {
            //width:230px;
            height: 60px;
            font-size: 22px;
            padding-left: 20px;
            padding-right: 20px;
            border-color: rgba(238, 241, 146, 0.3);
            border-right-width: 1px;
            border-right-style: solid;
            img {
                width: 40px;
                float: left;
                margin: 10px -10px 10px;
            }
            .txt {
                color: #fff;
            }
        }
        .logo-width {
            width: 230px;
        }
        .logo-collapse-width {
            width: 60px
        }
        .tools {
            padding: 0px 23px;
            width: 14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
    .main {
        display: flex;
        overflow: hidden;
        .pie {
            height: 500px;
        }
        .line {
            height: 500px;
        }
    }
    .table-title {
        background: #4B47D2;
    }
    .table {
        display: flex;
        overflow: hidden;
    }
}

</style>