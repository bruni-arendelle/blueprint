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
import { restrictRect, observerResize } from '../utils';


const layout = ref<HTMLElement|null>(null)
const blueprint = ref<HTMLElement|null>(null)
let graph: Graph|null = null

const view = shallowReactive({
  width: '100%',
  height: '100%',
})

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

let cancelObserver: undefined|(() => void) = undefined

onMounted(() => {
  cancelObserver = observerResize(layout.value!, function(width, height) {
    const [w, h] = restrictRect(
      [Math.min(width, 1920), Math.min(height - 40, 1080)], [16, 9]
    )
    view.width = Math.floor(w) + 'px'
    view.height = Math.floor(h + 40) + 'px'
  })
  nextTick(() => {
    loadGraph()
  })
})

onBeforeUnmount(() => {
  if (graph) {
    graph.dispose(true)
  }
  if (cancelObserver) {
    cancelObserver()
    cancelObserver = undefined
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
