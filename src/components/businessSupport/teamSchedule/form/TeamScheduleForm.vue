<template>
    <v-row>
      <v-col cols="12" md="6" class="mb-4">
        <v-row>
          <v-col cols="6">
            <v-menu
              ref="dateOpen"
              v-model="dateOpen"
              :close-on-content-click="false"
              :return-value.sync="start"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="start"
                  dd  
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  dense
                  readonly
                  outlined
                  hide-details
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker white v-model="start" no-title>
                <v-spacer />
                <v-btn text white color="primary" @click="dateOpen = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  white
                  color="primary"
                  @click="$refs.dateOpen.save(start)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="type"
              :items="typeOptions"
              label="Type"
              class="my-auto"
              white
              hide-details
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>
        <v-sheet height="500">
          <v-calendar
            ref="calendar"
            :start="start"
            @click:date="open"
            :type="type"
            white
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
</template>

<script>
export default {
  data() {
    return {
      dateOpen: false,
      start: '2021-11-21 12:00',
      type: 'month',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
      ],
    };
  },
  methods: {
    open(date) {
        this.$store.commit('OPEN_CALENDAR_DIALOG', date)
    }
}
};
</script>
