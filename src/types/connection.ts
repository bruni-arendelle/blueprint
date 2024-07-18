
export enum NODE_TYPE {
  COMPONENT = 'component-node',
  DATA = 'data-node',
  REQUEST = 'request-node',
  PRESET = 'preset-node',
}

interface BaseNode {
  /** 全局唯一 */
  id: string
  /** 显示名 */
  title: string
  /** 描述 */
  desc: string
  /** 分类 */
  type: NODE_TYPE
}

/** 组件节点 */
export interface ComponentNode extends BaseNode {
  type: NODE_TYPE.COMPONENT
}

/** 公共变量 */
export interface DataNode extends BaseNode {
  type: NODE_TYPE.DATA
  /** 变量名 */
  dataName: string
  /** 类型 */
  dataType: string
}

export enum REQUEST_TYPE {
  NORMAL = 'normal-request',
  ONAME = 'oname-request',
}

export interface NormalRequestNode extends BaseNode {
  type: NODE_TYPE.REQUEST
  requestType: REQUEST_TYPE.NORMAL
  method: 'GET'|'POST'
  url: string
  headers: Array<{key: string, value: string}>
  payload: object
  interval: number
  filter: string|null
}

interface OnameParams {
  oname: string
  attr: string[]
  interval: number
}

export interface OnameRequestNode extends BaseNode {
  type: NODE_TYPE.REQUEST
  requestType: REQUEST_TYPE.ONAME
  onames: Array<OnameParams>
}

/** 公共请求节点 */
export type RequestNode = NormalRequestNode|OnameRequestNode

/** 预设节点 */
export interface PresetNode extends BaseNode {
  type: NODE_TYPE.PRESET
}

/** 节点类型 */
export type Node = ComponentNode|DataNode|RequestNode|PresetNode

/** 连接桩类型 */
export enum PORT_TYPE {
  EVENT = 'event',
  ACTION = 'action',
  REFERENCE = 'reference',
}

interface BasePort {
  /** id */
  id: string
  /** 节点 id */
  node: string
  /** 显示名 */
  title: string
  /** 描述 */
  desc: string
  /** 分类 */
  type: PORT_TYPE
}

/** 事件 */
export interface EventPort extends BasePort {
  /** 类型 */
  type: PORT_TYPE.EVENT
  /** 参数类型 */
  argType: string
}

/** 动作 */
export interface ActionPort extends BasePort {
  /** 类型 */
  type: PORT_TYPE.ACTION
  /** 参数类型 */
  argType: string
}

/** 引用 */
export interface ReferencePort extends BasePort {
  /** 类型 */
  type: PORT_TYPE.REFERENCE
}

/** 连接桩类型 */
export type Port = EventPort|ActionPort|ReferencePort

export enum LINE_TYPE {
  SIGNAL = 'signal',
  REFERENCE = 'reference',
}

/** 连线 */
export interface Line {
  /** 连接类型 */
  type: LINE_TYPE
  /** 起始端 */
  source: string
  /** 结束端 */
  target: string
  /** 参数转换函数 */
  transfer?: string|null
}
