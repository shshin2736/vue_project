<template>
  <keep-alive>
    <validation-provider :name="id" immediate :rules="rules" tag="div">
      <ckeditor
        ref="ckeditor"
        :editor="editor"
        :value="value"
        :config="setEditorConfig"
        @input="onEditorInput"
        @ready="onReady"
      ></ckeditor>
    </validation-provider>
  </keep-alive>
</template>

<script>
//! ⚠️ NOTE: We don't use @ckeditor/ckeditor5-build-classic any more!
//* Since we're building CKEditor from source, we use the source version of ClassicEditor.

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import BalloonToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/balloon/balloontoolbar';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Font from '@ckeditor/ckeditor5-font/src/font';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

export default {
  name: 'ComCKEditor',
  props: {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: false,
    },
    rules: {
      type: String,
      required: false,
    },
    types: {
      type: String,
      required: false,
      default: 'balloon',
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    labelId: {
      type: String,
      required: false,
    },
    labelTitle: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      items: [
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'outdent',
        'indent',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'link',
        '|',
        'alignment:left',
        'alignment:right',
        'alignment:center',
        'alignment:justify',
        '|',
        'imageUpload',
        'imageTextAlternative',
        // 'imageStyle:full',
        // 'imageStyle:side',
        '|',
        'horizontalLine',
        'insertTable',
        '|',
        'undo',
        'redo',
      ],
      editing: null,
    };
  },
  computed: {
    setDisabled(state) {
      const disable = state.disable;
      return disable != null ? disable : false;
    },
    setEditorConfig(state) {
      const editorConfig = {
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
          EasyImage,
          Alignment,
          Heading,
          Font,
          HorizontalLine,
          Base64UploadAdapter,
          Table,
          TableToolbar,
          TableProperties,
          TableCellProperties,
          Indent,
          IndentBlock,
          Image,
          ImageToolbar,
          ImageStyle,
          ImageResize,
          BalloonToolbar,
        ],
        fontFamily: {
          options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
          ],
        },
        toolbar: this.types === 'classic' ? { items: state.items } : {},
        balloonToolbar: this.types === 'balloon' ? { items: state.items } : {},
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
          ],
        },
        link: {
          decorators: {
            addTargetToExternalLinks: {
              mode: 'automatic',
              callback: url => /^(https?:)?\/\//.test(url),
              attributes: {
                target: '_blank',
                rel: 'noopener noreferrer',
              },
            },
          },
        },
        fontSize: {
          options: [10, 11, 12, 13, 14, 15, 'default', 18, 20, 22, 24],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
            {
              model: 'headingFancy',
              view: {
                name: 'h2',
                classes: 'fancy',
              },
              title: 'Heading 2 (fancy)',
              class: 'ck-heading_heading2_fancy',
              converterPriority: 'high',
            },
          ],
        },
        image: {
          //? Image upload feature options.
          upload: {
            types: ['png', 'jpeg', 'jpg', 'bmp', 'gif'],
          },
          styles: ['alignLeft', 'alignCenter', 'alignRight'],
          toolbar: [
            'imageStyle:alignLeft',
            'imageStyle:alignCenter',
            'imageStyle:alignRight',
          ],
        },
      };
      return editorConfig;
    },
  },
  watch: {
    disable: function(value) {
      if (this.editing !== null) this.editing.isReadOnly = value;
    },
  },
  methods: {
    onEditorInput(value) {
      this.$emit('input', value === '' ? '<p></p>' : value);
    },
    onReady(items) {
      items.editing.view.isFocused = true;
      items.editing.view.isFocused = false;
      items.isReadOnly = this.disable;
      this.editing = items;
    },
  },
};
</script>
