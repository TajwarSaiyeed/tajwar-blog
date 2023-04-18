import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    router.push("/");
  }
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <form
      className="max-w-[600px] w-[500px] min-w-[400px] flex flex-col gap-2 border-[1px] rounded-md px-5 justify-center items-center py-10  bg-white shadow-md mt-10"
      onSubmit={handleRegister}
    >
      <h1 className="text-2xl font-semibold">Register</h1>
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
        Register
      </button>
    </form>
  );
};

export default Register;
