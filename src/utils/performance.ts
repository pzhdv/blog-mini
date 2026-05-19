/**
 * 防抖函数 Debounce
 * 【用途】连续触发时，只在【最后一次触发结束后等待 N 毫秒】执行一次
 * 【场景】搜索框输入、表单验证、窗口 resize、滚动停止后执行
 * 【特点】最后一次触发后延迟执行
 * @param fn 目标函数
 * @param delay 延迟时间(ms)
 * @param immediate 是否立即执行（默认 false）
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate = false
) {
  let timer: NodeJS.Timeout | null = null;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const later = () => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    };

    const needInvoke = immediate && !timer;
    if (timer) clearTimeout(timer);

    timer = setTimeout(later, delay);
    if (needInvoke) fn.apply(this, args);
  };

  // 取消防抖
  debounced.cancel = () => {
    clearTimeout(timer!);
    timer = null;
  };

  return debounced;
}

/**
 * 节流函数 Throttle
 * 【用途】连续触发时，【固定 N 毫秒内最多执行一次】
 * 【场景】上拉加载更多、滚动监听、按钮防重复点击、高频提交
 * 【特点】控制执行频率
 * @param fn 目标函数
 * @param interval 间隔时间(ms)
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number
) {
  let lastTime = 0;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
