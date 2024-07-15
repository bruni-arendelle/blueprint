
// declare namespace Connection {
//   enum NODE_TYPE {
//     COMPONENT = 'component',
//     DATA = 'data',
//     REQUEST = 'request',
//     PRESET = 'preset',
//   }

//   interface BaseNode {
//     /** 全局唯一 */
//     id: string
//     /** 显示名 */
//     title: string
//     /** 描述 */
//     desc: string
//     /** 分类 */
//     type: NODE_TYPE
//   }

//   /** 组件节点 */
//   interface ComponentNode extends BaseNode {
//     type: NODE_TYPE.COMPONENT
//   }
  
//   /** 公共变量 */
//   interface DataNode extends BaseNode {
//     type: NODE_TYPE.DATA
//     /** 变量名 */
//     dataName: string
//     /** 类型 */
//     dataType: string
//   }

//   enum REQUEST_TYPE {
//     NORMAL = 'normal',
//     ONAME = 'oname',
//   }

//   // interface RequestBase {
//   //   id: string
//   //   type: REQUEST_TYPE
//   //   /** 执行间隔 */
//   //   interval: number
//   //   /** 是否立即执行 */
//   //   immediate: boolean
//   //   /** 结果处理 */
//   //   filter: string|null
//   // }
  
//   // /** 常规请求 */
//   // interface NormalRequest extends RequestBase {
//   //   type: REQUEST_TYPE.NORMAL
//   //   url: string
//   //   method: 'GET'|'POST'
//   //   headers: object
//   //   payload: object
//   // }
  
//   // /** oName 请求 */
//   // interface OnameRequest extends RequestBase {
//   //   type: REQUEST_TYPE.ONAME
//   //   oname: string
//   // }

//   // /** 公共请求节点 */
//   // interface RequestNode extends BaseNode {
//   //   type: NODE_TYPE.REQUEST
//   //   /** 请求队列 */
//   //   requests: Array<NormalRequest|OnameRequest>
//   // }

//   interface NormalRequestNode extends BaseNode {
//     type: NODE_TYPE.REQUEST
//     requestType: REQUEST_TYPE.NORMAL
//     method: 'GET'|'POST'
//     url: string
//     headers: Array<{key: string, value: string}>
//     payload: object
//     interval: number
//     filter: string|null
//   }

//   interface OnameParams {
//     oname: string
//     attr: string[]
//     interval: number
//   }

//   interface OnameRequestNode extends BaseNode {
//     type: NODE_TYPE.REQUEST
//     requestType: REQUEST_TYPE.ONAME
//     onames: Array<OnameParams>
//   }
  
//   /** 公共请求节点 */
//   type RequestNode = NormalRequestNode|OnameRequestNode
  
//   /** 预设节点 */
//   interface PresetNode extends BaseNode {
//     type: NODE_TYPE.PRESET
//   }
  
//   /** 节点类型 */
//   type Node = ComponentNode|DataNode|RequestNode|PresetNode

//   /** 连接桩类型 */
//   enum PORT_TYPE {
//     EVENT = 'event',
//     ACTION = 'action',
//     REFERENCE = 'reference',
//   }

//   interface BasePort {
//     /** id */
//     id: string
//     /** 节点 id */
//     node: string
//     /** 显示名 */
//     title: string
//     /** 描述 */
//     desc: string
//     /** 分类 */
//     type: PORT_TYPE
//   }
  
//   /** 事件 */
//   interface EventPort extends BasePort {
//     /** 类型 */
//     type: PORT_TYPE.EVENT
//     /** 参数类型 */
//     argType: string
//   }

//   /** 动作 */
//   interface ActionPort extends BasePort {
//     /** 类型 */
//     type: PORT_TYPE.ACTION
//     /** 参数类型 */
//     argType: string
//   }

//   /** 引用 */
//   interface ReferencePort extends BasePort {
//     /** 类型 */
//     type: PORT_TYPE.REFERENCE
//   }

//   /** 连接桩类型 */
//   type Port = EventPort|ActionPort|ReferencePort

//   enum LINE_TYPE {
//     SIGNAL = 'signal',
//     REFERENCE = 'reference',
//   }

//   /** 连线 */
//   interface Line {
//     /** 连接类型 */
//     type: LINE_TYPE
//     /** 起始端 */
//     source: string
//     /** 结束端 */
//     target: string
//     /** 参数转换函数 */
//     transfer?: string|null
//   }
// }
