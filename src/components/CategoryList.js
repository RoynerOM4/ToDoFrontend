import React, { useEffect, useState } from "react";
import { getAllCategorys } from '../api/task.api';
import { CategoryCard } from "./CategoryCard";

export function CategoryList() {
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        async function loadCategorys() {
            try {
                const res = await getAllCategorys();
                setCategorys(res.data.results);
                console.log(res.data.results);
            } catch (error) {
                console.error('Error al mostrar categorias', error);
            }
        }
        loadCategorys();
    }, []);

    return (
        <div>
            <h1 className='text'>Lista de Categorías</h1>
            <ul>
                {Array.isArray(categorys) && categorys.map(category => (
                    <CategoryCard
                    key={category.id}
                    category={category}
                    ></CategoryCard>
                ))}
            </ul>
        </div>
    );
}
