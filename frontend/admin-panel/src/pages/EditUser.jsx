import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../app/features/api/userApiSlice";
import EditUserForm from "../components/EditUserForm";
import { Container, Spinner } from "react-bootstrap";

const EditUser = () => {
  const { userid } = useParams();
  const { data, isLoading, refetch } = useGetUserByIdQuery(userid);

  
  useEffect(() => {
      refetch()
  }, [])

  return (
    <>
      {isLoading ? (
        <Container className="mt-3">
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
      ) : (
        <EditUserForm userInfo={data} forAdmin={true}/>
      )}
    </>
  );
};

export default EditUser;
