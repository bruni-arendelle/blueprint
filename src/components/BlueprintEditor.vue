<template>
  <div class="blueprint" ref="layout">
    <div class="blueprint__container" :style="{width: view.width, height: view.height}">
      <div class="blueprint__toolbar">
        <!-- 工具栏 -->
      </div>
      <div class="blueprint__main">
        <div class="blueprint__graph" ref="blueprint"></div>
      </div>
      <div class="blueprint__btns">
        <n-popselect placement="left-end" :options="requestTypeOptions" trigger="click" @update:value="handleCreateRequestNode">
          <n-button circle type="primary" class="mt-3 shadow-md">
            <template #icon><n-icon><AddIcon></AddIcon></n-icon></template>
          </n-button>
        </n-popselect>
      </div>
    </div>
    <DataNodeForm v-model:show="dataNodeFormVisible" :node-data="dataNodeData" @save="handleDataNodeSave"></DataNodeForm>
    <RequestNodeForm v-model:show="requestNodeFormVisible" :node-data="requestNodeData" @save="handleRequestNodeSave"></RequestNodeForm>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  shallowReactive,
  nextTick,
} from 'vue';
import { Cell, CellView, Graph } from '@antv/x6';
import { calcHeight, createGraph } from '../graph';
import { restrictRect, onResize } from '../utils';
import DataNodeForm from './DataNodeForm.vue';
import RequestNodeForm from './RequestNodeForm.vue';
import {
  NButton,
  NIcon,
  // NTooltip,
  NPopselect,
} from 'naive-ui';
import type * as Connection from '../types/connection';
import { REQUEST_TYPE, NODE_TYPE } from '../types/connection';
import { Add as AddIcon } from '@vicons/carbon';


const layout = ref<HTMLElement|null>(null)
const view = shallowReactive({
  width: '100%',
  height: '100%',
})

let cancelObserver: undefined|(() => void) = undefined

onMounted(() => {
  cancelObserver = onResize(layout.value!, function(width, height) {
    const [w, h] = restrictRect(
      [Math.min(width, 1920), Math.min(height - 40, 1080)], [16, 9]
    )
    view.width = Math.floor(w) + 'px'
    view.height = Math.floor(h + 40) + 'px'
  })
})

onBeforeUnmount(() => {
  if (cancelObserver) {
    cancelObserver()
    cancelObserver = undefined
  }
})

const blueprint = ref<HTMLElement|null>(null)
let graph: Graph|null = null

function loadGraph() {
  graph = createGraph(blueprint.value!)
  
  graph.on('edge:connected', ({ isNew, edge }) => {
    console.log('edge:connected', {isNew, id: edge.id})
  })

  graph.on('edge:removed', function({ cell }) {
    console.log('edge:removed', cell.id)
  })

  graph.on('edit-transfer', function(args: {e: MouseEvent, cell: Cell, view: CellView}) {
    console.log('edit-transfer', {args})
  });

  const node = graph.addNode({
    shape: 'entity-node',
    x: 20,
    y: 120,
    label: '时间选择器1',
    ports: {
      items: [
        { group: 'event' },
        { group: 'action' },
      ],
    },
  })
  node.attr('bottom/height', calcHeight(1))

  const node2 = graph.addNode({
    shape: 'entity-node',
    x: 20,
    y: 180,
    label: '时间选择器2',
    ports: {
      items: [
        { group: 'event' },
        { group: 'action' },
      ],
    },
  })
  node2.attr('bottom/height', calcHeight(1))
  
  const node3 = graph.addNode({
    shape: 'entity-node',
    x: 200,
    y: 160,
    label: '已选时间',
    ports: {
      items: [
        { group: 'action' },
        { group: 'reference', args: {x: 0.5, y: 60} },
      ],
    },
  })
  node3.attr('bottom/height', calcHeight(1))
  
  const node4 = graph.addNode({
    shape: 'entity-node',
    x: 200,
    y: 60,
    label: '查询按钮',
    ports: {
      items: [
        { group: 'event' },
        { group: 'action' },
      ],
    },
  })
  node4.attr('bottom/height', calcHeight(1))
  
  const node5 = graph.addNode({
    shape: 'entity-node',
    x: 100,
    y: 60,
    label: '请求',
    ports: {
      items: [
        { group: 'event' },
        { group: 'action' },
      ],
    },
  })
  node5.attr('bottom/height', calcHeight(1))
  
  const node6 = graph.addNode({
    shape: 'entity-node',
    x: 100,
    y: 60,
    label: '折线图',
    ports: {
      items: [
        { group: 'event' },
        { group: 'action' },
      ],
    },
  });
  node6.attr('bottom/height', calcHeight(1));
  
  const node7 = graph.addNode({
    shape: 'entity-node',
    x: 100,
    y: 60,
    label: '部门选择器',
    ports: {
      items: [
        { group: 'event' },
        { group: 'action' },
      ],
    },
  });
  node7.attr('bottom/height', calcHeight(1));
  
  const node8 = graph.addNode({
    shape: 'entity-node',
    x: 100,
    y: 60,
    label: '页面跳转',
    ports: {
      items: [
        { group: 'action' },
      ],
    },
  });
  node8.attr('bottom/height', calcHeight(1));
}

onMounted(() => {
  nextTick(() => {
    loadGraph()
  })
})

onBeforeUnmount(() => {
  if (graph) {
    graph.dispose(true)
  }
})


///////////////////////////////////////////////////////////////////////////////
// 数据节点
///////////////////////////////////////////////////////////////////////////////

const dataNodeFormVisible = ref(false);
const dataNodeData = ref<{id?: never}|Connection.DataNode>({});

// function handleCreateDataNode() {
//   dataNodeData.value = {};
//   dataNodeFormVisible.value = true;
// }

function handleDataNodeSave(data: Connection.DataNode) {
  console.log('添加公共变量节点：', data)
}


///////////////////////////////////////////////////////////////////////////////
// 公共请求节点
///////////////////////////////////////////////////////////////////////////////

/** 请求类型选项 */
const requestTypeOptions = [
  {value: REQUEST_TYPE.NORMAL, label: '常规请求'},
  {value: REQUEST_TYPE.ONAME, label: 'oName 请求'},
  {value: NODE_TYPE.DATA, label: '公共数据'},
]

const requestNodeFormVisible = ref(false);
const requestNodeData = ref<{id?: never}|Connection.RequestNode>({});

function handleCreateRequestNode(selected: string) {
  console.log('selected', {selected})
  // requestNodeData.value = {};
  // requestNodeFormVisible.value = true;
}

function handleRequestNodeSave(data: Connection.RequestNode) {
  console.log('添加公共请求节点：', data)
}
</script>

<style scoped>
.blueprint {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.blueprint__container {
  padding-top: 40px;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  pointer-events: all;
}

.blueprint__toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  background-color: rgba(24,24,24,1);

  position: absolute;
  top: 0;
  left: 0;
}

.blueprint__main {
  width: 100%;
  height: 100%;
}

.blueprint__btns {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
}

</style>
