import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/TaskCard.css';

export function CategoryCard({ category }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/categories/${category.id}`);
    };

    return (
        <div className="list-group list">
            <a href="#" className="list-group-item p montserrat-font" aria-current="true" onClick={handleClick}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{category.category_name}</h5>
                </div>
                <p className="mb-1">Descripción: {category.description}</p>
            </a>
        </div>
    );
}
