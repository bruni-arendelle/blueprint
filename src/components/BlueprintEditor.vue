<template>
  <div class="blueprint" ref="layout">
    <div class="blueprint__container" :style="{width: view.width, height: view.height}">
      <div class="blueprint__toolbar">
        <!-- 工具栏 -->
      </div>
      <div class="blueprint__wrapper">
        <div class="blueprint__graph" ref="blueprint"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, shallowReactive, nextTick } from 'vue'
import { Cell, CellView, Graph } from '@antv/x6'
import { createGraph } from '../graph'


const layout = ref<HTMLElement|null>(null)
const blueprint = ref<HTMLElement|null>(null)
let graph: Graph|null = null

const view = shallowReactive({
  width: '100%',
  height: '100%',
})

function handleResize() {
  if (layout.value) {
    const unit = Math.floor(Math.min(
      layout.value.clientWidth/16,
      (layout.value.clientHeight - 40)/9,
      120,
    ))
    view.width = unit * 16 + 'px'
    view.height = unit * 9 + 40 + 'px'
  } else {
    view.width = '100%'
    view.height = '100%'
  }
}

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
  })

  const node = graph.addNode({
    shape: 'entity-node',
    x: 0,
    y: 0,
    label: '组件：树组件',
    ports: {
      items: [
        { group: 'event' },
        { group: 'event' },
        { group: 'action' },
        { group: 'action' },
      ],
    },
  })
  // node.prop('size/height', 90)
  node.attr('main/height', 24*2 + 12)

  const node2 = graph.addNode({
    shape: 'entity-node',
    x: 0,
    y: 0,
    label: '组件：树组件2',
    ports: {
      items: [
        { group: 'event' },
        { group: 'event' },
        { group: 'action' },
        { group: 'action' },
      ],
    },
  })
  // node.prop('size/height', 90)
  node2.attr('main/height', 24*2 + 12)
}

let resizeObserver: ResizeObserver|null = null

onMounted(() => {
  handleResize()
  resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(layout.value!)

  nextTick(() => {
    loadGraph()
  })
})

onBeforeUnmount(() => {
  if (graph) {
    graph.dispose(true)
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
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

.blueprint__wrapper {
  width: 100%;
  height: 100%;
}
</style>
