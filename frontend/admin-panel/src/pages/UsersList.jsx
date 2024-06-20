import { Button, Container, Spinner, Table } from "react-bootstrap";
import {
  useDeleteUserMutation,
  useListusersQuery,
} from "../app/features/api/userApiSlice";
import { SERVER_IMG_ENDPOINT } from "../utils/constants";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const UsersList = () => {
  const { data: users, isLoading, refetch } = useListusersQuery();
  useEffect(() => {
    refetch()
  }, [])

  return (
    <Container className="mt-4">
      <div className="mb-3">
        <Button
          variant="primary"
          onClick={() => refetch()}
          disabled={isLoading}
        >
          {isLoading ? "Fetching..." : "Refetch Users"}
        </Button>
      </div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : users.length > 0 ? (
        <Table striped>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user._id} userInfo={user} reloadUsers={refetch} />
            ))}
          </tbody>
        </Table>
      ) : (
        <h2>No Users</h2>
      )}
    </Container>
  );
};

const UserRow = ({ userInfo, reloadUsers }) => {
  const { _id, fullName, email, profileImage, isAdmin } = userInfo;

  const [deletUser, { isLoading: isDeleteing }] = useDeleteUserMutation();

  const handleDelete = async (userId) => {
    const res = confirm("Are you sure?");
    if (res) {
      try {
        await deletUser({ id: userId }).unwrap();
        reloadUsers();
      } catch (error) {
        toast.error(error.data?.message || "Failed to Delete User");
      }
    }
  };

  return (
    <tr>
      <td>
        <div className="d-flex justify-content-start align-items-center m-0">
          <div
            className="profile-image m-0 me-2"
            style={{ width: "40px", height: "40px" }}
          >
            <img src={`${SERVER_IMG_ENDPOINT}${profileImage}`} alt="" />
          </div>
          <div>{fullName}</div>
        </div>
      </td>
      <td>{email}</td>
      <td>{isAdmin ? "Admin" : "User"}</td>
      <td className="d-flex justify-content-start align-items-center">
        <Link to={`/users-edit/${_id}`} className="btn btn-warning me-2">Edit</Link>
        <Button
          variant="danger"
          disabled={isDeleteing}
          onClick={() => handleDelete(_id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default UsersList;
