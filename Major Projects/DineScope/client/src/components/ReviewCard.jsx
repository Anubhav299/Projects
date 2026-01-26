import StarRating from "./StarRating";

function ReviewCard({ reviews }) {
  return (
    <>
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            className="flex w-full min-h-32 p-3 sm:p-4 flex-col rounded-lg sm:rounded-xl bg-linear-to-br from-blue-50 to-gray-50 shadow-sm border border-blue-100 hover:shadow-md transition-smooth hover:border-blue-200 animate-slide-in-up"
          >
            <div className="flex items-start justify-between mb-2">
              <h5 className="text-sm sm:text-base font-semibold text-gray-900">
                {review.name}
              </h5>
              <div className="ml-2 text-xs sm:text-base">
                <StarRating rating={Number(review.rating)} readOnly />
              </div>
            </div>

            <div className="w-full border-t border-blue-200 mb-2" />

            <div className="flex-1 min-h-0">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light line-clamp-3">
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
