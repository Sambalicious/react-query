import Head from "next/head";
import {
  useAddUser,
  useDeleteUser,
  useGetPosts,
  useGetUsers,
  useUpdateUser,
} from "../hooks";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data } = useGetPosts();
  const { data: users } = useGetUsers();
  const mutationAddUser = useAddUser((oldUsers, newUser) => [
    newUser,
    ...oldUsers,
  ]);
  const deleteMutation = useDeleteUser((oldUsers, id) =>
    oldUsers.filter(user => user.id !== id),
  );

  const userUpdateMutation = useUpdateUser(1);
  const onAdd = async () => {
    try {
      await mutationAddUser.mutateAsync({
        name: "Test",
        id: 1,
      });
    } catch (error) {}
  };

  const deleteUser = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  const updateUser = (id: number) => {
    userUpdateMutation.mutate({
      name: "Test",
      id,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Everything React query </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <ul>
            {users?.map(user => (
              <li className="my-2" key={user?.id}>
                <div className="flex justify-between">
                  <p>{user.name} </p>
                  <div>
                    <button onClick={() => deleteUser(user?.id)}>
                      Delete{" "}
                    </button>
                    <button onClick={() => updateUser(1)}>Edit</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button style={{ marginBlock: "2rem" }} onClick={onAdd}>
          Add new user{" "}
        </button>
      </main>
    </div>
  );
}
