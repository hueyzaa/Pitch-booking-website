export const getSqlFormatDate = (date: Date) => {
  return "'" + date.toISOString() + "'";
};
