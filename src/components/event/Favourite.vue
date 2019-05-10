<template>
  <div class="fav-container" v-if="mode==='standard'" @click.prevent="toggleFavourite">
    <template v-if="favourite === false">
      <svg class="star-empty" version="1.1" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
        <title>{{ $t('saveAsFavourite') }}</title>
      <g id="V2-B" class="st0">
        <g class="st1">
          <polygon class="st2" points="8,0 10.5,5.3 16,6.1 12,10.2 12.9,16 8,13.3 3.1,16 4,10.2 0,6.1 5.5,5.3"/>
        </g>
      </g>
        <g id="V2-A_Kopie" class="st0">
        <g class="st1">
          <path class="st2" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
            l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
            l4-4.1l-5.5-0.8L8,0L8,0z"/>
        </g>
      </g>
        <g id="V1-B_Kopie" class="st0">
        <g class="st1">
          <polygon class="st2"
                   points="8,12.7 3.7,15.1 4.5,10 1,6.5 5.9,5.7 8,1.2 10.1,5.7 15,6.5 11.5,10 12.3,15.1"/>
          <path class="st3" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
            l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
            l4-4.1l-5.5-0.8L8,0L8,0z"/>
        </g>
      </g>
        <g id="V1-A">
        <g>
          <polygon class="st4"
                   points="8,12.7 3.7,15.1 4.5,10 1,6.5 5.9,5.7 8,1.2 10.1,5.7 15,6.5 11.5,10 12.3,15.1"/>
          <path class="st3" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
            l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
            l4-4.1l-5.5-0.8L8,0L8,0z"/>
        </g>
      </g>
      </svg>
    </template>
    <template v-else>
      <svg class="star-filled" version="1.1" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
        <title>{{ $t('removeFavourite') }}</title>
         <g id="V2-B">
          <g>
            <polygon class="st0 alternateBack" points="8,0 10.5,5.3 16,6.1 12,10.2 12.9,16 8,13.3 3.1,16 4,10.2 0,6.1 5.5,5.3"/>
          </g>
        </g>
        <g id="V2-A_Kopie" class="st1">
          <g class="st2">
            <path class="st0 alternateBack" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
              l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
              l4-4.1l-5.5-0.8L8,0L8,0z"/>
          </g>
        </g>
        <g id="V1-B_Kopie" class="st1">
          <g class="st2">
            <polygon class="st0 alternateBack"
                     points="8,12.7 3.7,15.1 4.5,10 1,6.5 5.9,5.7 8,1.2 10.1,5.7 15,6.5 11.5,10 12.3,15.1"/>
            <path class="st3" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
              l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
              l4-4.1l-5.5-0.8L8,0L8,0z"/>
          </g>
        </g>
        <g id="V1-A" class="st1">
          <g class="st2">
            <polygon class="st4"
                     points="8,12.7 3.7,15.1 4.5,10 1,6.5 5.9,5.7 8,1.2 10.1,5.7 15,6.5 11.5,10 12.3,15.1"/>
            <path class="st3" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
              l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
              l4-4.1l-5.5-0.8L8,0L8,0z"/>
          </g>
        </g>
        </svg>
    </template>
  </div>
  <div v-else class="as-favorite alternate" @click.prevent="toggleFavourite">
    <template v-if="favourite === false">
      <svg class="star-empty fav-detail" version="1.1" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
        <title></title>
        <g id="V2-B" class="st0">
        <g class="st1">
          <polygon class="st2" points="8,0 10.5,5.3 16,6.1 12,10.2 12.9,16 8,13.3 3.1,16 4,10.2 0,6.1 5.5,5.3"/>
        </g>
      </g>
        <g id="V2-A_Kopie" class="st0">
        <g class="st1">
          <path class="st2" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
            l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
            l4-4.1l-5.5-0.8L8,0L8,0z"/>
        </g>
      </g>
        <g id="V1-B_Kopie" class="st0">
        <g class="st1">
          <polygon class="st2"
                   points="8,12.7 3.7,15.1 4.5,10 1,6.5 5.9,5.7 8,1.2 10.1,5.7 15,6.5 11.5,10 12.3,15.1"/>
          <path class="st3" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
            l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
            l4-4.1l-5.5-0.8L8,0L8,0z"/>
        </g>
      </g>
        <g id="V1-A">
        <g>
          <polygon class="st4"
                   points="8,12.7 3.7,15.1 4.5,10 1,6.5 5.9,5.7 8,1.2 10.1,5.7 15,6.5 11.5,10 12.3,15.1"/>
          <path class="st3" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
            l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
            l4-4.1l-5.5-0.8L8,0L8,0z"/>
        </g>
      </g>
      </svg>
      <span>{{ $t('saveAsFavourite') }}</span>
    </template>
    <template v-else>
      <svg class="star-filled fav-detail" version="1.1" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
        <title></title>
        <g id="V2-B">
          <g>
            <polygon class="st0 alternateBack" points="8,0 10.5,5.3 16,6.1 12,10.2 12.9,16 8,13.3 3.1,16 4,10.2 0,6.1 5.5,5.3"/>
          </g>
        </g>
        <g id="V2-A_Kopie" class="st1">
          <g class="st2">
            <path class="st0 alternateBack" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
              l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
              l4-4.1l-5.5-0.8L8,0L8,0z"/>
          </g>
        </g>
        <g id="V1-B_Kopie" class="st1">
          <g class="st2">
            <polygon class="st0 alternateBack"
                     points="8,12.7 3.7,15.1 4.5,10 1,6.5 5.9,5.7 8,1.2 10.1,5.7 15,6.5 11.5,10 12.3,15.1"/>
            <path class="st3" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
              l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
              l4-4.1l-5.5-0.8L8,0L8,0z"/>
          </g>
        </g>
        <g id="V1-A" class="st1">
          <g class="st2">
            <polygon class="st4"
                     points="8,12.7 3.7,15.1 4.5,10 1,6.5 5.9,5.7 8,1.2 10.1,5.7 15,6.5 11.5,10 12.3,15.1"/>
            <path class="st3" d="M8,2.4l1.6,3.3l0.2,0.5l0.5,0.1l3.6,0.6l-2.6,2.7l-0.4,0.4l0.1,0.5l0.6,3.8l-3.1-1.7L8,12.1l-0.5,0.3
              l-3.1,1.7L5,10.4l0.1-0.5L4.7,9.5L2.1,6.8l3.6-0.6l0.5-0.1l0.2-0.5L8,2.4 M8,0L5.5,5.3L0,6.1l4,4.1L3.1,16L8,13.3l4.9,2.7L12,10.2
              l4-4.1l-5.5-0.8L8,0L8,0z"/>
          </g>
        </g>
        </svg>
      <span>{{ $t('removeFavourite') }}</span>
    </template>
  </div>
</template>

<style scoped lang="less">
  svg {
    height: 20px;
    cursor: pointer;
    &.star-filled {
      .st1 {
        display: none;
      }
      .st2 {
        display: inline;
      }
      .st3 {
        fill: #888888;
      }
      .st4 {
        fill: #FFFFFF;
      }
    }
    &.star-empty {
      .st0 {
        display: none;
      }
      .st1 {
        display: inline;
      }
      .st3 {
        fill: #888888;
      }
      .st4 {
        fill: #FFFFFF;
      }
    }
  }
</style>

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
      Favourites.toggleFavorite(this.event.id, this)
    }
  },
  computed: {
    favourite: function () {
      return this.favourites[this.event.id] === true
    }
  }
}
</script>
