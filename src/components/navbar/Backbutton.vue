<template>
  <span>
    <a id="backbutton" href="#" onclick="window.history.back();">{{$t('backbutton')}}</a>
  </span>
</template>

<script language="">
export default {
  name: 'backbutton'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  span {
    position: relative;
    float: left;
  }
  a#backbutton {
    display:none;
    position: relative;
    border-radius: 4px;
    font-size:smaller;
    font-weight: bold;
    overflow: hidden;
    margin: 5px;
    height: 24px;
    line-height: 24px;
    padding: 0 4px 0 4px;
    border: 1px solid;
    &:focus {
      background: #fff;
    }
  }
  @media (max-width: 768px) {
    a#backbutton {
      display: inline-block;
      width: 55px;
    }
  }

</style>
