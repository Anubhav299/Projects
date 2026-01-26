import StarRating from "./StarRating";

function ReviewCard({ reviews }) {
  return (
    <>
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            className="flex w-full h-full min-h-40 p-4 flex-col rounded-lg bg-blue-600 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-4 text-slate-800">
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between">
                  <h5 className="text-2xl font-semibold text-white">
                    {review.name}
                  </h5>
                  <StarRating rating={Number(review.rating)} readOnly />
                </div>
                <div className="mt-2 w-full border-t-2 border-white/70" />
              </div>
            </div>

            <div className="mt-3">
              <p className="text-base text-white font-light leading-normal">
                "{review.comment}"
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ReviewCard;
