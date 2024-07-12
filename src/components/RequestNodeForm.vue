<template>
  <!-- 公共变量 -->
  <n-modal :show="show" @update:show="emit('update:show', $event)"
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
// import { omit } from 'es-toolkit';


type Normal = Connection.NormalRequest
type Oname = Connection.OnameRequest

type Formdata = {
  title: null|string
  desc: null|string
  requests: Array<Normal|Oname>
}

type Props = {
  show: boolean
  nodeData: {id?: never}|Connection.RequestNode
}

const props = defineProps<Props>();
const emit = defineEmits(['update:show', 'save']);

// // 同步内外显示状态
// const innerShow = ref(false);
// watch(() => props.show, newVal => {
//   if (newVal !== innerShow.value) {
//     innerShow.value = newVal;
//   }
// });
// watch(innerShow, newVal => {
//   if (newVal !== props.show) {
//     emit('update:show', newVal);
//   }
// });

const formRef = ref<null|typeof NForm>(null);

// function cloneRequest(request: Normal): Normal
// function cloneRequest(request: Oname): Oname
function cloneRequest<T extends object>(request: T): T {
  return JSON.parse(JSON.stringify(request));
  // if (request.type === Connection.REQUEST_TYPE.NORMAL) {
  //   return {
  //     ...omit(request, ['headers', 'payload']),
  //     headers: { ...request.headers },
  //     payload: { ...request.payload },
  //   };
  // } else {
  //   return { ...request };
  // }
}

/**
 * 生成表单数据
 * @param data - 传入节点数据
 */
function generateFormdata(data: {id?: never}|Connection.RequestNode = {}) {
  if (data.id) {
    return {
      title: data.title,
      desc: data.desc,
      requests: data.requests.map(r => cloneRequest(r)),
    };
  }
  return {
    title: null,
    desc: null,
    requests: [] as Array<Normal|Oname>,
  };
}

/** 表单数据 */
const formdata = ref<Formdata>(generateFormdata(props.nodeData));

// // 显示时，初始化表单
// watch(innerShow, (newVal) => {
//   if (newVal) {
//     formdata.value = generateFormdata(props.nodeData);
//     // 还原到未验证状态
//     formRef.value?.restoreValidation();
//   }
// });

watch(() => props.nodeData, (newData) => {
  formdata.value = generateFormdata(newData)
});

/** 生成提交数据 */
function generateSubmitData() {
  return {
    id: props.nodeData.id || uuid(),
    ...formdata.value
  } as Connection.RequestNode;
}

/** 验证规则 */
const rules = {
  title: {required: true, message: '不能为空', trigger: ['submit']},
  // desc: {required: true, message: '请输入描述', trigger: ['submit']},
};

function handleCancel() {
  // innerShow.value = false;
  emit('update:show', false);
}

function handleSubmit(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate().then(() => {
    const submitData = generateSubmitData();
    emit('save', submitData);
    // innerShow.value = false;
    emit('update:show', false);
  }).catch(() => {
    // console.log('验证失败')
  });
}
</script>
