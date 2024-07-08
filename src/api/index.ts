
// interface Connection {
//   type: 'reference'|'channel'
//   source: {
//     id: string
//     node: string
//   }
//   target: {
//     id: string
//     node: string
//   }
//   transfer: string|null
// }

// /** 连接桩 */
// interface Port {
//   id: string
//   node: string
// }

interface Entity {
  /** 全局唯一 */
  id: string
  /** 显示名 */
  title: string
}

/** 组件 */
interface ChartComponent extends Entity {
  // 
}

/** 公共数据 */
interface PublicData extends Entity {
  /** 变量名 */
  key: string
  /** 描述 */
  desc: string
  /** 类型 */
  type: string
}

/** 自定义动作 */
interface ActionEntity extends Entity {
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

interface RequestEntity extends Entity {
  requests: Array<NormalRequest|OnameRequest>
}

/** 项目数据 */
type ProjectData = {
  /** 组件 */
  components: Array<ChartComponent>
  /** 蓝图配置 */
  blueprint: {
    /** 公共变量 */
    publicdata: Array<PublicData>
    /** 自定义动作 */
    actions: Array<ActionEntity>
    /** 自定义请求 */
    requests: Array<RequestEntity>
    /** 连接记录 */
    connections: Array<Connection.Connection>
    /** 节点位置和层级 */
    nodes: Array<{id: string, x: number, y: number, z: number}>
  }
}

/** 获取项目数据 */
export async function getProjectData(): Promise<ProjectData> {
  return {
    /** 组件 */
    components: [{
      id: 'number_1',
      title: '数字计数',
    }, {
      id: 'number_2',
      title: '数字计数2',
    }, {
      id: 'number_3',
      title: '数字计数3',
    }, {
      id: 'input_1',
      title: '输入框',
    }, {
      id: 'datetime_1',
      title: '时间选择器',
    }, {
      id: 'button_1',
      title: '查询提交',
    }],
    blueprint: {
      /** 公共数据 */
      publicdata: [],
      /** 自定义节点 */
      actions: [],
      requests: [],
      /** 连接记录 */
      connections: [],
      nodes: [],
    }
  }
}
