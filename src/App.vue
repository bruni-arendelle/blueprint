<template>
  <n-config-provider :theme="darkTheme" abstract>
    <n-dialog-provider>
      <n-layout position="absolute">
        <n-layout-header bordered style="height: 40px;"></n-layout-header>
        <n-layout has-sider position="absolute" style="top: 40px; bottom: 0">
          <n-layout-sider bordered width="48">
            <div class="sidemenu">
              <NTooltip placement="right">
                <template #trigger>
                  <div class="sidemenu__btn" style="margin-top: auto;" @click="blueprintVisible = true">
                    <n-icon size="24"><AllInclusiveSharp></AllInclusiveSharp></n-icon>
                  </div>
                </template>
                蓝图
              </NTooltip>
            </div>
          </n-layout-sider>
          <n-layout content-style="padding: 16px;">
            <n-text>内容区</n-text>
          </n-layout>
        </n-layout>
      </n-layout>
      <n-modal v-model:show="blueprintVisible"
        :close-on-esc="false"
        :mask-closable="true"
        transform-origin="center"
        style="background-color: rgba(0,0,0,0.1);"
        display-directive="show"
      >
        <div class="blueprint-container">
          <BlueprintEditor style="pointer-events: none;"></BlueprintEditor>
        </div>
      </n-modal>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  // NMessageProvider,
  NDialogProvider,
  // NNotificationProvider,
  darkTheme,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  // NLayoutContent,
  NText,
  NTooltip,
  NIcon,
  NModal,
} from 'naive-ui'
// import { FloatingIp, EdtLoop } from '@vicons/carbon'
import { AllInclusiveSharp } from '@vicons/material'
import BlueprintEditor from './components/BlueprintEditor.vue';
import { ref } from 'vue';

const blueprintVisible = ref(false)
</script>

<style scoped>
.sidemenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.sidemenu__btn {
  flex: none;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.6;
}

.sidemenu__btn:hover {
  opacity: 1;
}

.blueprint-container {
  width: 100%;
  height: 100%;
  padding: 32px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  /* color: #ff4500 */
}
</style>
