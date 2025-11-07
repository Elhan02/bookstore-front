import React from "react";
import { useForm } from "react-hook-form";

function AddToStoreModal({ issue, onClose, onSave }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            description: issue?.description || "",
            price: "",
            pageNumber: "",
            availableCopies: "",
        },
    });
    
    const apiDetailUrl = issue?.api_detail_url || "";

    const onSubmit = (data) => {
        const newIssue = {
            apiDetailUrl,
            description: data.description,
            price: Number(data.price),
            pageNumber: Number(data.pageNumber),
            availableCopies: Number(data.availableCopies),
        };

        onSave(newIssue);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Issue to Store</h2>
                <p><strong>{issue?.name}</strong></p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            {...register("description", { required: true })}
                        />
                        {errors.description && (
                            <span className="error">Description is required</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            {...register("price", {
                                required: "Price is required",
                                min: { value: 1, message: "Price must be positive" },
                            })}
                        />
                        {errors.price && <span className="error">{errors.price.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Page Number</label>
                        <input
                            type="number"
                            {...register("pageNumber", {
                                required: "Page number is required",
                                min: { value: 1, message: "Must have at least 1 page" },
                            })}
                        />
                        {errors.pageNumber && (
                            <span className="error">{errors.pageNumber.message}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Available Copies</label>
                        <input
                            type="number"
                            {...register("availableCopies", {
                                required: "Available copies is required",
                                min: { value: 0, message: "Cannot be negative" },
                            })}
                        />
                        {errors.availableCopies && (
                            <span className="error">{errors.availableCopies.message}</span>
                        )}
                    </div>

                    <div className="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddToStoreModal;
