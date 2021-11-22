<template>
  <tr>
    <th v-if="title" scope="col">
      <div :style="{ width: '80px' }">{{ title }}</div>
    </th>
    <td>
      <!-- <div class="column-w" :style="{ width: '1250px', overflow: 'hidden' }"> -->
      <div class="column-w" :style="{ overflow: 'hidden' }">
        <div
          class="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred"
          lang="en"
          dir="ltr"
          role="textbox"
          aria-label="Rich Text Editor, main"
          contenteditable="false"
          :style="{ width: '1300px', maxHeight: '100%' }"
          v-html="content"
        ></div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
  },
};
</script>
