import axios from 'axios';
type Props = {
  commentID: number;
  reasonText: string;
  token: string;
};

export const reportComment = ({ commentID, reasonText, token }: Props) => {
  return axios.post('http://localhost:8080/report', {
    commentID,
    reasonText,
    sessionToken: token,
  });
};
