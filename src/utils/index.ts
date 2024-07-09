
type Rect = [number, number]

/** 计算一个受限的矩形，该矩形要保持指定宽高比，且在指定区域内最大 */
export function restrictRect(extent: Rect, ratio: Rect): Rect {
  const [w, h] = extent
  const [rw, rh] = ratio
  if (w <= 0 || h <= 0 || rw <= 0 || rh <= 0) {
    return [0, 0]
  }
  const unit = Math.min(w/rw, h/rh)
  return [unit*rw, unit*rh]
}

/** 监听元素尺寸改变 */
export function onResize(el: HTMLElement, cb: (width: number, height: number) => void): (() => void) {
  if (window.ResizeObserver) {
    cb(el.clientWidth, el.clientHeight)
    const resizeObserver = new ResizeObserver(function() {
      cb(el.clientWidth, el.clientHeight)
    })
    resizeObserver.observe(el)
    return function() {
      resizeObserver.disconnect()
    }
  } else {
    let rAF = 0
    function step() {
      cb(el.clientWidth, el.clientHeight)
      rAF = window.requestAnimationFrame(step)
    }
    step()
    return function() {
      window.cancelAnimationFrame(rAF)
    }
  }
}
