<template>
  <n-modal v-model:show="visible"
    :close-on-esc="false"
    :mask-closable="false"
    transform-origin="center"
  >
    <n-card
      style="width: 480px"
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
      <n-form-item label="名称" path="title" first>
        <n-input v-model:value="formdata.title" placeholder="名称" />
      </n-form-item>
      <n-form-item label="参数名" path="argName" first>
        <n-input v-model:value="formdata.argName" placeholder="参数名" />
      </n-form-item>
      <n-form-item label="参数类型" path="argType" first>
        <n-input v-model:value="formdata.argType" placeholder="参数类型" />
      </n-form-item>
      <n-form-item label="动作" path="action" first>
        <n-input v-model:value="formdata.action" placeholder="动作" />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button size="medium" @click="handleCancel">取消</n-button>
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
  NInput,
} from 'naive-ui'
import { ref, watch } from 'vue';
import { v4 as uuid } from 'uuid'


type Formdata = {
  title: null|string
  argName: null|string
  argType: null|string
  action: null|string
}

type Props = {
  show: boolean
  action: {id?: null}|Connection.Entity.Action
}

const props = defineProps<Props>()
const emit = defineEmits(['update:show', 'save'])

const visible = ref(false)
watch(() => props.show, newValue => {
  if (newValue !== visible.value) {
    visible.value = newValue
  }
})

watch(visible, newVisible => {
  if (newVisible !== props.show) {
    emit('update:show', newVisible)
  }
})

const formRef = ref<null|typeof NForm>(null)

function generateFormdata(data: {id?: null}|Connection.Entity.Action = {}) {
  if (data.id) {
    return {
      title: data.title,
      argName: data.argName,
      argType: data.argType,
      action: data.action,
    }
  }
  return {
    title: null,
    argName: 'data',
    argType: 'unknown',
    action: null,
  }
}

/** 表单数据 */
const formdata = ref<Formdata>(generateFormdata(props.action))
watch(() => props.action, newData => {
  formdata.value = generateFormdata(newData)
})

/** 生成提交数据 */
function generateSubmitData() {
  return {
    id: props.action.id || uuid(),
    ...formdata.value
  } as Connection.Entity.Action
}

/** 验证规则 */
const rules = {
  title: {required: true, message: '请输入名称', trigger: ['submit']},
  argName: {required: true, message: '请输入参数名', trigger: ['submit']},
  argType: {required: true, message: '请输入参数类型', trigger: ['submit']},
  action: {required: true, message: '请输入动作代码', trigger: ['submit']},
}

function handleCancel() {
  visible.value = false
}

function handleSubmit(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      const submitData = generateSubmitData()
      emit('save', submitData)
      visible.value = false
    } else {
      console.log('验证失败', errors)
    }
  })
}
</script>
