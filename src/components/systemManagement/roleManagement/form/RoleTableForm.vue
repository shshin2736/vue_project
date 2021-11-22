<template>
  <div class="hms-grid basic-table">
    <table>
      <colgroup>
        <col style="width:13%" />
        <col />
        <col style="width:13%" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <!-- 권한 코드	 -->
          <th scope="row">{{ $t('NLS0000112') }}</th>
          <td>{{ getRoleInfo.roleId }}</td>
          <!-- 사용여부 -->
          <th scope="row">{{ $t('NLS0000058') }}</th>
          <td>{{ getRoleInfo.useYn }}</td>
        </tr>
        <tr v-for="item in languageList" :key="item.cdNm">
          <!-- 권한명 -->
          <th scope="now">{{ $t('NLS0000113') }}({{ item.cd }})</th>
          <td colspan="3">
            <span class="grid-input-form type1 type-nobtn">
              {{ getRoleInfo[`roleNm${item.cdL}`] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import { roleManagementStore } from '@/mixins';
import { common } from '@/utils';
export default {
  name: 'RoleTableForm',
  mixins: [roleManagementStore],
  data() {
    return {
      useYn: '',
      languageList: [],
    };
  },
  computed: {
    getRoleInfo() {
      return this[roleManagementTypes.getters.GET_ROLE_INFO];
    },
  },
  created() {
    if (common.isEmpty(this.$route.params.access)) {
      this.$router.push({
        name: 'rolePage',
        params: { auth: this.$route.params.auth },
      });
      return false;
    }
    this[roleManagementTypes.actions.FETCH_ROLE_INFO]({
      roleId: this.$route.params.roleId,
    });
    const list = common.getCodeList('G05');
    list.reduce((acc, cur) => {
      const cd = cur.cd;
      var sliceStr = cd.slice(0, -1);
      const toLowser = sliceStr + cd.charAt(cd.length - 1).toLowerCase();
      cur.cdL = toLowser;
      acc.push(cur);
      return acc;
    }, []);
    this.languageList = list;
  },
  mounted() {
    const code = common.getCodeList('G01');
    const tmp = this.getRoleInfo.useYn;
    for (const i of code) {
      if (i.cd === tmp) {
        this.useYn = i.cdNm;
      }
    }
  },
};
</script>
