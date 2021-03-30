import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Button from "@material-ui/core/Button";

const Home = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.isLogged);

  return (
    <div>
      {isLogged ? (
        <div>
          <Dashboard />
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              height: "300px",
              padding: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/login">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginRight: "20px" }}
              >
                Please Sign in First
              </Button>
            </Link>

            <img
              src="https://www.animatedimages.org/data/media/111/animated-arrow-image-0158.gif"
              border="0"
              alt="animated-arrow-image-0158"
              style={{ marginBottom: "30px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
