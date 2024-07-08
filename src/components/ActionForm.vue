<template>
  <n-modal v-model:show="visible"
    @update:show="handleShow"
    :close-on-esc="false"
    :mask-closable="false"
    transform-origin="center"
  >
    <n-card
      style="width: 800px"
      title="自定义动作"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
    <n-form
      ref="formRef"
      :model="formdata"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="名称" path="title">
        <n-input v-model:value="formdata.title" placeholder="名称" />
      </n-form-item>
      <n-form-item label="参数名" path="argName">
        <n-input v-model:value="formdata.argName" placeholder="参数名" />
      </n-form-item>
      <n-form-item label="参数类型" path="argType">
        <n-input v-model:value="formdata.argType" placeholder="参数类型" />
      </n-form-item>
      <n-form-item label="动作" path="action">
        <n-input v-model:value="formdata.action" placeholder="动作" />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button size="medium" type="primary" @click="handleSubmit">保存</n-button>
      </div>
    </n-form>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import {
  NModal,
  NCard,
  NButton,
  NForm,
  NFormItem,
} from 'naive-ui'
import { ref, shallowReactive, watch } from 'vue';
import {v4 as uuid} from 'uuid'


type Props = {
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false
})
const visible = ref(false)
watch(() => props.show, newValue => {
  if (newValue !== visible.value) {
    visible.value = newValue
  }
})

const emit = defineEmits(['update:show'])

function handleShow(visible: boolean) {
  emit('update:show', visible)
}

const formRef = ref<null|typeof NForm>(null)

type Formdata = {
  title: null|string
  argName: null|string
  argType: null|string
  action: null|string
}

type SubmitData = {
  id: string
  title: string
  argName: string
  argType: string
  action: null|string
}

/** 表单数据 */
const formdata = shallowReactive<Formdata>({
  title: null,
  argName: 'data',
  argType: 'unknown',
  action: null,
})

/** 验证规则 */
const rules = {
  title: {required: true, message: '请输入名称', trigger: ['blur', 'input']},
  argName: {required: true, message: '请输入参数名', trigger: ['blur', 'input']},
  argType: {required: true, message: '请输入参数类型', trigger: ['blur', 'input']},
}

/** 生成提交数据 */
function generateSubmitdata() {
  return {
    id: uuid(),
    ...formdata
  } as SubmitData
}

function handleSubmit(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      const submitData = generateSubmitdata()
      console.log('验证成功', submitData)
    } else {
      console.log('验证失败', errors)
    }
  })
}
</script>
