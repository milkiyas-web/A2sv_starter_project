# 📦 Redux API Integration Guide (RTK Query + Next.js)

This guide explains how to use the prebuilt RTK Query endpoints for `Application`, `User`, and `Cycle` features within the frontend of this Next.js application.

## 📁 File Structure

```bash
src/
├── lib/
│   └── redux/
│       ├── api/
│       │   ├── baseApi.ts
│       │   ├── applicationApi.ts
│       │   ├── userApi.ts
│       │   └── cycleApi.ts
│       └── types/
│           ├── application.d.ts
│           ├── users.d.ts
│           └── cycle.d.ts
```

## Example

```bash

import { useGetusersQuery } from "@/lib/redux/api/userApi";

const UsersPage = () => {
  const { data: users, isLoading, error } = useGetusersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users</p>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.full_name}</li>
      ))}
    </ul>
  );
};
```
