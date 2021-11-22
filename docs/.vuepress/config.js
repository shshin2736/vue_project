module.exports = {
    title: 'HMS 공통 사용 문서',
    description: 'Vuepress 기반 문서',
    base: '/2019.Sunjin-HMS/frontend/',
    head: [
        ['link', {rel:'icon', href: '/favicon.ico'}]
    ],
    themeConfig: {
        logo: '/logo.png',
        sidebar: [
            {title: 'UI/UX Components', collapsable: false, children: [
                '/components/NativeGrid',
                '/components/RoleGridVue',
                '/components/Gantt',
                '/components/ColumnsShowBtn',
                '/components/Alert',
                '/components/UploadFile', 
                '/components/Menu', 
                '/components/PanelBar', 
                '/components/TreeView',
                '/components/TreeListVue',
                '/components/DatePicker',
                '/components/Overlay',
                '/components/Spinner', 
                '/components/menuBtn',
                '/components/menuBar',
                '/components/InputText',
                '/components/Dropdowns',
                '/components/DashboardBox',
                '/components/TabBar',
                '/components/ExcelExportBtn',
                '/components/ExcelImportBtn'
            ]},
            {title: 'Chart Components', collapsable: false, children: [
                '/charts/AmCharts4',
                '/charts/Achievement'
            ]},
            {title: 'Editor Components', collapsable: false, children: [
                '/editor/CKEditor',
            ]},
            {title: 'Business Components', collapsable: false, children: [
                '/business/FunctionCell',
                '/business/HideCell',
                '/business/CommandCell'
            ]},
            {title: 'Vue Router', collapsable: false, children: ['/router/router']},
            {title: 'Vuex', collapsable: false, children: ['/vuex/vuex']},
            {title: 'Vue i18n', collapsable: false, children: ['/i18n/i18n']},
            {title: 'VeeValidate', collapsable: false, children: [
                '/veeValidate/validate',
                '/veeValidate/validateError'
            ]},
            {title: 'Axios', collapsable: false, children: ['/axios/axios']},
            {title: 'Utils', collapsable: false, children: [
                '/utils/utils', 
                '/utils/common',
                '/utils/timezone', 
                '/utils/route',
                '/utils/cookies',
            ]}
        ],
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Reference', link: '/reference' }
          ]
      }
  }