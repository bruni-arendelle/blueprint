
declare namespace Connection {
  /** 连接桩类型 */
  enum PORT_GROUP {
    EVENT = 'event',
    ACTION = 'action',
    VALUE = 'value',
  }

  enum TYPE {
    SIGNAL = 'signal',
    REFERENCE = 'reference',
  }

  interface Port<T extends string> {
    /** 连接桩 id */
    id: string
    /** 连接桩所在节点 id */
    node: string
    /** 连接桩类型 */
    group: T
  }

  /** 信号连接 */
  interface Signal {
    /** 连接类型 */
    type: TYPE.SIGNAL,
    /** 起始端 */
    source: Port<PORT_GROUP.EVENT>
    /** 结束端 */
    target: Port<PORT_GROUP.ACTION>
    /** 参数转换函数 */
    transfer: string|null
  }

  /** 引用连接 */
  interface Reference {
    /** 连接类型 */
    type: TYPE.REFERENCE,
    /** 起始端 */
    source: Port<PORT_GROUP.VALUE>
    /** 结束端 */
    target: Port<PORT_GROUP.ACTION>
    /** 变量名 */
    name: string|null
  }
}
