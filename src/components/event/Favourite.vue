<template>
  <img v-if="favourite === false && mode==='small'" style="cursor:pointer; margin-right: 2px;" @click.prevent="toggleFavourite" class="fav-largescreen" title="Add to Favourites" src="../../assets/img/StarLine.png"/>
  <img v-else-if="mode==='small'" style="cursor:pointer; margin-right: 2px;" @click.prevent="toggleFavourite" class="fav-largescreen" title="Remove from Favourites" src="../../assets/img/StarFilled.png"/>
  <div class="fav-smallscreen" v-else-if="mode==='mobile'" @click.prevent="toggleFavourite">
    <template v-if="favourite === false">
        <img style="cursor:pointer; margin-right: 2px;" title="Add to Favourites" src="../../assets/img/StarLine.png"/>
    </template>
    <template v-else>
      <img style="cursor:pointer; margin-right: 2px;" title="Remove from Favourites" src="../../assets/img/StarFilled.png"/>
    </template>
  </div>
  <div v-else class="as-favorite alternate" @click.prevent="toggleFavourite">
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
    props: ['event', 'mode'],
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
