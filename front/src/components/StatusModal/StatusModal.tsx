import { Button, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { queryClient } from '../..';
import { postCapitalStatusForUser } from '../../api/status';
import { CapitalStatus } from '../../lib/types';
import { useAuthStore } from '../../store/authStore';

const StatusModal = ({ capital }: { capital: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('UNDEFINED');
  const { token } = useAuthStore();

  const mutation = useMutation({
    mutationFn: postCapitalStatusForUser,
    onSuccess: data => {
      queryClient.setQueryData(['status', [capital, token]], status);
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    token &&
      mutation.mutate({
        capitalName: capital,
        token,
        status: status as unknown as CapitalStatus,
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value: string) => {
    setStatus(value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Set status for capital
      </Button>
      <Modal
        title={`Set status for capital ${capital}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          defaultValue="not visited"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: 'VISITED',
              label: 'visited',
            },
            {
              value: 'WANTVISIT',
              label: 'want to visit',
            },
            {
              value: 'UNDEFINED',
              label: 'not visited',
            },
          ]}
        />
      </Modal>
    </>
  );
};
export { StatusModal };
