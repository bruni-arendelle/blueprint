<template>
  <!-- @TODO 分拆为两个表单 -->
  <!-- 公共请求 -->
  <n-modal :show="show" @update:show="emit('update:show', $event)"
    :close-on-esc="false"
    :mask-closable="false"
    transform-origin="center"
  >
    <n-card
      style="width: 600px"
      title="公共请求"
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
        <n-form-item label="请求类型">
          <n-select :disabled="!!nodeData.id"
            v-model:value="formdata.requestType"
            :options="requestTypeOptions"
          ></n-select>
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
import { ref, watch } from 'vue';
import {
  NModal,
  NCard,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NSelect,
} from 'naive-ui';
import { v4 as uuid } from 'uuid';
// import { omit } from 'es-toolkit';
// import type * as Connection from '../types/connection'
import {
  type RequestNode,
  type NormalRequestNode,
  type OnameRequestNode,
  REQUEST_TYPE,
} from '../types/connection'


// type Normal = Connection.NormalRequest
// type Oname = Connection.OnameRequest

type Header = {key: string|null, value: string|null}
type Oname = {oname: string|null, attr: string|null, interval: number}

type Formdata = {
  title: null|string
  desc: null|string
  requestType: REQUEST_TYPE

  method: null|'GET'|'POST'
  headers: Array<Header>
  payload: null|string
  url: null|string
  interval: null|number
  filter: null|string

  onames: Array<Oname>
}

type Props = {
  show: boolean
  nodeData: {id?: never}|RequestNode
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
// function cloneRequest<T extends object>(request: T): T {
//   return JSON.parse(JSON.stringify(request));
//   // if (request.type === Connection.REQUEST_TYPE.NORMAL) {
//   //   return {
//   //     ...omit(request, ['headers', 'payload']),
//   //     headers: { ...request.headers },
//   //     payload: { ...request.payload },
//   //   };
//   // } else {
//   //   return { ...request };
//   // }
// }

/** 构造默认表单数据 */
function getDefaultFormdata() {
  return {
    title: null,
    desc: null,
    requestType: REQUEST_TYPE.NORMAL,
    method: 'GET',
    url: null,
    headers: [] as Array<Header>,
    payload: null,
    interval: 30,
    filter: null,

    onames: [] as Array<Oname>,
  } as Formdata;
}

/** 使用常规请求节点构造表单数据 */
function getNormalFormdata(node: NormalRequestNode) {
  return {
    title: node.title,
    desc: node.desc,
    requestType: node.requestType,
    method: node.method,
    url: node.url,
    headers: node.headers.map((kv) => ({...kv})),
    payload: JSON.stringify(node.payload, undefined, 4),
    interval: node.interval,
    filter: node.filter,

    onames: [],
  } as Formdata;
}

/** 使用 oName 请求节点构造表单数据 */
function getOnameFormdata(node: OnameRequestNode) {
  return {
    title: node.title,
    desc: node.desc,
    requestType: node.requestType,

    method: null,
    url: null,
    headers: [] as Array<Header>,
    payload: null,
    interval: null,
    filter: null,

    onames: node.onames.map((o) => ({
      oname: o.oname,
      attr: o.attr.join(','),
      interval: o.interval,
    })),
  } as Formdata;
}

/**
 * 生成表单数据
 * @param data - 传入节点数据
 */
function generateFormdata(data: {id?: never}|RequestNode = {}): Formdata {
  // 未指定节点时返回默认初始数据
  if (!data.id) {
    return getDefaultFormdata();
  }

  // 常规请求
  if (data.requestType === REQUEST_TYPE.NORMAL) {
    return getNormalFormdata(data);
  }

  // oName 请求
  return getOnameFormdata(data);
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

/** 请求类型选项 */
const requestTypeOptions = [
  {value: REQUEST_TYPE.NORMAL, label: '常规'},
  {value: REQUEST_TYPE.ONAME, label: 'oName'},
]

/** 生成提交数据 */
function generateSubmitData() {
  const id = props.nodeData.id || uuid();
  const {title, desc, requestType} = formdata.value
  if (requestType === REQUEST_TYPE.NORMAL) {
    return {
      id,
      title,
      desc,
      requestType,

      method: formdata.value.method as 'GET'|'POST',
      url: formdata.value.url as string,
      headers: formdata.value.headers.map((kv) => ({...kv})) as Array<{key: string, value: string}>,
      payload: formdata.value.payload ? JSON.parse(formdata.value.payload) : {},
      interval: formdata.value.interval,
      filter: formdata.value.filter,
    } as NormalRequestNode;
  } else {
    return {
      id,
      title,
      desc,
      requestType,

      onames: formdata.value.onames.map((o) => ({
        oname: o.oname,
        attr: o.attr?.split(',') || [],
        interval: o.interval,
      })),
    } as OnameRequestNode;
  }
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
