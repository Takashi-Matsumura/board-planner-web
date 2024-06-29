const weekStartsOn = 1;

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - startOfYear.getTime();
  const dayCount = diff / (1000 * 60 * 60 * 24);
  const weekNumber = Math.ceil((dayCount + 1 - (startOfYear.getDay() || 7)) / 7);
  return weekNumber;
}

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

function getCurrentWeekRange(): [Date, Date, number] {
  const now = new Date();
  const [start, end] = getWeekRange(now);
  const weekNumber = getWeekNumber(start);
  return [start, end, weekNumber];
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

  function groupByDayOfWeek(data: Array<{ begin_time: string }>): Array<Array<{ begin_time: string }>> {
    // 曜日ごとにデータを格納するための二次元配列を初期化（型を明示的に指定）
    const groupedByDayOfWeek = Array.from({ length: 7 }, (): Array<{ begin_time: string }> => []);
  
    // 引数で受け取った配列をループ
    data.forEach(item => {
      // begin_timeプロパティをDateオブジェクトに変換
      const date = new Date(item.begin_time);
      // getDay()メソッドで曜日のインデックスを取得（0が日曜日、6が土曜日）
      const dayOfWeek = date.getDay();
      // 対応する曜日の配列に要素を追加
      groupedByDayOfWeek[dayOfWeek].push(item);
    });
  
    return groupedByDayOfWeek;
  }

  import moment from 'moment-timezone';

  function extractTime(dateTimeString: string): string {
    const tokyoTime = moment.utc(dateTimeString).tz('Asia/Tokyo').format();

    // Dateオブジェクトを作成
    const date = new Date(tokyoTime);
    // 時間を取得し、2桁になるように0を追加（padStartを使用）
    const hours = String(date.getHours()).padStart(2, '0');
    // 分を取得し、2桁になるように0を追加（padStartを使用）
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // HH:MMの形式で結果を返す
    return `${hours}:${minutes}`;
  }


export { getWeekRange, getCurrentWeekRange, getWeekRangeFromWeekNumber, formatDate, groupByDayOfWeek, extractTime, getWeekNumber };