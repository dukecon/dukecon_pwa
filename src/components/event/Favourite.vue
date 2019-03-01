<template>
  <div class="fav-container" v-if="mode==='standard'" @click.prevent="toggleFavourite">
    <template v-if="favourite === false">
        <img style="cursor:pointer" title="Add to Favourites" src="../../assets/img/StarLine.png"/>
    </template>
    <template v-else>
      <img style="cursor:pointer" title="Remove from Favourites" src="../../assets/img/StarFilled.png"/>
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
