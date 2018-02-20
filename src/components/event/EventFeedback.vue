<template>
  <!-- TODO
    - backend request
    - check if logged in
    - styling
    - feature flag?
  -->
  <div>
    <h2>How did you like this talk ({{eventId}})?</h2>

    <div class="feedback-buttons">
      <input type="radio" :id="'feedback-good' + eventId" name="feedback_button" class="feedback-good" value="Good" v-model="feedbackRadio"><label :for="'feedback-good' + eventId">Good</label>
      <input type="radio" :id="'feedback-okay' + eventId" name="feedback_button" class="feedback-okay" value="Okay"><label :for="'feedback-okay' + eventId">Okay</label>
      <input type="radio" :id="'feedback-bad' + eventId" name="feedback_button" class="feedback-bad" value="Bad"><label :for="'feedback-bad' + eventId">Bad</label>
    </div>
    <div>
      <textarea v-model="feedbackText" placeholder="Please explain your choice"></textarea>
    </div>
    <div>
      <button @click="submitFeedback">Submit Feedback</button>
    </div>
  </div>
</template>

<style>
  .feedback-buttons input {
    display: none;
  }
  .feedback-buttons input + label {
    font-weight: bold;
    text-shadow: 1px 1px 1px black;
    border-radius: 5px;
    display: inline-block;
    padding: 5px;
    margin-right: 5px;
  }
  .feedback-buttons input:checked + label {
    background: lightgray;
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
</style>

<script>
  export default {
    name: 'eventFeedback',
    props: ['eventId'],
    data () {
      return {
        feedbackRadio: '',
        feedbackText: ''
      }
    },
    computed: {
    },
    methods: {
      submitFeedback: function () {
        alert('coming soon')
      }
    }
  }
</script>
