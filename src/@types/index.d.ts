
declare namespace Connection {
  /** 连接桩类型 */
  enum PORT_GROUP {
    EVENT = 'event',
    ACTION = 'action',
    DATA = 'data',
  }

  enum TYPE {
    SIGNAL = 'signal',
    REFERENCE = 'reference',
  }

  // /** 连接桩 */
  // type Port<T extends PORT_GROUP> = {
  //   /** id */
  //   id: string
  //   /** 显示名 */
  //   title: string
  //   /** 归属 id */
  //   container: string
  //   /** 类型 */
  //   group: T
  //   /** 描述 */
  //   desc: string
  //   /** 参数 */
  //   arg: {
  //     /** 名称 */
  //     key: string
  //     /** 类型 */
  //     type: string
  //     /** 描述 */
  //     desc?: string
  //   }
  // }

  interface PortBase {
    /** id */
    id: string
    /** 显示名 */
    title: string
    /** 归属 id */
    parent: string
    /** 类型 */
    group: PORT_GROUP
    /** 描述 */
    desc: string
  }

  /** 事件连接桩 */
  interface EventPort extends PortBase {
    /** 类型 */
    group: PORT_GROUP.EVENT
    /** 参数类型 */
    argType: string
    /** 参数名 */
    argName: string
    /** 参数描述 */
    argDesc?: string
  }

  /** 动作连接桩 */
  interface ActionPort extends PortBase {
    /** 类型 */
    group: PORT_GROUP.ACTION
    /** 参数类型 */
    argType: string
  }

  /** 数据连接桩 */
  interface DataPort extends PortBase {
    /** 类型 */
    group: PORT_GROUP.DATA
  }

  /** 连接 */
  interface Connection {
    /** 连接类型 */
    type: TYPE
    /** 起始端 */
    source: string
    /** 结束端 */
    target: string
    /** 参数转换函数 */
    transfer?: string|null
  }

  // /** 引用连接 */
  // interface Reference {
  //   /** 连接类型 */
  //   type: TYPE.REFERENCE
  //   /** 起始端 */
  //   source: string
  //   /** 结束端 */
  //   target: string
  //   // /** 变量名 */
  //   // key: string|null
  // }
}
