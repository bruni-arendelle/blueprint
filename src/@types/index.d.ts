
declare namespace Connection {
  enum NODE_CATE {
    COMPONENT = 'component',
    DATA = 'data',
    REQUEST = 'request',
    ACTION = 'action',
  }

  interface BaseNode {
    /** 全局唯一 */
    id: string
    /** 显示名 */
    title: string
    /** 描述 */
    desc: string
    /** 分类 */
    cate: NODE_CATE
  }

  /** 组件节点 */
  interface ComponentNode extends BaseNode {
    cate: NODE_CATE.COMPONENT
  }
  
  /** 公共变量 */
  interface DataNode extends BaseNode {
    cate: NODE_CATE.DATA
    /** 变量名 */
    key: string
    /** 类型 */
    type: string
  }

  interface RequestBase {
    id: string
    type: 'normal'|'oname'
    /** 执行间隔 */
    interval: number
    /** 是否立即执行 */
    immediate: boolean
    /** 结果处理 */
    filter: string|null
  }
  
  /** 常规请求 */
  interface NormalRequest extends RequestBase {
    type: 'normal'
    url: string
    method: 'GET'|'POST'
    headers: Array<{key: string, value: string}>
    payload: object
  }
  
  /** oName 请求 */
  interface OnameRequest extends RequestBase {
    type: 'oname'
    oname: string
  }
  
  /** 公共请求节点 */
  interface RequestNode extends BaseNode {
    cate: NODE_CATE.REQUEST
    /** 请求队列 */
    requests: Array<NormalRequest|OnameRequest>
  }
  
  /** 预设动作节点 */
  interface ActionNode extends BaseNode {
    cate: NODE_CATE.ACTION
    /** 参数类型 */
    argType: string
    /** 参数描述 */
    argDesc?: string
  }
  
  /** 节点类型 */
  type Node = ComponentNode|DataNode|RequestNode|ActionNode

  namespace Port {
    /** 连接桩类型 */
    enum GROUP {
      EVENT = 'event',
      ACTION = 'action',
      REFERENCE = 'reference',
    }

    interface Base {
      /** id */
      id: string
      /** 节点 id */
      node: string
      /** 显示名 */
      title: string
      /** 描述 */
      desc: string
      /** 类型 */
      group: GROUP
    }
    
    /** 事件 */
    interface Event extends Base {
      /** 类型 */
      group: GROUP.EVENT
      /** 参数类型 */
      argType: string
      // /** 参数名 */
      // argName: string
      // /** 参数描述 */
      // argDesc?: string
    }

    /** 动作 */
    interface Action extends Base {
      /** 类型 */
      group: GROUP.ACTION
      /** 参数类型 */
      argType: string
    }

    /** 引用 */
    interface Reference extends Base {
      /** 类型 */
      group: GROUP.REFERENCE
    }
  }

  /** 连接桩类型 */
  type Port = Port.Event|Port.Action|Port.Reference

  enum TYPE {
    SIGNAL = 'signal',
    REFERENCE = 'reference',
  }

  /** 连接 */
  interface Record {
    /** 连接类型 */
    type: TYPE
    /** 起始端 */
    source: string
    /** 结束端 */
    target: string
    /** 参数转换函数 */
    transfer?: string|null
  }
}
