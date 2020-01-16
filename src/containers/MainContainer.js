import React, { useEffect, useState } from "react";
import api from "../api";

import { Box, Typography, Grid, Button } from "@material-ui/core";

const MainContainer = () => {
  const [datasets, setDatasets] = useState([]);
  const [errors, setErrors] = useState([]);
  const [feedBackVisibility, setVisibility] = useState(false);

  useEffect(() => {
    api.getDatasets().then(({ data }) => setDatasets(data));
  }, []);

  return (
    <Grid container direction="column" alignContent="space-around">
      <Grid item xs={12}>
        <Typography variant="h4">Validador de CSV</Typography>
      </Grid>
      <Grid item xs={12}>
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span" alignContent="center">
            UPLOAD
          </Button>
        </label>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          {feedBackVisibility &&
            "Arquivo será processado. Confira o status atualizando a página"}
        </Typography>
      </Grid>
      <Box display="none">
        <input
          accept=".csv"
          onChange={evt => {
            evt.preventDefault();
            setVisibility(true);
            const formData = new FormData();
            formData.append("file", evt.target.files[0]);
            api.sendCSV({ file: formData });
          }}
          id="contained-button-file"
          type="file"
        />
      </Box>
      <Box pt={4}>
        <Typography variant="h6">Arquivos enviados</Typography>
        {[...datasets].map((dataset, index) => (
          <Grid item container key={`dataset-${index}`}>
            <Grid item container>
              <Typography variant="body1">{dataset.name}</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  api.getErrors(dataset.id).then(({ data }) => {
                    setErrors(data);
                  });
                }}
              >
                CARREGAR ERROS
              </Button>
            </Grid>
          </Grid>
        ))}
      </Box>
      {errors.map((error, index) => (
        <Box p={2} key={`error-${index}`}>
          <Typography variant="body1">Linha: {error.row}</Typography>
          <Typography variant="body2">{error.errors}</Typography>
        </Box>
      ))}
    </Grid>
  );
};

export default MainContainer;
