import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";



function CatList() {
  let history = useHistory();
  let dispatch = useDispatch();
  let catProfile = useSelector((store) => store.catProfile);
  //   const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_CAT_PROFILE" });
  }, [dispatch]);

  const handlecatprofile = (catId) => {
    history.push(`/catprofile/${catId}`);
    dispatch({ type: "FETCH_CAT_PROFILE", payload: catId });
  };

  const handleAddCat = () => {
    history.push(`/catform`);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(6),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <main>
        <h3>Tiffany's Cats </h3>

        {catProfile.map((cat) => {
          return (
            <Box sx={{ width: "100%" }}  key={cat.id}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Item>
                    <Card sx={{ maxwidth: 150 }}>
                      <CardActionArea>
                        <CardMedia
                          onClick={() => handlecatprofile(cat.id)}
                          component="img"
                          height="250"
                          image={cat.photo_url}
                          alt={cat.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {cat.name}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            This is where the about information should go! Add
                            to the database.
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          );
        })}

        <button onClick={handleAddCat}>Add a Cat</button>
      </main>
    </>
  );
}

export default CatList;
