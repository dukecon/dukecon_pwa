<template>
  <div class="marker-box" v-if="event.durationInMinutes > thresholdInMinutes">
    <div class="starts-before" :style="visibilityStart">
      <div class="arrow-up alternateBack">
        <svg viewBox="0 0 10 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>{{ $t('talk.longduration') }}</title>
          <desc>Created with Sketch.</desc>
          <g id="3-Pfeile-Aufwärts-Transparent" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M10,30 L5,20 L0,30 L0,0 L10,0 L10,30 Z M5,9 L1,17 L9,17 L5,9 Z M5,0 L2,6 L8,6 L5,0 Z" id="Combined-Shape" fill="#FFFFFF"></path>
          </g>
        </svg>
      </div>
    </div>
    <div class="is-long alternate" :class="gradientClass">
      <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           width="12px" height="13px" viewBox="0 0 56.69 56.69" enable-background="new 0 0 56.69 56.69" xml:space="preserve">
        <path opacity="0.3" d="M28.343,0C12.688,0-0.003,12.691-0.003,28.346c0,15.656,12.691,28.347,28.347,28.347
          c15.655,0,28.346-12.691,28.346-28.347C56.689,12.691,43.998,0,28.343,0L28.343,0z"/>
                <path d="M28.344,5C41.217,5,51.69,15.473,51.69,28.346c0,12.874-10.474,23.347-23.347,23.347
          c-12.874,0-23.347-10.474-23.347-23.347C4.997,15.473,15.47,5,28.344,5 M28.344,0C12.688,0-0.003,12.691-0.003,28.346
          c0,15.656,12.691,28.347,28.347,28.347S56.69,44.002,56.69,28.346C56.69,12.691,43.999,0,28.344,0L28.344,0z"/>
                <path d="M28.345,30.349c-0.271,0-0.545-0.056-0.809-0.172c-1.01-0.447-1.466-1.628-1.02-2.639L33.4,11.985
          c0.447-1.01,1.627-1.466,2.639-1.02c1.01,0.447,1.467,1.628,1.02,2.639l-6.884,15.553C29.844,29.904,29.112,30.349,28.345,30.349z"
                />
                <path d="M39.686,30.347H28.347c-1.104,0-2-0.896-2-2s0.896-2,2-2h11.339c1.104,0,2,0.896,2,2
          S40.79,30.347,39.686,30.347z"/>
                <line fill="none" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10" x1="28.347" y1="50.033" x2="28.347" y2="52.867"/>
                <line fill="none" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10" x1="28.347" y1="3.686" x2="28.347" y2="6.519"/>
                <line fill="none" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10" x1="50.104" y1="28.276" x2="52.938" y2="28.276"/>
                <line fill="none" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10" x1="3.756" y1="28.276" x2="6.59" y2="28.276"/>
      </svg>
    </div>
    <div class="ends-after" :style="visibilityEnd">
      <div class="arrow-down alternateBack">
        <svg viewBox="0 0 10 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch -->
          <title>{{ $t('talk.longduration') }}</title>
          <desc>Created with Sketch.</desc>
          <g id="3-Pfeile-Abwärts-Transparent" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M1.77635684e-15,-3.55271368e-15 L5,10 L10,-1.77635684e-15 L10,30 L0,30 L0,-1.77635684e-15 Z M5,21 L9,13 L1,13 L5,21 Z M5,30 L8,24 L2,24 L5,30 Z" id="Combined-Shape" fill="#FFFFFF"></path>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: ['event', 'thresholdInMinutes'],
  name: 'long-talk-marker',
  computed: {
    visibilityStart () {
      if (this.event.start === this.event.startOfSlice) {
        return 'visibility: hidden'
      } else {
        return ''
      }
    },
    gradientClass () {
      if (this.event.start === this.event.startOfSlice) {
        return 'talk-starts' // start gradient
      } else if (this.event.end <= this.event.endOfSlice) {
        return 'talk-ends' // end gradient
      } else {
        return ''
      }
    },
    visibilityEnd () {
      if (this.event.end <= this.event.endOfSlice) {
        return 'visibility: hidden'
      } else {
        return ''
      }
    }
  }
}

</script>
<style lang="less" scoped>
  .marker-box {
    display: none;
  }
  .speakertalks, .speaker-talks {
    .long .marker-box {
      display: none;
    }
  }
  .long .marker-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    .is-long {
      padding: 3px;
      height: 12px;
      width: 13px;
      flex-grow: 0;
      border-radius: 100%;
      &.talk-starts {
      }
      &.talk-ends {
      }
    }
    .ends-after, .starts-before {
      flex-grow: 1;
      svg {
        width: 10px;
        height: 30px;
      }
      .arrow-down {
        margin: 2px 5px 4px 4px;
        height: 30px;
        width: 10px;
        background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), to(rgba(255, 255, 255, 1)));
        background-image: linear-gradient(top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
        background-repeat: repeat-x;
      }
      .arrow-up {
        margin: 4px 5px 2px 4px;
        height: 30px;
        width: 10px;
        background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0)));
        background-image: linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
        background-repeat: repeat-x;
      }
    }
  }
  @media (max-width: 786px) {
    .long .marker-box {
      .ends-after, .starts-before {
        svg {
          width: 8px;
          height: 24px;
        }
        .arrow-down {
          width: 8px;
          margin: 2px 6px 4px 5px;
          height: 22px;
        }
        .arrow-up {
          width: 8px;
          margin: 4px 6px 2px 5px;
          height: 24px;
        }
      }
    }
  }
</style>
