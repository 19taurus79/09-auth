"use client";
const Error = ({ error }: { error: Error }) => {
  // console.log("ERROR", error);
  return <p>Could not fetch the list of notes. {error.message}</p>;
};

export default Error;
