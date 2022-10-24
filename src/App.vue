<template>
  <div id="app">
    <zby-select 
      :placeholder="zbySelectData.placeholder"
      :mapping="zbySelectData.mapping"
      :resType="zbySelectData.resType"
      :dataLevel="zbySelectData.dataLevel"
      @callback="callbackData"
      :getDataF="getDataF"
    />
  </div>
</template>

<script>
const list1 = ["California", "Colorado",
      "Connecticut", "Delaware"]
const list2 = ["Nevada", "New Hampshire",
      "New Jersey", "New Mexico"]

const list3 = [
  {name: 'Mexico', id: 1},
  {name: 'Jersey', id: 2}
]

const list4 = [
  {name: 'Connecticut', id: 3},
  {name: 'Delaware', id: 4}
]

export default {
  name: 'App',
  data() {
    return {
      zbySelectData: {
        placeholder: '请选择励步客户来源',
        dataLevel: ['data', 'grades'],
        mapping: {key: 'name', value: 'id'},
        resType: 2
      },
      states: ["Alabama", "Alaska", "Arizona",
      "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida",
      "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin",
      "Wyoming"]
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    callbackData(data) {
      console.log('我是返回数据的函数', data)
    },
    getDataF(query) {
      console.log('这里是传递出来查询的参数==', query)
      return new Promise((resolve) => {
        const random = Math.random() * 10
        if (random > 5) {
          if (this.zbySelectData.resType === 1) {
            resolve(list1)
          } else {
            resolve({data: {
              grades: list3
            }})
          }
          
        } else {
          if (this.zbySelectData.resType === 1) {
            resolve(list2)
          } else {
            // resolve(list4)
            resolve({data: {
              grades: list4
            }})
          }
        }
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
