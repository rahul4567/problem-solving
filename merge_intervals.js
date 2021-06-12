/*
Given a list of intervals, merge all the overlapping intervals to produce a list that has only mutually exclusive intervals.

Example 1:

Intervals: [[1,4], [2,5], [7,9]]
Output: [[1,5], [7,9]]
Explanation: Since the first two intervals [1,4] and [2,5] overlap, we merged them into
one [1,5].
*/
class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  get_interval() {
    return "[" + this.start + ", " + this.end + "]";
  }
}


const merge = function(intervals) {
  if (intervals.length < 2) {
    return intervals;
  }
  intervals.sort((a, b) => {
    return a.start - b.start
  });
  const mergedIntervals = [];
  let start = intervals[0].start;
  let end = intervals[0].end;
  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i];
    if (interval.start <= end) {
      end = Math.max(interval.end, end);
    } else {
      mergedIntervals.push(new Interval(start, end));
      start = interva.start;
      end = interval.end;
    }
  }
  mergedIntervals.push(new Interval(start, end));
  return mergedIntervals;
};

merged_intervals = merge([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]);
result = "";
for(i=0; i < merged_intervals.length; i++) {
  result += merged_intervals[i].get_interval() + " ";
}
console.log(`Merged intervals: ${result}`)


merged_intervals = merge([new Interval(6, 7), new Interval(2, 4), new Interval(5, 9)]);
result = "";
for(i=0; i < merged_intervals.length; i++) {
  result += merged_intervals[i].get_interval() + " ";
}
console.log(`Merged intervals: ${result}`)


merged_intervals = merge([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]);
result = "";
for(i=0; i < merged_intervals.length; i++) {
  result += merged_intervals[i].get_interval() + " ";
}
console.log(`Merged intervals: ${result}`);

/*
Given a list of non-overlapping intervals sorted by their start time, insert a given interval at the correct position and merge all necessary intervals to produce a list that has only mutually exclusive intervals.

Example 1:

Input: Intervals=[[1,3], [5,7], [8,12]], New Interval=[4,6]
Output: [[1,3], [4,7], [8,12]]
Explanation: After insertion, since [4,6] overlaps with [5,7], we merged them into one [4,7].
Example 2:

Input: Intervals=[[1,3], [5,7], [8,12]], New Interval=[4,10]
Output: [[1,3], [4,12]]
Explanation: After insertion, since [4,10] overlaps with [5,7] & [8,12], we merged them into [4,12].
Example 3:

Input: Intervals=[[2,3],[5,7]], New Interval=[1,4]
Output: [[1,4], [5,7]]
Explanation: After insertion, since [1,4] overlaps with [2,3], we merged them into one [1,4].
*/

function insert(intervals, new_interval) {
  let merged = [],
      i = 0;
  //skip all intervals
  while (i<intervals.length && intervals[i].end < new_interval.start) {
    merged.push(intervals[i]);
    i++;
  }

  while (i<intervals.length && intervals[i].start <= new_interval.end) {
    new_interval.start = Math.min(intervals[i].start, new_interval.start);
    new_interval.end = Math.max(intervals[i].end, new_interval.start);
  }

  merged.push(new_interval);

  while(i<intervals.length) {
    merged.push(intervals[i]);
  }
  return merged;
}
