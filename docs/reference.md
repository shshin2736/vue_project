---
title: Reference
---
# 참고사항
이 문서는 VuePress 기반으로 작성 되었습니다. 

## 개발환경
node: v12.14.0

@vue/cli: 4.1.2

## 라이브러리
공통컴포넌트 및 기능 구현에 사용된 라이브러리 종류는 아래와 같습니다.
- [Vue.js](https://vuejs.org/)
- [Vue-i18n](https://kazupon.github.io/vue-i18n/)
- [Vue-router](https://router.vuejs.org/kr/)
- [Vuex](https://vuex.vuejs.org/kr/)
- [VuePress](https://vuepress.vuejs.org/)
- [VeeValidate](https://logaretm.github.io/vee-validate/)
- [AmCharts4](https://www.amcharts.com/docs/v4/)
- [Kendo UI/UX](https://www.telerik.com/kendo-vue-ui)
- [Moment Timezone](https://momentjs.com/timezone/)
- [Axios](https://github.com/axios/axios)
- [CKEditor5](https://ckeditor.com/docs/ckeditor5/latest/builds/index.html)
- [VueSlick](https://npmjs.com/package/vue-slick-carousel)

## 개발 툴
[Visual Studio Code](https://code.visualstudio.com/)

### Plugin
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Formatting Toggle](https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle)
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl)
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
### Preferences Open Setting
```json
{
    "workbench.colorTheme": "Night Owl",
    "workbench.iconTheme": "material-icon-theme",
    "editor.formatOnPaste": false,
    "editor.formatOnType": false,
    "editor.formatOnSave": false,
    "eslint.alwaysShowStatus": true,
    "eslint.validate": [
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "javascriptreact",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        }
    ],
    // Vetur
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "singleQuote": true,
            "semi": true,
            "useTabs": true,
            "tabWidth": 2,
            "trailingComma": "all",
            "printWidth": 80,
            "bracketSpacing": true,
            "arrowParens": "avoid"
        }
    },
    "vetur.format.defaultFormatter.html": "none",
    "vetur.format.defaultFormatter.js": "prettier",
    "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
    "explorer.confirmDelete": false,
    "editor.suggestSelection": "first",
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "material-icon-theme.folders.color": "#26a69a",
    "window.zoomLevel": 0,
    "files.autoSave": "off",
}
```

### Debugging in VS Code
[https://kr.vuejs.org/v2/cookbook/debugging-in-vscode.html](https://kr.vuejs.org/v2/cookbook/debugging-in-vscode.html)