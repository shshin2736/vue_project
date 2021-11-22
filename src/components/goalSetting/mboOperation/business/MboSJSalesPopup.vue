<template>
  <div class="page__layer-pop">
    <div class="layer-pop-wrap">
      <div class="layer-pop__box type-wide">
        <div class="layer-pop__title">
          <!-- TODO: 타이틀 따기 -->
          <!-- 2020.02 선진CU매출액 -->
          <p>{{ $t('NLS0000334') }}</p>
          <button type="button" class="layer-close">close</button>
        </div>
        <div class="layer-btn-tbox">
          <button type="button" class="red-btn">
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }}</span>
          </button>
        </div>
        <div class="search-box type-layer">
          <div class="search__form__box__block">
            <!-- 수정전 -->
            <strong class="search-box-title">{{ $t('NLS0000328') }}</strong>
            <div class="search__form__box type-table line3">
              <!-- 년간목표 -->
              <p class="search__form__title">
                {{ $t('NLS0000327') }}
              </p>
              <span class="input__box type-small type-nobtn">
                <input type="text" title="년간목표 입력폼" />
              </span>
            </div>
            <div class="search__form__box type-table line3">
              <p class="search__form__title">
                Threshold
              </p>
              <span class="input__box type-small type-nobtn">
                <input type="text" title="Threshold 입력폼" />
              </span>
            </div>
            <div class="search__form__box type-table line3">
              <p class="search__form__title">
                Max
              </p>
              <span class="input__box type-small type-nobtn">
                <input type="text" title="Max 입력폼" />
              </span>
            </div>
            <!-- 수정후 -->
            <strong class="search-box-title">{{ $t('NLS0000329') }}</strong>
            <div class="search__form__box type-table line3">
              <!-- 년간목표 -->
              <p class="search__form__title">
                {{ $t('NLS0000327') }}
              </p>
              <span class="input__box type-small type-nobtn">
                <input type="text" title="년간목표 입력폼" />
              </span>
            </div>
            <div class="search__form__box type-table line3">
              <p class="search__form__title">
                Threshold
              </p>
              <span class="input__box type-small type-nobtn">
                <input type="text" title="Threshold 입력폼" />
              </span>
            </div>
            <div class="search__form__box type-table line3">
              <p class="search__form__title">
                Max
              </p>
              <span class="input__box type-small type-nobtn">
                <input type="text" title="Max 입력폼" />
              </span>
            </div>
          </div>
          <div class="search__form__box__block">
            <div class="search__form__box type-table line3">
              <!-- 조회기간 -->
              <p class="search__form__title">
                {{ $t('NLS0000212') }}
              </p>
              <com-dropdowns
                :data-items="options1"
                class="hms-dropdown type1"
              ></com-dropdowns>
              <com-dropdowns
                :data-items="options2"
                class="hms-dropdown type1"
              ></com-dropdowns>
            </div>
            <div class="search__form__box type-table line3">
              <!-- 부서/사용자명 -->
              <p class="search__form__title">{{ $t('NLS0000126') }}</p>
              <span class="input__box type-wide type-nobtn">
                <input type="text" title="부서/사용자명 입력폼" />
              </span>
            </div>
          </div>
          <div class="search__form__box type-table line3">
            <!-- 구분 -->
            <p class="search__form__title divide">
              {{ $t('NLS0000138') }}
            </p>
            <div class="radio-box">
              <span class="radio-form"
                ><input
                  type="radio"
                  id="test1"
                  name="testradio"
                  checked="checked"
                />
                <!-- 월간 목표 -->
                <label for="test1">{{ $t('NLS0000403') }}</label></span
              ><span class="radio-form"
                ><input type="radio" id="test2" name="testradio" /><label
                  for="test2"
                >
                  <!-- 주간 목표 -->
                  {{ $t('NLS0000404') }}</label
                ></span
              >
            </div>
          </div>
          <div class="search__form__box type-table line3">
            <!-- 누계 계산방식 합계 -->
            <p class="search__form__title">
              {{ $t('NLS0000402') }} : {{ $t('NLS0000426') }}
            </p>
          </div>
          <div class="search__form__box type-table line3">
            <!-- 단위 개 -->
            <p class="search__form__title">
              {{ $t('NLS0000063') }} : {{ $t('NLS0000866') }}
            </p>
          </div>
        </div>
        <div class="hms-grid">
          <Grid
            :style="{ height: '300px' }"
            :data-items="result"
            :sortable="true"
            :sort="sort"
            :columns="columns"
          >
          </Grid>
        </div>
        <div class="layer-pop__subtitle">
          <!-- 목표수립 근거 -->
          <p>{{ $t('NLS0000333') }}</p>
        </div>
        <!-- 에이터영역 -->
        <div>{{ $t('NLS0001027') }}</div>
        <div class="layer-pop__subtitle">
          <!-- 파일첨부 -->
          <p>{{ $t('NLS0000905') }}</p>
        </div>
        <div class="hms-upload">
          <kendo-upload
            ref="upload"
            name="files"
            localization-select="여기에 첨부 파일을 끌어 오시거나 <em>파일을 선택</em>하세요."
            :async-save-url="'custom-save-url'"
            :async-remove-url="'custom-remove-url'"
            :validation-allowed-extensions="rules"
            :show-file-list="false"
            :drop-zone="'.dropZoneElement'"
            @success="onSuccess"
          >
          </kendo-upload>
          <div id="products">
            <kendo-listbox
              ref="listFiles"
              :data-source="initialFiles"
              data-text-field="name"
              :draggable="true"
              :toolbar-tools="['moveUp', 'moveDown', 'remove']"
              @remove="deleteFiles"
              @reorder="reorderFiles"
            >
            </kendo-listbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ComDropdowns from '@/components/common/global/ComDropdowns';

export default {
  name: 'MboSJSalesPopup',
  components: { ComDropdowns },
};
</script>
