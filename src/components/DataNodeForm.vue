<template>
  <!-- 公共变量 -->
  <n-modal v-model:show="innerShow"
    :close-on-esc="false"
    :mask-closable="false"
    transform-origin="center"
  >
    <n-card
      style="width: 480px"
      title="公共变量"
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
        <n-form-item label="描述" path="desc" first>
          <n-input v-model:value="formdata.desc" placeholder="描述" />
        </n-form-item>
        <n-form-item label="变量名" path="dataName" first>
          <n-input v-model:value="formdata.dataName" placeholder="变量名" />
        </n-form-item>
        <n-form-item label="类型描述" path="dataType" first>
          <n-input type="textarea" v-model:value="formdata.dataType" placeholder="类型描述" />
        </n-form-item>
        <div class="flex justify-end">
          <n-button @click="handleCancel">取消</n-button>
          <n-button type="primary" class="ml-3" @click="handleSubmit">保存</n-button>
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
} from 'naive-ui';
import { ref, watch } from 'vue';
import { v4 as uuid } from 'uuid';
import { pick } from 'es-toolkit';


type Formdata = {
  title: null|string
  desc: null|string
  dataName: null|string
  dataType: null|string
}

type Props = {
  show: boolean
  nodeData: {id?: never}|Connection.DataNode
}

const props = defineProps<Props>();
const emit = defineEmits(['update:show', 'save']);

// 同步内外显示状态
const innerShow = ref(false);
watch(() => props.show, newVal => {
  if (newVal !== innerShow.value) {
    innerShow.value = newVal;
  }
});
watch(innerShow, newVal => {
  if (newVal !== props.show) {
    emit('update:show', newVal);
  }
});

const formRef = ref<null|typeof NForm>(null);

/**
 * 生成表单数据
 * @param data - 传入节点数据
 */
function generateFormdata(data: {id?: never}|Connection.DataNode = {}) {
  if (data.id) {
    return pick(data, ['title', 'desc', 'dataName', 'dataType']);
  }
  return {
    title: null,
    desc: null,
    dataName: null,
    dataType: '{}',
  };
}

/** 表单数据 */
const formdata = ref<Formdata>(generateFormdata(props.nodeData));

// 显示时，初始化表单
watch(innerShow, (newVal) => {
  if (newVal) {
    formdata.value = generateFormdata(props.nodeData);
    // 还原到未验证状态
    formRef.value?.restoreValidation();
  }
});

/** 生成提交数据 */
function generateSubmitData() {
  return {
    id: props.nodeData.id || uuid(),
    type: Connection.NODE_TYPE.DATA,
    ...formdata.value
  } as Connection.DataNode;
}

/** 验证规则 */
const rules = {
  title: {required: true, message: '不能为空', trigger: ['submit']},
  // desc: {required: true, message: '请输入描述', trigger: ['submit']},
  dataName: [
    {required: true, message: '不能为空', trigger: ['submit']},
    {pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/, message: '只允许大小写字母、数字及下划线，且不能以数字开头', trigger: ['submit']},
  ],
  dataType: {required: true, message: '不能为空', trigger: ['submit']},
};

function handleCancel() {
  innerShow.value = false;
}

function handleSubmit(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate().then(() => {
    const submitData = generateSubmitData();
    emit('save', submitData);
    innerShow.value = false;
  }).catch(() => {
    // console.log('验证失败')
  });
}
</script>
