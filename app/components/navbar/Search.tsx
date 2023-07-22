'use client';
import { BiSearch } from 'react-icons/bi';

const Search = () => {


  return ( 
    <div
      onClick={()=>{}}
      className="
        border-[1px] 
        w-80
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
        relative
      "
    >
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div 
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="">Seach for a Word</div>
          <div 
            className="
              p-2 
              bg-blue-500 
              rounded-full 
              text-white
              absolute
              right-0
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Search;