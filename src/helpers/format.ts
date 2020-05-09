import moment from 'moment';

export const date = (dateF?: any, format = 'DD-MMM-YYYY') => moment(dateF).format(format);
