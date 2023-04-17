import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import Loading from "@/components/Loading";

const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const { user, setUser, loading } = useUser();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setRedirect(true);
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (user || loading || redirect) {
    router.push("/");
  }

  return (
    <form
      className="max-w-[600px] w-[500px] min-w-[400px] flex flex-col gap-2 border-[1px] rounded-md px-5 justify-center items-center py-10  bg-white shadow-md mt-10"
      onSubmit={handleLogin}
    >
      <h1 className="text-2xl font-semibold">Log In</h1>
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="w-full p-2 border-[1px] rounded-sm outline-none"
          name="username"
          id="username"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="w-full p-2 border-[1px] rounded-sm outline-none"
          name="password"
          id="password"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Log In
      </button>
    </form>
  );
};

export default Login;
