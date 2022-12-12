import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useState } from 'react';

import { deleteUser } from '../../../api/user';

export type Item = {
  id: string;
  username: string;
  email: string;
  role: string;
  sessiontoken: string;
  avatar: string | null;
};

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserTable = ({ users }: { users: Item[] }) => {
  const newUsers = users.map(row => ({
    ...row,
    key: row.id,
    role: row.role === 'ADMIN' ? 'Admin' : 'User',
  }));
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>(newUsers);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Partial<Item>) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    record.id && setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      if (data) {
        const row = (await form.validateFields()) as Item;

        const newData = [...data];
        const index = newData.findIndex(item => key === item.id);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      }
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log(errInfo);
    }
  };
  const handleDelete = ({
    sessiontoken,
    id,
  }: {
    sessiontoken: string;
    id: string;
  }) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    deleteUser(sessiontoken);
  };
  const columns = [
    {
      title: 'username',
      dataIndex: 'username',
      width: '25%',
      editable: true,
      sorter: (a: { username: string }, b: { username: string }) =>
        a.username.localeCompare(b.username),
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: '15%',
      editable: true,
      sorter: (a: { email: string }, b: { email: string }) =>
        a.email.localeCompare(b.email),
    },
    {
      title: 'sessiontoken',
      dataIndex: 'sessiontoken',
      width: '40%',
      editable: false,
    },
    {
      title: 'role',
      dataIndex: 'role',
      width: '25%',
      editable: true,
      sorter: (a: { role: string }, b: { role: string }) =>
        a.role.localeCompare(b.role),
    },
    {
      title: 'Edit',
      dataIndex: 'operationEdit',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <span>Cancel</span>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: 'delete',
      dataIndex: 'operationDalete',
      render: (_: any, record: Item) =>
        data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete}>
            <span>Delete</span>
          </Popconfirm>
        ) : null,
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      {data.length !== 0 && (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      )}
    </Form>
  );
};

export { UserTable };
