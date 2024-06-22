// 週の開始日を月曜日とする（0=日曜日, 1=月曜日, ...）
const weekStartsOn = 1;

/**
 * 指定された日付が属する週の開始日と終了日を返す
 * @param date 指定日付（Dateオブジェクト）
 * @returns 週の開始日と終了日（Dateオブジェクトの配列）
 */
function getWeekRange(date: Date): [Date, Date] {
  const dayOfWeek = date.getDay();
  const diff = (dayOfWeek < weekStartsOn ? 7 : 0) + dayOfWeek - weekStartsOn;

  const start = new Date(date);
  start.setDate(date.getDate() - diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return [start, end];
}

/**
 * 現在の週の開始日と終了日を返す
 * @returns 週の開始日と終了日（Dateオブジェクトの配列）
 */
function getCurrentWeekRange(): [Date, Date] {
  return getWeekRange(new Date());
}

/**
 * 指定された年と週番号からその週の開始日と終了日を計算する
 * @param year 年
 * @param weekNumber 週番号（1から始まる）
 * @returns 週の開始日と終了日（Dateオブジェクトの配列）
 */
function getWeekRangeFromWeekNumber(year: number, weekNumber: number): [Date, Date] {
  const janFirst = new Date(year, 0, 1);
  const daysOffset = weekStartsOn - janFirst.getDay();
  const startDate = new Date(year, 0, 1 + daysOffset + (weekNumber - 1) * 7);
  if (daysOffset < 0) {
    startDate.setDate(startDate.getDate() - 7);
  }

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  return [startDate, endDate];
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    // getMonthは0から始まるため、+1する。月と日が一桁の場合は先頭に0を追加
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }

export { getWeekRange, getCurrentWeekRange, getWeekRangeFromWeekNumber, formatDate };