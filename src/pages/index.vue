<template>
  <div>
  </div>
</template>

<script>
import { getLastTime, formatDate } from 'js/util'

export default {
  data () {
    return {
    }
  },
  mounted() {
    console.log(formatDate(getLastTime(),true))
  }
}
</script>

<style lang="scss" scoped>

</style>
