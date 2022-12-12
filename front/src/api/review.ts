import axios from 'axios';

import { ReviewDB } from '../lib/types';
import { Review } from '../store/reviewStore';
type Props = {
  token: string;
  capital: string;
  review: Review;
};
type LikeReview = {
  token: string;
  value: '1' | '-1' | '0';
  commentId: number;
};

export const postReview = ({ token, capital, review }: Props) => {
  return axios.post('http://localhost:8080/comment/addbyuser', {
    c_text: review.text,
    capitalName: capital,
    image: {
      filename: '',
      value: review.image.value,
    },
    ratingAttraction: review.ratings.attractions,
    ratingFood: review.ratings.food,
    ratingGeneral: review.ratings.general,
    ratingTransport: review.ratings.transport,
    sessionId: token,
  });
};
export const getReviewsForCapital = ({
  capitalName,
  token,
  optionalSort,
}: {
  capitalName: string;
  token: string;
  optionalSort?: string;
}) => {
  return axios
    .get<ReviewDB[]>(
      `http://localhost:8080/comment/allforcapital/?capitalName=${capitalName}&optionalSessionToken=${token}${
        optionalSort ? '&optionalSort=' + optionalSort : ''
      }`,
    )
    .then(res => res.data);
};
export const getReviewsForUser = ({ token }: { token: string }) => {
  return axios
    .get<ReviewDB[]>(
      `http://localhost:8080/comment/allforuser/?sessionToken=${token}`,
    )
    .then(res => res.data);
};

export const likeReview = ({ token, value, commentId }: LikeReview) => {
  return axios.post(
    `http://localhost:8080/comment/likechange/?sessionToken=${token}&commentID=${commentId}&value=${value}`,
  );
};
