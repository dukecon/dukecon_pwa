<template>
  <!-- TODO
    - check maxlength for backend
  -->
  <div class="feedback-widget" v-if="feedbackPossible">
    <div class="feedback-loginmessage alternate" v-if="shouldLogin">
      {{$t('feedback.loginMessage')}}
    </div>

    <div v-else>
      <div :id="'feedbackpopupbutton' + eventId" class="feedbackpopupbutton">
        <button class="darkBack reverse" @click="togglePopup">{{$t('feedback.popupbutton')}}</button>
      </div>

      <div :id="'feedbackpopup' + eventId" class="feedbackpopup" :class="popupHidden ? 'hidden' : ''"
           @click="togglePopup">
        <div @click.stop="">
          <h2 class="darkBack reverse">{{$t('feedback.header')}}</h2>

          <div class="feedback-buttons">
            <input type="radio" :id="'feedback-good' + eventId" name="feedback_button" class="feedback-good"
                   value="Good" v-model="feedbackRadio"><label :for="'feedback-good' + eventId">{{$t('feedback.rating.good')}}</label>
            <input type="radio" :id="'feedback-okay' + eventId" name="feedback_button" class="feedback-okay"
                   value="Okay" v-model="feedbackRadio"><label :for="'feedback-okay' + eventId">{{$t('feedback.rating.okay')}}</label>
            <input type="radio" :id="'feedback-bad' + eventId" name="feedback_button" class="feedback-bad"
                   value="Bad" v-model="feedbackRadio"><label :for="'feedback-bad' + eventId">{{$t('feedback.rating.bad')}}</label>
          </div>
          <div>
            <textarea :maxlength="feedbackTextMaxLength" v-model="feedbackText" @keyup.enter="submitFeedback"
                      :placeholder="$t('feedback.text')"></textarea>
          </div>
          <div>
            <button class="darkBack reverse" @click="cancel">{{$t('feedback.cancel')}}</button>
            <button class="darkBack reverse" @click="submitFeedback">{{$t('feedback.submit')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .feedback-widget {
    margin-top: 20px;
  }

  .feedback-loginmessage {
    font-size: smaller;
    font-style: italic;
  }

  .hidden {
    display: none;
  }

  .feedbackpopup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    z-index: 1;
  }

  .feedbackpopup > div {
    background: white;
    width: 400px;
    margin-top: 20%;
    display: inline-block;
  }

  .feedbackpopup > div > div {
    padding: 5px 10px 10px 10px;
  }

  .feedbackpopup h2 {
    margin-top: 0;
    margin-left: 0;
    display: block;
    padding: 5px 10px;
  }

  .feedback-buttons input {
    display: none;
  }

  .feedback-buttons input + label {
    border: 1px solid rgba(0, 0, 0, 0);
    font-weight: bold;
    display: inline-block;
    padding: 5px;
    margin-right: 5px;
  }

  .feedback-buttons input:checked + label {
    border: 1px solid lightgray;
  }

  .feedback-good + label {
    color: green;
  }

  .feedback-okay + label {
    color: orange;
  }

  .feedback-bad + label {
    color: red;
  }

  .feedback-good:checked + label {
    background-color: green;
    color: white;
  }

  .feedback-okay:checked + label {
    background-color: orange;
    color: white;
  }

  .feedback-bad:checked + label {
    background-color: red;
    color: white;
  }

  textarea {
    height: 5em;
    width: 95%;
    border-color: lightgray;
  }

  @media (max-width: 480px) {
    .feedbackpopup > div {
      width: 90%;
    }
  }
</style>

<script>
import Dukecloak from '../../DukeconKeycloak'
import axios from 'axios'
import moment from 'moment'
import Conference from '../../Conference'

export default {
  name: 'eventFeedback',
  props: ['eventId', 'eventStart', 'eventEnd'],
  data () {
    return {
      feedbackTextMaxLength: 1024,
      popupHidden: true,
      feedbackRadio: '',
      feedbackText: '',
      conference: Conference.getConference(),
      currentTime: moment()
    }
  },
  computed: {
    feedbackPossible: function () {
      // first check if 'feedbackServer' exists for backward compatibility
      if (!this.conference.feedbackServer || !this.conference.feedbackServer.active) {
        return false
      }
      if (Dukecloak.getKeycloak().isLoggedIn && Dukecloak.getKeycloak().tokenParsed.realm_access.roles.indexOf('admin') > -1) {
        // we always allow Admin accounts to give feedback
        console.log('ADMIN user, disregarding time constraint for feedback')
        return true
      }
      const deltaMinutes = this.conference.feedbackServer ? (this.conference.feedbackServer.timeSlotVisible || 0) : 0

      if (deltaMinutes === -1) {
        // -1 means at any time (testing only)
        return true
      }

      const feedbackStart = moment(this.eventStart)
      const feedbackEnd = moment(this.eventEnd).add(deltaMinutes, 'minutes')
      return (this.currentTime.isBefore(feedbackEnd) && this.currentTime.isAfter(feedbackStart))
    },
    shouldLogin: function () {
      return !Dukecloak.getKeycloak().isLoggedIn
    }
  },
  methods: {
    togglePopup: function () {
      this.popupHidden = !this.popupHidden
    },
    cancel: function () {
      this.togglePopup()
    },
    submitFeedback: function () {
      const self = this
      // TODO: Backend currently accepts numeric values for feedbackRadio
      // TODO: double final mapping on completion
      const data = {}
      data.comment = self.feedbackText
      switch (self.feedbackRadio) {
        case '':
          break
        case 'Good':
          data.rating = 1
          break
        case 'Okay':
          data.rating = 2
          break
        case 'Bad':
          data.rating = 3
          break
        default:
          console.log('unknown value for feedbackRadio: ' + self.feedbackRadio)
          break
      }
      Dukecloak.getKeycloak().updateToken()
        .success(function () {
          var config = {
            headers: { Authorization: 'bearer ' + Dukecloak.getKeycloak().token }
          }
          axios.put('rest/feedback/event/' + self.conference.id + '/' + self.eventId,
            data,
            config)
            .then((response) => {
              self.popupHidden = true
              console.log('Feedback submitted!')
              self.eventbus.$emit('message.popup', { message: 'Feedback submitted!', error: false })
            })
            .catch((e) => {
              self.popupHidden = true
              console.log('Feedback Submission Failed!', e)
              self.eventbus.$emit('message.popup', { message: 'Feedback Submission Failed!', error: true })
            })
        })
        .error(function () {
          self.eventbus.$emit('message.popup', { message: 'An error occurred!', error: true })
          console.log('Error refreshing token!')
          self.popupHidden = true
        })
    }
  }
}
</script>
