<template>
  <!-- 告警列表页 -->
  <div class="alarmIndex">
    <search-view @search="search"></search-view>
    <Table stripe :loading="isLoading" :columns="alarmThead" :data="pageData" width="100%"></Table>
    <Page class="page" :total="total" show-total @on-change="pageChange"/>
  </div>
</template>
 
<script> 

import search from 'components/alarm/search'
import { alarmData } from 'js/gobalData'
import { minMaxSize } from 'js/util'
import { pages, ERR_OK } from 'api/config'
import { getAlarmData } from 'api/port'

export default {
  components: {
    'search-view': search
  },
  data() {  
    return {
      total:0,
      current:1,
      isLoading:true,
      alarmThead:[{
        type: 'index',
        title: '#',
        width: 100,
        align: 'center'
      },{
        title: '设备编号',
        key:'devieId',
        minWidth: 200,
        align: 'center'
      },{
        title: '设备名称',
        key:'deviceName',
        minWidth: 200,
        align: 'center'
      },{
        title: '变量编号',
        key:'ID',
        minWidth: 200,
        align: 'center'
      },{
        title: '变量名称',
        key:'Name',
        minWidth: 200,
        align: 'center'
      },{
        title: '变量描述',
        key:'tagDesc',
        minWidth: 200,
        align: 'center'
      },{
        title: '状态',
        key:'status',
        minWidth: 200,
        align: 'center'
      }],
      // 总的告警数据
      alarmData:[],
      // 显示一页的数据
      pageData:[],
      // 搜索之后的总数居
      searchData:[],
      // 搜索的对象
      searchValue:{}
    } 
  },
  mounted() {
    this._getAlarmData()
  },
  methods:{
    // 获取告警数据
    _getAlarmData() {
      getAlarmData({})
        .then(res=>{
          if(res.code === ERR_OK) {
            let result = res.data.data
            let total = res.data.count
            let arr = []
            result.map((item,index)=>{
              arr.push({
                index:index+1,
                deviceId:'',
                deviceName:'',
                ID:item.ID,
                Name:item.Name,
                TagDesc:item.TagInfo.TagDesc
              })
            })
            this.alarmData = arr
            this.Paging(1,this.alarmData)
          } else {
            this.$Message.error(res.message)
          }
          this.isLoading = false
        })
        .catch(error=>{
          this.isLoading = false
          this.$Message.error(error.message)
        })
    },
    // 手动分页
    Paging(page,data) {  
        this.current = page ? page : 1
        this.total = data.length
        this.pageData = []
        if (this.total > pages.pageSize) {
            data.map((item, index = 1) => {
              if (index >= minMaxSize(this.current, pages.pageSize).minSize - 1 && index <= minMaxSize(this.current, pages.pageSize).maxSize - 1) {
                  this.pageData.push(item)
              }
            })
        } else {
            this.pageData = data
        }
    },
    // 分页
    pageChange(page) {
      if(this.searchValue.id || this.searchValue.name || this.searchValue.tagID || this.searchValue.tagName) {
        this.Paging(page,this.searchData)
      } else {
        this.Paging(page,alarmData)
      }
    },
    // 多条件搜索
    search(unit) {
      this.searchValue = unit

      if(unit.id || unit.name || unit.tagID || unit.tagName) {
          this.searchData = alarmData.filter(item=>{
          return item.id.includes(unit.id) && item.name.includes(unit.name) && item.tagID.includes(unit.tagID) && item.tagName.includes(unit.tagName)
        })
      } else {
        this.searchData = alarmData
      }

      this.Paging(1,this.searchData)
    }
  }
}
</script>

<style lang="scss" scoped>
.alarmIndex {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 14px;
}

</style>

<style lang="scss">
// 表格的样式
.ivu-table-wrapper {
  .ivu-table {
    font-size: 14px;
    th {
      background-color: #666;
      font-weight:normal;
      color: #fff;
    }
  }
}

.page {
  margin-top:20px;
  float: right;
}
.ivu-table td.setName{
  color:blue;
}
</style>




