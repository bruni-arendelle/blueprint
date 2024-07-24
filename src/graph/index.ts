import { CellView, Graph } from '@antv/x6';


const HEADER = 26;
const RADIUS = 5;
const MARGIN = 6;

export function calcHeight(ports: number) {
  return (RADIUS*2 + MARGIN*2)*ports + MARGIN*2*ports;
}

export function initGraph() {
  try {
    Graph.registerPortLayout('mainleft', function(args: any[]) {
      return args.map((_, index) => {
        return {
          position: {
            x: 0,
            y: HEADER + MARGIN + (RADIUS*2 + MARGIN*2)*index + MARGIN + RADIUS,
          },
          angle: 0,
        }
      })
    }, true)
  } catch (error) {
    console.error(error)
  }

  try {
    Graph.registerPortLayout('mainright', function(args: any[], bbox: {width: number}) {
      return args.map((_, index) => {
        return {
          position: {
            x: bbox.width,
            y: HEADER + MARGIN + (RADIUS*2 + MARGIN*2)*index + MARGIN + RADIUS,
          },
          angle: 0,
        }
      })
    }, true)
  } catch (error) {
    console.error(error)
  }
  
  try {
    Graph.registerEdge('dashed-edge', {
      inherit: 'edge',
      tools: [{
        name: 'button',
        args: {
          markup: [
            {
              tagName: 'circle',
              selector: 'button',
              attrs: {
                r: 14,
                fill: '#242424',
                cursor: 'pointer',
              },
            },
            {
              tagName: 'text',
              textContent: '</>',
              selector: 'icon',
              attrs: {
                ref: 'button',
                refX: 0.5,
                refY: 0.5,
                fill: '#ffffff',
                fontSize: 12,
                fontFamily: 'Monaco Courier',
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
                pointerEvents: 'none',
                y: '0.25em',
              },
            },
          ],
          distance: 0.382,
          onClick(args: any) {
            (this as unknown as CellView).graph.trigger('edit-transfer', args)
          },
        },
      }],
      attrs: {
        line: {
          stroke: '#2080f0',
          strokeWidth: 1,
        },
      },
    })
  } catch (error) {
    console.error(error)
  }
  
  try {
    Graph.registerNode('entity-node', {
      inherit: 'rect',
      width: 120,
      // height: 90,
      markup: [
        {tagName: 'rect', selector: 'header'},
        {tagName: 'text', selector: 'label'},
        {tagName: 'rect', selector: 'bottom'},
      ],
      attrs: {
        header: {
          refX: 0,
          refY: 0,
          refWidth: 1,
          height: HEADER,
          fill: '#2080f0',
          stroke: '#2080f0',
          strokeWidth: 1,
        },
        label: {
          ref: 'header',
          refX: 0.5,
          refY: 0.5,
          textAnchor: "middle",
          textVerticalAnchor: "middle",
          fill: '#fff',
          fontSize: 12,
        },
        bottom: {
          refX: 0,
          refY: HEADER,
          refWidth: 1,
          height: (RADIUS*2 + MARGIN*2)*2 + MARGIN*2,
          fill: '#eff4ff',
          stroke: '#2080f0',
          strokeWidth: 1,
        },
      },
      ports: {
        groups: {
          event: {
            attrs: {
              circle: {
                r: RADIUS,
                magnet: true,
                stroke: '#2080f0',
                strokeWidth: 1,
                fill: '#fff',
              },
            },
            position: {name: 'mainright'},
          },
          action: {
            attrs: {
              circle: {
                r: RADIUS,
                stroke: '#2080f0',
                strokeWidth: 1,
                fill: '#fff',
                magnet: true,
              },
            },
            position: {name: 'mainleft'}
          },
          reference: {
            attrs: {
              circle: {
                r: RADIUS,
                stroke: '#2080f0',
                strokeWidth: 1,
                fill: '#fff',
                magnet: true,
              },
            },
            // position: 'bottom',
            position: {
              name: 'absolute',
              args: { x: 0, y: 0 },
            },
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export function createGraph(el: HTMLElement) {
  const graph: Graph = new Graph({
    container: el,
    translating: {
      restrict: true,
    },
    connecting: {
      snap: {radius: 20},
      allowBlank: false,
      allowLoop: false,
      allowNode: false,
      allowEdge: false,
      allowMulti: 'withPort',
      highlight: true,
      validateMagnet({magnet}) {
        // 仅允许从事件连接到动作
        const portGroup = magnet.getAttribute('port-group');
        return portGroup === 'event' || portGroup === 'reference';
      },
      validateConnection({targetMagnet}) {
        // 仅允许从事件连接到动作
        if (targetMagnet && targetMagnet.getAttribute('port-group') === 'action') {
          return true;
        }
        return false;
      },
      createEdge() {
        return this.createEdge({
          shape: 'dashed-edge',
          attrs: {
            line: {
              strokeDasharray: '5 5',
            },
          },
        })
      },
    },
    highlighting: {
      // 当连接桩可以被链接时，在连接桩外围渲染一个 2px 宽的红色矩形框
      magnetAvailable: {
        name: 'stroke',
        args: {
          padding: 3,
          attrs: {
            stroke: '#2080f0',
            'stroke-width': 3,
          },
        },
      },
    },
    autoResize: true,
    panning: true,
    mousewheel: true,
    background: {
      color: '#fff',
    },
    grid: {
      visible: true,
      type: 'doubleMesh',
      args: [
        // 主网格
        {color: '#f1f1f1', thickness: 1},
        // 次网格
        {color: '#eee', thickness: 1, factor: 4},
      ],
    },
  })
    
  graph.on('edge:connected', function({ edge }) {
    edge.attr({
      line: {
        strokeDasharray: '',
      },
    })
  })

  graph.on('edge:mouseenter', function({ cell }) {
    cell.addTools([
      {
        name: 'button-remove',
        args: { distance: 0.75 },
      },
    ])
  })

  graph.on('edge:mouseleave', function({ cell }) {
    cell.removeTool('button-remove')
  })

  return graph
}
