import React, { useEffect, useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

// Material-ui
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

// Styles
import useStyles from "./styles";

// React Router DOM
import { useHistory, useLocation } from "react-router-dom";

// Components
import Posts from "./../Posts/Posts";
import Form from "./../Form/Form";
import Pagination from "./../Pagination/Pagination";

// Determine Location
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Home
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page");
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  // Use Effect
  useEffect(() => {
    // Use Dispatch for actions
    dispatch(getPosts());
  }, [currentId, dispatch]);

  // Handlers
  const handleKeyPress = (e) => {
    // If enter is pressed
    if (e.keyCode === 13) {
      // Search post
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim()) {
      // Dispatch = Fetch search post
    } else {
      history.push("/");
    }
  };

  // Return
  return (
    <Grow in>
      <Container maxwidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value="TEST"
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              ></TextField>
              <ChipInput
                style={{ margin: "10px 0px" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;