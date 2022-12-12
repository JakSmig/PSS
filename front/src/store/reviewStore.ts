import create from 'zustand';
export type Ratings = {
  food: number;
  attractions: number;
  transport: number;
  general: number;
};
export type Review = {
  ratings: Ratings;
  text: string;
  image: {
    filename: string;
    value: string;
  };
};

interface ReviewState {
  review: Review;
  setRating: (marks: Ratings) => void;
  setText: (text: string) => void;
  setReview: () => void;
  setImage: (image: string) => void;
}

export const useReviewStore = create<ReviewState>()(set => ({
  review: {
    ratings: { food: 0, attractions: 0, transport: 0, general: 0 },
    text: '',
    image: {
      filename: '',
      value: '',
    },
  },
  setRating: (marks: Ratings) =>
    set(state => ({ review: { ...state.review, ratings: marks } })),
  setText: (text: string) =>
    set(state => ({ review: { ...state.review, text } })),
  setImage: (image: string) =>
    set(state => ({
      review: { ...state.review, image: { filename: '', value: image } },
    })),
  setReview: () =>
    set(() => ({
      review: {
        ratings: { food: 0, attractions: 0, transport: 0, general: 0 },
        text: '',
        image: {
          filename: '',
          value: '',
        },
      },
    })),
}));
