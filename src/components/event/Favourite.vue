<template>
  <span v-if="small" @click="toggleFavourite">
    <template v-if="favourite === false">
      <img style="cursor:pointer; margin-right: 2px;" class="fav-largescreen" title="Add to Favourites" src="../../assets/img/StarLine.png"/>
    </template>
    <template v-else>
      <img style="cursor:pointer; margin-right: 2px;" class="fav-largescreen" title="Remove from Favourites" src="../../assets/img/StarFilled.png"/>
    </template>
  </span>
  <div v-else class="as-favorite alternate" @click="toggleFavourite">
    <template v-if="favourite === false">
      <img class="fav-detail" title="Add to Favourites" src="../../assets/img/StarLine.png"/>
      <span>{{ $t('saveAsFavourite') }}</span>
    </template>
    <template v-else>
      <img class="fav-detail" title="Remove from Favourites" src="../../assets/img/StarFilled.png"/>
      <span>{{ $t('removeFavourite') }}</span>
    </template>
  </div>
</template>

<script>
  import Favourites from '../../Favourites'

  export default {
    name: 'favourite',
    props: ['event', 'small'],
    data () {
      return {
        favourites: Favourites.getFavorites()
      }
    },
    methods: {
      toggleFavourite: function () {
        Favourites.toggleFavorite(this.event.id)
      }
    },
    computed: {
      favourite: function () {
        return this.favourites[this.event.id] === true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
