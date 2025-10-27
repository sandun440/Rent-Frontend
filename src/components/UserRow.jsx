export default function UserRow({ user }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.type === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
        }`}>
          {user.type}
        </span>
      </td>
    </tr>
  );
}