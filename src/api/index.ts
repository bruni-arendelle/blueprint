
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

/** 公共变量 */
interface Variable extends Entity {
  /** 默认变量名 */
  key: string
  /** 变量类型描述 */
  type: string
}

/** 自定义实体 */
interface CustomEntity extends Entity {
  // 
}

/** 项目数据 */
type ProjectData = {
  /** 组件 */
  components: Array<ChartComponent>,
  /** 公共变量 */
  variables: Array<Variable>,
  /** 自定义节点 */
  customEntities: Array<CustomEntity>,
  /** 连接记录 */
  connections: Array<Connection.Signal|Connection.Reference>,
}

/** 获取项目数据 */
export async function getProjectData(id: string): Promise<ProjectData> {
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
    /** 公共变量 */
    variables: [],
    /** 自定义节点 */
    customEntities: [],
    /** 连接记录 */
    connections: [],
  }
}
