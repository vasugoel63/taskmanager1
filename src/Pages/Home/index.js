import { Link } from "react-router"
export default function Home(){
    return(
        <>
        <h2>Welcome To Task Manager</h2>
        <p>
        <Link to="/login">Login Now</Link>
      </p>
        </>
    )
}