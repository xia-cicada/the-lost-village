import { cloneDeep } from 'es-toolkit'
import { NotificationType } from 'naive-ui'

/**获取原生对象，避免与electron通信时错误 */
export const toDeepRaw: <T>(v: T) => T = (v) => cloneDeep(v)

export const notify = (msg: string, type: NotificationType = 'info') => {
  window.$notification[type]({
    content: msg,
    duration: 2000
  })
}
