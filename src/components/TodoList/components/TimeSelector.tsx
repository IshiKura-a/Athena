import type { Moment } from 'moment';
import moment from 'moment';
import React, { forwardRef, useEffect, useState } from 'react';
import styles from '@/components/TodoList/style.less';
import { DatePicker, TimePicker } from 'antd';

interface IProps {
  value?: string;
  onChange: any;
  format: string;
}

const TimeSelector = (props: IProps, ref: any) => {
  const parseTime = (value?: string) => (value ? moment(value) : null);

  const [date, setDate] = useState(parseTime(props.value));
  const [time, setTime] = useState(parseTime(props.value));
  const [value, setValue] = useState(parseTime(props.value));

  useEffect(() => {
    const data = parseTime(props.value);
    setDate((_) => data);
    setTime((_) => data);
    setValue((_) => data);
  }, [props.value]);

  useEffect(() => {
    props.onChange(value?.toISOString());
  }, [value]);

  const dateChange = (v: Moment | null) => {
    setDate((_) => v);
    setValue((old) => {
      if (!old || !v) return v;
      const [, , , hour, min, sec, ms] = old.toArray();
      const [year, month, day, , , ,] = v.toArray();
      return moment([year, month, day, hour, min, sec, ms]);
    });
  };

  const timeChange = (v: Moment | null) => {
    setTime((_) => v);
    setValue((old) => {
      if (!old || !v) return v;
      const [, , , hour, min, sec, ms] = v.toArray();
      const [year, month, day, , , ,] = old.toArray();
      return moment([year, month, day, hour, min, sec, ms]);
    });
  };

  return (
    <div className={styles.time} ref={ref} value={value?.toISOString()}>
      <DatePicker onChange={dateChange} value={date} />
      <TimePicker
        style={{ marginLeft: 10 }}
        format={props.format}
        onChange={timeChange}
        value={time}
      />
    </div>
  );
};

export default forwardRef(TimeSelector);
