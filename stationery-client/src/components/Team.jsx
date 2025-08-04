import React, { useEffect, useState } from "react";
import axios from "../utils/axios"; // or use axios directly
import { BASE_URL } from "../config";

const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios
      .get("/team")
      .then((res) => setTeam(res.data))
      .catch((err) => console.error("Failed to load team:", err));
  }, []);

  return (
    <section className="mb-5">
      <h2 className="section-title">Our Team</h2>
      <div className="row text-center">
        {team.map((member) => (
          <div className="col-md-4 mb-4" key={member._id}>
            <img
              src={`${BASE_URL}/public/uploads/${member.image}`}
              alt={member.name}
              className="rounded-circle team-img"
            />
            <h6 className="mt-2">{member.name}</h6>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
