'use client';

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import  useCountries from "@/app/hooks/useCountries";




export const categories = [
    {
        label: 'English',
        icon: 'United Kingdom',
        description: 'Traduction is set to English'
    },
    {
        label: 'Spanish',
        icon: 'Spain',
        description: 'Traduction is set to Spanish'
    },
    {
        label: 'German',
        icon: 'Germany',
        description: 'Traduction is set to German'
    },
    {
        label: 'Italian',
        icon: 'Italy',
        description: 'Traduction is set to Italian'
    },
    {
        label: 'Russian',
        icon: 'Russia',
        description: 'Traduction is set to Russian'
    },
    {
        label: 'Japanese',
        icon: 'Japan',
        description: 'Traduction is set to Japanese'
    },
    
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const { getByName } = useCountries();

    const isMainPage = pathname == '/';
    return ( 
        <Container>
            <div
            className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            ">
                {categories.map((item)=>(
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={category == item.label}
                        icon={(getByName(item.icon)?.flag)?.toString()}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default Categories;