import axios from 'axios';

import { CapitalStatus } from '../lib/types';
type Props = {
  capitalName: string;
  token: string;
  status?: CapitalStatus;
};
type CapitalsWithStatus = {
  status: string;
  capitalName: string;
};
export const getCapitalStatusForUser = ({ capitalName, token }: Props) => {
  return axios
    .get<string>(
      `http://localhost:8080/capital/status?capitalName=${capitalName}&sessionToken=${token}`,
    )
    .then(res => res.data);
};

export const getAllCapitalsForUserStatus = ({
  status,
  token,
}: {
  status: CapitalStatus;
  token: string;
}) => {
  return axios
    .get<CapitalsWithStatus[]>(
      `http://localhost:8080/capital/status/foruser?status=${
        status as unknown as string
      }&sessionToken=${token}`,
    )
    .then(res => res.data);
};

export const postCapitalStatusForUser = ({
  capitalName,
  token,
  status = 'UNDEFINED' as unknown as CapitalStatus,
}: Props) => {
  return axios.post(
    `http://localhost:8080/capital/status?capitalName=${capitalName}&sessionToken=${token}&status=${
      status as unknown as string
    }`,
  );
};
