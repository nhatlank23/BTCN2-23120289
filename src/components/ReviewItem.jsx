import { useState } from 'react';

const ReviewItem = ({ review }) => {
    const [showFullContent, setShowFullContent] = useState(false);
    const contentLimit = 200;
    const needsTruncate = review.content && review.content.length > contentLimit;
    const displayContent = needsTruncate && !showFullContent 
        ? review.content.slice(0, contentLimit) + '...' 
        : review.content;

    // Format date từ ISO string
    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    console.log('Review item:', review);
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-2">
            {/* Dòng 1: Username và Date */}
            <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                    {review.user}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(review.date)}
                </span>
            </div>
            
            {/* Dòng 2: Content */}
            <div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {displayContent}
                </p>
                {needsTruncate && (
                    <button
                        onClick={() => setShowFullContent(!showFullContent)}
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition text-sm font-medium mt-2"
                    >
                        {showFullContent ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReviewItem;
