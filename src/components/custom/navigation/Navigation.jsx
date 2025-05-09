import { menuItems } from "@/utils/constant";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
    const [currentIndex,setCurrentIndex] = useState(-1);
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const handleNavigation=(path,index) =>{
        setCurrentIndex(index)
        console.log(path)
        navigate(path)
    }

  return (
    <ul className="p-2">
      {
        menuItems.map(({title,path},index) =>  <li key={title}  className={`my-2 p-2 rounded-md cursor-pointer hover:bg-primary hover:text-white ${currentIndex===index || path===pathname ? 'bg-primary text-white' : 'bg-white text-black' }`} onClick={()=>handleNavigation(path,index)}>
            <Link to={path} >{title}</Link>
          </li>)
      }
    </ul>
  );
};

export default Navigation;
