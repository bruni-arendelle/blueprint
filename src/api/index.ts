
/** 项目数据 */
type ProjectData = {
  /** 组件 */
  components: Array<Connection.Entity.Component>
  /** 蓝图配置 */
  blueprint: {
    /** 公共变量 */
    publicdata: Array<Connection.Entity.PublicData>
    /** 自定义动作 */
    actions: Array<Connection.Entity.Action>
    /** 自定义请求 */
    requests: Array<Request>
    /** 连接记录 */
    connections: Array<Connection.Record>
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
