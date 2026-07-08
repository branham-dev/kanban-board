import type { Context } from 'hono';
import * as Service from './columns.service';

export const addColumn = async (c: Context) => {
  const data = await c.req.json();
  const { userId } = c.get('user');

  const response = await Service.addColumn(data, userId);

  //   console.log("Controller:", response);

  return c.json({ sucess: true, message: 'Column created successfully', data: response });
};
