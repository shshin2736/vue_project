<template>
  <full-calendar ref="calendar" :config="config" :events="events" />
</template>

<script>
import moment from 'moment';
export default {
  name: 'hello',
  data() {
    return {
      events: [],
      config: {
        defaultView: 'month',
        timeFormat: 'h:mma',
        eventClick: event => {
          window.location.href = '/admin#/events/' + event.id + '/edit';
        },
      },
    };
  },

  methods: {
    createEvent() {
      window.location.href = '/admin#/events/new';
    },

    editEvent() {
      $('#edit-modal').modal('show');
    },

    refreshEvents() {
      this.$refs.calendar.$emit('reload-events');
    },

    addEvent(event) {
      this.$refs.calendar.$emit('render-event', event, 'stick');
    },
  },

  mounted() {
    setTimeout(() => {
      this.events = [
        {
          title: 'test',
          allDay: true,
          start: moment(),
          end: moment().add(1, 'd'),
        },
        {
          title: 'another test',
          start: moment().add(2, 'd'),
          end: moment()
            .add(2, 'd')
            .add(2, 'h'),
        },
      ];

      this.events.forEach(event => this.addEvent(event));
    }, 2000);

    this.refreshEvents();
  },
};
</script>
