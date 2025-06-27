import { useEffect, useState } from "react";
import Axios from "../utils/Axios";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("/api/admin/users")
      .then((res) => {
        if (res.data.success) setUsers(res.data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">All Users</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Mobile</th>
            <th className="px-4 py-2 border">Referral Code</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.mobile}</td>
              <td className="border px-4 py-2">{u.referralCode || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable;
