"use client";

import '../Styles/Header.css';
import { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setUserRole(null);
  };

  return (
    <nav>
      <ul className="menu">

        <li className='menuitem'><Link href="/">Home</Link></li>


        {userRole === "Szervező" && (

          <li className="rightMenu menuitem"><Link href="/SchoolManagement">Manage Schools</Link></li>
   
        )}

        {userRole === "Szervező" && (

          <li className="rightMenu menuitem"><Link href="/Categories">Manage Categories</Link></li>

        )}

        {userRole === "Versenyző"  && (
              <li className="rightMenu menuitem"><Link href="/RegisterTeam">Register Team</Link></li>
        )}

        {userRole === "Tanár"  && (
              <li className="rightMenu menuitem"><Link href="/RegisterTeam">Register Team</Link></li>
        )}

        {!userRole ? (
          <>
            <li className="rightMenu menuitem"><Link href="/Login">Login</Link></li>
            <li className="rightMenu menuitem"><Link href="/Register">Register</Link></li>
          </>
        ) : (
          <li className="rightMenu menuitem" onClick={handleLogout}>
            <Link href="/Login">Logout</Link>
          </li>
        )}


      </ul>
    </nav>
  );
};

export default Header;
