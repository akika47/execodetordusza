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
        <li><Link href="/">Home</Link></li>

        {userRole === "Szervező" && (

          <li className="rightMenu"><Link href="/SchoolManagement">Manage Schools</Link></li>

        )}

        {userRole === "Versenyző"  && (
              <li className="rightMenu"><Link href="/RegisterTeam">Register Team</Link></li>
        )}
        
        {userRole === "Tanár"  && (
              <li className="rightMenu"><Link href="/RegisterTeam">Register Team</Link></li>
        )}


        {!userRole ? (
          <>
            <li className="rightMenu"><Link href="/Login">Login</Link></li>
            <li className="rightMenu"><Link href="/Register">Register</Link></li>
          </>
        ) : (
          <li className="rightMenu" onClick={handleLogout}>
            <Link href="/Login">Logout</Link>
          </li>
        )}


      </ul>
    </nav>
  );
};

export default Header;
