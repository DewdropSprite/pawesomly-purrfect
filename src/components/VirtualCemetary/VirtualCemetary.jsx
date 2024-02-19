import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DateTime } from "luxon";


//! Future Iteration!! 
//! I wasn't able to get this working before needing to be complete for turn in.
const VirtualCemetary = () => {
  const [memorials, setMemorials] = useState([]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(6),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    // Fetch existing memorials
    const fetchMemorials = async () => {
      try {
        const { data } = await axios.get("/api/cat/cemetary");
        setMemorials(data);
      } catch (error) {
        console.error("failed to fetch memorials", error);
      }
    };

    fetchMemorials();
  }, []);

  // JSX to display memorials
  return (
    <>
      <main>
        <h2>Virtual Cat Cemetery</h2>
        <Box sx={{ width: "%50" }}>
          {memorials.map((memorial) => (
            <Box
              key={memorial.id}
              sx={{ display: "inline-block", margin: "1%" }}
            >
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <Item sx={{ backgroundColor: "rgb(83, 83, 84)" }}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="250"
                        image={memorial.photo_url}
                        alt={memorial.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {memorial.name}
                          <p>
                            Date of Passing:{" "}
                            {memorial.death_date &&
                              DateTime.fromISO(memorial.death_date).toFormat(
                                "LL/ dd/ yyyy"
                              )}
                          </p>
                          <p>About: {memorial.about}</p>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </main>
    </>
  );
};

export default VirtualCemetary;
