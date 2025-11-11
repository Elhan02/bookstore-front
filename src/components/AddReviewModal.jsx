import React from "react";
import { useForm } from "react-hook-form";

function AddReviewModal({ book, onClose, onSave }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            rating: "",
            comment: "",
        },
    });

    const onSubmit = (data) => {
        const newReview = {
            bookId: book.id,
            rate: Number(data.rating),
            comment: data.comment?.trim() || "",
        };

        onSave(newReview);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Leave a Review</h2>
                <p>
                    <strong>{book.title}</strong>
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Rating (1–5)</label>
                        <select
                            {...register("rating", { required: "Please select a rating" })}
                        >
                            <option value="">-- Select --</option>
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                        {errors.rating && (
                            <span className="error">{errors.rating.message}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Comment (optional)</label>
                        <textarea
                            placeholder="Write your thoughts..."
                            {...register("comment")}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="submit">Save Review</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddReviewModal;
