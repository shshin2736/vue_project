---
title: Upload File
---

# Upload File 컴포넌트
Upload 기능를 컴포넌트 화

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-upload-file
    :rules="업로드할 파일 확장자"
    :multiple="다중 업로드 여부"
    @files="업로드된 파일 데이터"
></com-upload-file>
```

# Props
- ownerObjectId : 파일 업로드 객체 아이디 (String)

- downloadType : 파일 다운로드 타입 (String)

- rules: 업로드 할 파일 확장자 ( Array )
```js
['.jpg', '.jpeg', '.png', '.bmp', '.gif', '.pdf', ...n]
```
- fileList: 초기 파일 리스트 (Array)
```js
{
    fileId: '파일고유아이디'
    name: '파일이름',
    size: '크기',
    extension: '확장자',
    uploading: true,
    success: true,
},
```
- read : 읽기 전용 (Boolean)
```js
default false
```
- multiple: 다중 업로드 여부 ( Boolean )
```js
default true
```
- localization: DropZone 표시 언어(String)
```js
defalut `여기에 첨부 파일을 끌어 오시거나 <em>파일을 선택</em>하세요.`
```
# Events
- files: 업로드된 파일 데이터 ( Function )
```js
function ( data ) { }
```

# Upload File 예제
```vue
<template>
    <com-upload-file
        :rules="['.jpg', '.jpeg', '.png', '.bmp', '.gif', '.pdf']"
        @files="getFiles"
    ></com-upload-file>
</template>

<script>
export default {
    methods: {
        getFiles(filse) {
            console.log(filse);
        },
    }
}
</script>
```