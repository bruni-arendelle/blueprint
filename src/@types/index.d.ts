
declare namespace Connection {
  namespace Entity {
    interface Base {
      /** 全局唯一 */
      id: string
      /** 显示名 */
      title: string
    }
    
    /** 组件 */
    interface Component extends Base {
      // 
    }
    
    /** 公共数据 */
    interface PublicData extends Base {
      /** 变量名 */
      key: string
      /** 描述 */
      desc: string
      /** 类型 */
      type: string
    }
    
    /** 自定义动作 */
    interface Action extends Base {
      /** 参数名 */
      argName: string
      /** 参数类型 */
      argType: string
      /** 动作代码 */
      action: string
    }
    
    /** 常规请求 */
    type NormalRequest = {
      type: 'normal'
      url: string
      method: 'GET'|'POST'
      headers: Array<{key: string, value: string}>
      /** 参数 */
      payload: object
      /** 执行间隔 */
      interval: number
      /** 是否立即执行 */
      immediate: boolean
      filter: string|null
    }
    
    /** oName 快捷请求 */
    type OnameRequest = {
      type: 'oname'
      oname: string
      /** 执行间隔 */
      interval: number
      /** 是否立即执行 */
      immediate: boolean
      filter: string|null
    }
    
    interface Request extends Base {
      requests: Array<NormalRequest|OnameRequest>
    }
  }

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
      /** 显示名 */
      title: string
      /** 归属 id */
      parent: string
      /** 类型 */
      group: PORT_GROUP
      /** 描述 */
      desc: string
    }
    
    /** 事件 */
    interface Event extends Base {
      /** 类型 */
      group: GROUP.EVENT
      /** 参数类型 */
      argType: string
      /** 参数名 */
      argName: string
      /** 参数描述 */
      argDesc?: string
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
