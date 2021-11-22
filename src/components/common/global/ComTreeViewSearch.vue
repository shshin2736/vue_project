<template>
  <div class="search-box type-layer">
    <div class="search__form__box">
      <p class="search__form__title">
        부서명
      </p>
      <span class="input__box type-nobtn">
        <input
          type="text"
          class="search__text"
          v-model="searchTxt"
          @keyup.enter="search"
        />
        <a href="#" class="move"></a>
      </span>
    </div>
    <div class="search__btn__box">
      <button type="button" class="search__btn" @click="search">
        {{ $t('NLS0000253') }}</button
      ><!--검색-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComTreeViewSearch',
  data() {
    return {
      searchTxt: '',
      beforeTxt: '',
      linkList: null,
    };
  },
  methods: {
    search(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.searchTxt === '') return;
      const a = document.querySelectorAll('.k-link');
      if (this.searchTxt !== this.beforeTxt)
        this.linkList = a[Symbol.iterator]();
      let cnt = 0;
      for (const el of this.linkList) {
        el.setAttribute('name', `${el.innerText}_${cnt++}`);
        if (el.innerText.includes(this.searchTxt)) {
          el.click();
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
          window.scrollTo = 0;
          this.beforeTxt = this.searchTxt;
          this.$emit('search', el.innerText);
          break;
        }
      }
    },
  },
};
</script>
